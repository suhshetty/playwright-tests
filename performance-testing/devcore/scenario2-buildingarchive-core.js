/*
 * SCENARIO 2 (CORE tenants) — Login -> Building archive -> Site register/Sites (open
 *              a site) -> Locations overview/Buildings (open a building) -> Site
 *              location filter -> data (Municipality) filter -> clear -> Logout
 *
 * Same 15 manual test steps as scenario2-buildingarchive.js, but against the ASP.NET
 * Core build (kommunedevcore). The step sequence is identical; only the HTTP layer
 * differs, and that lives entirely in lib/mainmanager-core.js.
 * Endpoint/payload differences are documented in CORE-API-MAPPING.md.
 *
 * JOURNEY model — login AND logout on every iteration, mirroring the manual test spec
 * (step 15 is Logout).
 *
 * An earlier version of this comment claimed auth-once was impossible because "the
 * server only establishes list/filter state on the first pass". That was WRONG and is
 * retracted. Proven on bygst 2026-08-26: k6 clears the VU cookie jar at the start of
 * every iteration, so the library's ensureSession() skipped login while sending the
 * follow-up requests with NO session cookie — the server answered 200 with an empty
 * result set and nothing flagged it. A client-side defect, not server behaviour.
 * Holding a session DOES work if the journey loop lives inside ONE k6 iteration; see
 * scenario2-heldsession.js, which sustained 250 VUs on 250 logins instead of ~15,000.
 * Worth porting here if login rate becomes the bottleneck on a CORE tenant too.
 *
 *   1. Login                                                  -> login()
 *   2-4. Nav -> Building archive -> Site register -> Portfolios -> openModule(MODULES.Portfolios)
 *        (CORE has no "Sites" sub-tab under Site register — see the note at step 2)
 *   5. Open a portfolio -> popup -> Close (client-side)       -> openRecordModal(MainGroup)
 *   6-7. Locations overview -> Buildings                      -> openModule(MODULES.Buildings)
 *   8. Open a building -> popup -> Close (client-side)        -> openRecordModal(Building)
 *   9. "Site" dropdown = <siteName>                           -> applyLocationFilter(resolved)
 *   10. "Site" dropdown = Show all sites                      -> applyLocationFilter(0)
 *   11-13. Filter panel -> Municipality = <name> -> Filter On -> applyDataFilter(resolved)
 *   14. Clear filter (cancel)                                 -> clearDataFilter()
 *   15. Logout                                                -> logout()
 *
 *   # smoke (always run this first)
 *   k6 run -e VUS=1 -e DURATION=90s -e DEBUG=true \
 *     -e BASE_URL=https://kommunedevcore.mainmanager.is \
 *     -e MM_USERNAME=x -e MM_PASSWORD=y \
 *     -e SITE_NAME=AKTIVITETSHUSET -e MUNICIPALITY_NAME=Aarhus \
 *     scenario2-buildingarchive-core.js
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, loadLandingModule, logout, openModule, openRecordModal,
  applyLocationFilter, applyDataFilter, clearDataFilter,
  resolveFilterId, MODULES, CONFIG, recordModalTrend,
  defaultOptions, handleSummary,
} from './lib/mainmanager-core.js';

// The core library resolves its target at import time from -e BASE_URL, then
// config-core.json, then config.json — and that LAST fallback points at bygst. If
// config-core.json ever goes missing this would silently aim at the wrong customer,
// so require the flag explicitly. (bygst would reject CORE's payloads loudly rather
// than quietly serving them, but "loud failure on the wrong tenant" is still a
// production request we should never send.)
if (!__ENV.BASE_URL) {
  throw new Error(
    'Pass -e BASE_URL=https://kommunedevcore.mainmanager.is\n' +
    'Credentials come from config-core.json, or -e MM_USERNAME / -e MM_PASSWORD.');
}

// Load profile — two modes:
//   FLAT  -e VUS=N [-e DURATION=10m]  constant VUs; ignores the stages below.
//   RAMP  no -e VUS                   uses the stages below.
// -e DEBUG=true logs every failing/slow request.
const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario2core: {
          executor: 'constant-vus', exec: 'scenario2core',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario2core: {
          executor: 'ramping-vus',
          exec: 'scenario2core',
          startVUs: 1,
          // Gradual ramp: arriving at the target all at once distorts the login
          // measurement and can tip the environment into 503 load-shedding.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

// MODULES.Sites is NOT used on CORE — that grid does not exist on this tenant.
const BUILDING = MODULES.Buildings;

const SITE_NAME         = __ENV.SITE_NAME         || CONFIG.siteName         || 'AKTIVITETSHUSET';
const MUNICIPALITY_NAME = __ENV.MUNICIPALITY_NAME || CONFIG.municipalityName || 'Aarhus';
const SITE_GROUND_ID    = __ENV.SITE_GROUND_ID  ? parseInt(__ENV.SITE_GROUND_ID, 10)  : null;
const MUNICIPALITY_ID   = __ENV.MUNICIPALITY_ID ? parseInt(__ENV.MUNICIPALITY_ID, 10) : null;

// Gap between logout and the next login. Was a hardcoded 1s; aligned to 10s on
// 2026-09-02 to match the bygst and kommune scenarios, which the customer asked to
// slow to 10s. Without this the CORE script generates ~10x their login rate and no
// cross-tenant comparison is meaningful. Overridable:  -e ITER_DELAY=1
const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// The Buildings "Filter" panel controls, captured from a real browser click on CORE.
// DO NOT edit the order or membership — it must match what the browser POSTs exactly.
// This list differs from bygst's; only the Municipality value varies between calls.
function buildingDataFilterValues(municipalityId) {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFDateFilterID#1001', 'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#;', 'DataFilter_TFGeographicalRegionID#0', 'DataFilter_TFIsLocatedOnMap#0',
    'DataFilter_TFUsageOrganisationID#0', 'DataFilter_TFMainTypeID#0', 'DataFilter_TFSubtypeID#0',
    `DataFilter_TFMunicipalityID#${municipalityId}`,
    'DataFilter_TFCityID#0', 'DataFilter_TFZipCodeID#0',
    'DataFilter_TFPreservationConditions#0', 'DataFilter_TFExternalStatusID#0',
    'DataFilter_TFOwningConditionID#0', 'DataFilter_TFCostCenterID#0',
    'DataFilter_TFCulturalValueID#0', 'DataFilter_TFPreservationTypeID#0',
    'DataFilter_TFPreservationClassificationID#0',
    'DataFilter_TFEFCategoryID1#0', 'DataFilter_TFEFScopeCategoryID1#0',
    'DataFilter_TFEFGlobalCategoryID1#0',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario2core() {
  // Step 1: LOGIN — every iteration (see JOURNEY model note at the top of this file).
  // The sleep on failure is REQUIRED: a failed login ends the iteration in ~200ms and
  // k6 immediately starts another, so without it a struggling login endpoint gets
  // retried several times per second per VU and the test floods it into collapse.
  if (!login()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  loadLandingModule();
  sleep(randomIntBetween(1, 3));

  // Steps 2-4: Building archive -> Site register -> Portfolios grid.
  //
  // CORRECTED 2026-09-09. This used to open MODULES.Sites (menu item 1783, dataTag
  // 'Ground') to mirror the bygst step "Site register -> Sites". That grid DOES NOT
  // EXIST on kommunedevcore: GetMenuItemSteps lists only MainGroupTree 1784 and
  // MainGroup 1787 under GroundRegistration, and the live UI shows just the two
  // sub-tabs "Portfolio management" and "Portfolios". InitMainLayout answered 200 with
  // every field null, so no UniqueString was issued and BuildLayout never succeeded —
  // 0/615 and 0/726 on those two checks in runs 011 and 012, i.e. it never once worked.
  // "Portfolios" is the CORE equivalent: same tab, a grid that is really there.
  const portfolios = openModule(MODULES.Portfolios,
    '2. Building archive -> Site register -> Portfolios', undefined,
    { keepList: true, minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 5: open a portfolio -> popup, then close (close = client-side -> think time).
  const portfolioId = firstId(portfolios.listText, 'MainGroup');
  check(null, { 'Portfolios grid returned rows': () => portfolioId !== null });
  if (portfolios.ok && portfolioId) {
    // us must be the UniqueString InitMainLayout issued for THIS grid — the modal and
    // its GIS calls are scoped to it.
    openRecordModal(MODULES.Portfolios, portfolioId, portfolios.us,
      '5. Open portfolio -> popup', recordModalTrend, { mainId: 0 });
    sleep(randomIntBetween(1, 3));
  }

  // Steps 6-7: Locations overview -> Buildings grid.
  const buildings = openModule(MODULES.Buildings, '6. Locations overview -> Buildings', undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));
  if (!buildings.ok) { logout(); return; }   // still close the journey cleanly

  // Buildings layout is now active, so the Filter panel's Municipality dropdown exists.
  const municipalityId = (MUNICIPALITY_ID != null)
    ? MUNICIPALITY_ID
    : resolveFilterId(MODULES.Buildings, 'MunicipalityID', MUNICIPALITY_NAME, { type: '2' });

  // Resolve SITE name -> Ground id (cached per VU) from the top location bar's Site
  // dropdown (LoadMMFilterControl type '3' -> ComboboxData).
  //
  // CORRECTED 2026-09-09: this used to resolve against MODULES.Sites, which never
  // initialised, so the lookup ran against an EMPTY filter control and returned null on
  // every VU (0/250 in runs 011 and 012) — silently skipping step 9 altogether. The
  // GroundID control belongs to BUILDINGS, which is also the grid the filter is applied
  // to. Verified: Buildings' type-3 control exposes RegionID, MainGroupID and GroundID,
  // and 'AKTIVITETSHUSET' resolves to 58334.
  const siteId = (SITE_GROUND_ID != null)
    ? SITE_GROUND_ID
    : resolveFilterId(MODULES.Buildings, 'GroundID', SITE_NAME,
        { type: '3', groupName: `Resolve site '${SITE_NAME}'` });
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} siteId(${SITE_NAME})=${siteId} municipalityId(${MUNICIPALITY_NAME})=${municipalityId}`);
  sleep(randomIntBetween(1, 3));

  // Step 8: open a building -> popup, then close (client-side -> think time).
  const buildingId = firstId(buildings.listText, 'Building');
  check(null, { 'Buildings grid returned rows': () => buildingId !== null });
  if (buildingId) {
    openRecordModal(BUILDING, buildingId, buildings.us, '8. Open building -> popup', recordModalTrend,
      { mainId: siteId || 0 });
    sleep(randomIntBetween(1, 3));
  }

  // Step 9: "Site" dropdown -> the configured site (filter applies + grid reloads).
  if (siteId) {
    applyLocationFilter(MODULES.Buildings, siteId, buildings.us, `9. Site filter -> ${SITE_NAME}`);
    sleep(randomIntBetween(1, 3));
  }

  // Step 10: "Site" dropdown -> Show all sites (clear location filter).
  // minRows:1 — "show all" coming back empty cannot be real data, only a broken session
  // or filter state. Status 200 alone would not catch it.
  applyLocationFilter(MODULES.Buildings, 0, buildings.us, '10. Site filter -> Show all sites',
    undefined, { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Steps 11-13: open Filter panel (client-side) -> Municipality = <name> -> Filter On.
  if (municipalityId != null) {
    applyDataFilter(MODULES.Buildings, 'DataFilter_TFMunicipalityID',
      buildingDataFilterValues(municipalityId), buildings.us, `11. Data filter -> Municipality ${MUNICIPALITY_NAME}`);
    sleep(randomIntBetween(1, 3));

    // Step 14: Clear filter (cancel). minRows:1 — clearing must restore the full grid.
    clearDataFilter(MODULES.Buildings, buildingDataFilterValues(municipalityId), buildings.us,
      '14. Clear data filter', undefined, { minRows: 1 });
    sleep(randomIntBetween(1, 3));
  }

  // Step 15: Logout — closes the journey, per the manual test spec.
  logout();
  sleep(ITER_DELAY);
}

export default scenario2core;

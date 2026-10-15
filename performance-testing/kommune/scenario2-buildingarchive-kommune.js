/*
 * SCENARIO 2 — KOMMUNE tenant (https://kommune.mainmanager.is)
 *
 * Same 15 manual test steps as scenario2-buildingarchive.js, same shared library
 * (lib/mainmanager.js — kommune is a WebForms tenant like bygst, NOT a CORE one).
 * This is a separate file purely so the bygst scenario and its run history stay
 * untouched; nothing here modifies shared code.
 *
 * WHAT DIFFERS FROM BYGST — all tenant data, no logic
 *   baseUrl        https://kommune.mainmanager.is   (bygst: bygst.mainmanager.dk)
 *   menuItemId     Sites 1783, Buildings 1018       (bygst: 540, 8)
 *   site           AKTIVITETSHUSET                  (bygst: Adelgade 11)
 *   municipality   Aarhus                           (bygst: Kobenhavn)
 *
 * The module ids were read from kommune's LIVE menu on 2026-09-01 via the library's
 * discoverModule(), not guessed. They match kommunedevcore, which shares kommune's
 * menu configuration. Rather than edit the shared MODULES map (bygst depends on it),
 * this file clones the entries and overrides just the id — see SITE / BUILDING below.
 *
 * WHY opts.serverUniqueString IS MANDATORY HERE
 *   openModule() by default INVENTS the UniqueString rather than using the one
 *   InitMainLayout issues. bygst tolerates that; kommune's Buildings layout does not.
 *   A/B tested on kommune 2026-09-02, one session, both grids both ways:
 *       Sites     / invented       -> 200, 4628 rows
 *       Sites     / server-issued  -> 200, 4628 rows
 *       Buildings / invented       -> 403 on GetMMListHeaders AND GetMMList
 *       Buildings / server-issued  -> 200, 4433 rows
 *   So the 403 is ours, not a permissions problem, and not the menuItemId — a control
 *   run with bygst's id (8) also succeeded once the server-issued value was used.
 *   The ids below are still the ones kommune's menu actually reports, so they stay.
 *
 * Consequence for reading results: with the correct UniqueString the filters really
 * filter, so the Buildings grid returns a handful of rows after step 9 instead of all
 * 4,433. That is less work per request than the bygst runs, which filter in name only
 * (see FILTER-ISSUE-REPORT.md). Do NOT compare kommune latency to bygst latency.
 *
 *   # smoke — run this and confirm all 15 steps pass BEFORE any load run
 *   k6 run -e VUS=1 -e DURATION=120s -e VERIFY=true \
 *     scenario2-buildingarchive-kommune.js
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, loadLandingModule, logout, openModule, openRecordModal,
  applyLocationFilter, applyDataFilter, clearDataFilter,
  resolveDataFilterId, MODULES, recordModalTrend,
  defaultOptions, handleSummary,
} from './lib/mainmanager.js';

// Credentials come from config-kommune.json (gitignored), NOT config.json — that one
// targets bygst and is shared with the bygst scenario. -e still wins for a one-off.
const KCONF = (function () {
  const candidates = ['./config-kommune.json', '../config-kommune.json', 'PerformanceTests/config-kommune.json'];
  for (let i = 0; i < candidates.length; i++) {
    try { const t = open(candidates[i]); if (t) return JSON.parse(t); } catch (e) { /* try next */ }
  }
  return {};
})();

const USERNAME = __ENV.MM_USERNAME || KCONF.username || '';
const PASSWORD = __ENV.MM_PASSWORD || KCONF.password || '';

// The library reads its target from -e BASE_URL / config.json at import time, so a
// run MUST pass BASE_URL. Fail loudly at startup instead of silently loading bygst.
if (!__ENV.BASE_URL) {
  throw new Error(
    'Pass -e BASE_URL=https://kommune.mainmanager.is (and -e MM_USERNAME / -e MM_PASSWORD).\n' +
    'Without it the shared library falls back to config.json, which targets bygst — ' +
    'you would load-test the wrong customer.');
}

const base = defaultOptions();

// Load profile. Default is the 5m ramp + 5m soak at 250 VUs that was requested;
// -e VUS=N switches to a flat run and ignores the stages.
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario2kommune: {
          executor: 'constant-vus', exec: 'scenario2kommune',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario2kommune: {
          executor: 'ramping-vus',
          exec: 'scenario2kommune',
          startVUs: 1,
          // 5m ramp + 5m soak = 10 minutes. Gradual on purpose: arriving at the target
          // at once distorts the login measurement and can tip the environment into
          // 503 load-shedding.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

// Clone the shared descriptors and override only the tenant-specific id. Object.assign
// leaves MODULES itself untouched, so the bygst scenario is unaffected.
const SITE     = Object.assign({}, MODULES.Sites,     { menuItemId: parseInt(__ENV.MENUITEM_SITES     || '1783', 10) });
const BUILDING = Object.assign({}, MODULES.Buildings, { menuItemId: parseInt(__ENV.MENUITEM_BUILDINGS || '1018', 10) });

// serverUniqueString is REQUIRED on this tenant — see the header. Without it the
// Buildings grid 403s and steps 6-14 never run.
const OPTS = { keepList: true, serverUniqueString: true };

const SITE_NAME         = __ENV.SITE_NAME         || KCONF.siteName         || 'AKTIVITETSHUSET';
const MUNICIPALITY_NAME = __ENV.MUNICIPALITY_NAME || KCONF.municipalityName || 'Aarhus';
const SITE_GROUND_ID    = __ENV.SITE_GROUND_ID  ? parseInt(__ENV.SITE_GROUND_ID, 10)  : null;
const MUNICIPALITY_ID   = __ENV.MUNICIPALITY_ID ? parseInt(__ENV.MUNICIPALITY_ID, 10) : null;
const ITER_DELAY        = parseInt(__ENV.ITER_DELAY || '10', 10);

// The Buildings "Filter" panel controls. Copied from the bygst scenario, and VERIFIED
// to work on kommune 2026-09-02: with Municipality=Aarhus (id 75) the grid narrows
// 4,433 -> 798 rows. So the two tenants share this field list, despite it being
// per-tenant in general. Do not edit the order or membership.
function buildingDataFilterValues(municipalityId) {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFDateFilterID#1001', 'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#;', 'DataFilter_TFIsLocatedOnMap#0',
    'DataFilter_TFMainTypeID#0', 'DataFilter_TFSubtypeID#0',
    `DataFilter_TFMunicipalityID#${municipalityId}`,
    'DataFilter_TFCityID#0', 'DataFilter_TFZipCodeID#0',
    'DataFilter_TFPreservationConditions#0', 'DataFilter_TFOwningConditionID#0',
    'DataFilter_TFManagerID#0', 'DataFilter_TFManufacturerID#0',
    'DataFilter_TFContactID#0', 'DataFilter_TFEnergyLabelCertificateID#0', 'DataFilter_TFEnergyLabelID#0',
    'DataFilter_TFShowInactiveFilterID#0',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario2kommune() {
  // Step 1: LOGIN. The sleep on failure is REQUIRED: a failed login ends the iteration
  // in ~0.3s and k6 immediately starts another, so without it a struggling login
  // endpoint gets retried several times a second per VU and the test floods it.
  if (!login({ username: USERNAME, password: PASSWORD })) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  loadLandingModule();
  sleep(randomIntBetween(1, 3));

  // Steps 2-4: Building archive -> Site register -> Sites.
  const sites = openModule(SITE, '2. Building archive -> Site register -> Sites', undefined, OPTS);
  sleep(randomIntBetween(1, 3));

  // Resolve the site NAME -> Ground id from the top filter bar's dropdown. Must run
  // AFTER the Sites grid load: the type-3 control is Ground-scoped, so its
  // DataPath/UniqueString/checksum only exist once Sites is the active layout.
  const siteId = (SITE_GROUND_ID != null)
    ? SITE_GROUND_ID
    : resolveDataFilterId(SITE, 'GroundID', SITE_NAME, { type: '3', groupName: `Resolve site '${SITE_NAME}'` });
  sleep(randomIntBetween(1, 3));

  // Step 5: open a site -> popup, then close (close is client-side, hence just think time).
  const siteRowId = firstId(sites.listText, 'Ground');
  check(null, { 'Sites grid returned rows': () => siteRowId !== null });
  if (sites.ok && siteRowId) {
    openRecordModal(SITE, siteRowId, null, '5. Open site -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // Steps 6-7: Locations overview -> Buildings. Needs OPTS.serverUniqueString (header).
  const buildings = openModule(BUILDING, '6. Locations overview -> Buildings', undefined, OPTS);
  sleep(randomIntBetween(1, 3));
  if (!buildings.ok) { logout(); return; }   // still close the journey cleanly

  const municipalityId = (MUNICIPALITY_ID != null)
    ? MUNICIPALITY_ID : resolveDataFilterId(BUILDING, 'MunicipalityID', MUNICIPALITY_NAME);
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} siteId(${SITE_NAME})=${siteId} municipalityId(${MUNICIPALITY_NAME})=${municipalityId}`);
  sleep(randomIntBetween(1, 3));

  // Step 8: open a building -> popup, then close.
  const buildingId = firstId(buildings.listText, 'Building');
  check(null, { 'Buildings grid returned rows': () => buildingId !== null });
  if (buildingId) {
    openRecordModal(BUILDING, buildingId, null, '8. Open building -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // Step 9: "Site" dropdown -> the configured site.
  if (siteId) {
    applyLocationFilter(BUILDING, siteId, buildings.us, `9. Site filter -> ${SITE_NAME}`);
    sleep(randomIntBetween(1, 3));
  }

  // Step 10: "Site" dropdown -> Show all sites.
  applyLocationFilter(BUILDING, 0, buildings.us, '10. Site filter -> Show all sites');
  sleep(randomIntBetween(1, 3));

  // Steps 11-13: Filter panel -> Municipality -> Filter On.
  if (municipalityId != null) {
    applyDataFilter(BUILDING, 'DataFilter_TFMunicipalityID',
      buildingDataFilterValues(municipalityId), buildings.us, `11. Data filter -> Municipality ${MUNICIPALITY_NAME}`);
    sleep(randomIntBetween(1, 3));

    // Step 14: Clear filter.
    clearDataFilter(BUILDING, buildingDataFilterValues(municipalityId), buildings.us, '14. Clear data filter');
    sleep(randomIntBetween(1, 3));
  }

  // Step 15: Logout, then the gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario2kommune;

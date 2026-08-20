/*
 * SCENARIO 2 — Login -> Building archive -> Site register/Sites (open a site) ->
 *              Locations overview/Buildings (open a building) -> Site location
 *              filter -> data (Municipality) filter -> clear -> Logout
 *
 * JOURNEY model — login AND logout on every iteration, one complete journey per
 * iteration. Do NOT switch to auth-once: in a long-lived session the server only
 * establishes list/filter state on the first pass, after which the grids come back
 * empty and the filters 400.
 *
 * Mapping of the manual test steps to HTTP:
 *   1. Login                                                  -> login()
 *   2-4. Nav -> Building archive -> Site register -> Sites    -> openModule(MODULES.Sites)
 *   5. Open a site -> popup -> Close (client-side)            -> openRecordModal(Ground)
 *   6-7. Locations overview -> Buildings                      -> openModule(MODULES.Buildings)
 *   8. Open a building -> popup -> Close (client-side)        -> openRecordModal(Building)
 *   9. "Site" dropdown = <siteName> (location filter)        -> applyLocationFilter(resolved)  [RefreshMainManFilter + reload]
 *   10. "Site" dropdown = Show all sites (clear)              -> applyLocationFilter(0)
 *   11-13. Filter panel -> Municipality = <name> -> Filter On -> applyDataFilter(resolved)  [RefreshDataFilter + reload]
 *   14. Clear filter (cancel)                                -> clearDataFilter()  [EmptyDataFilter + reload]
 *   15. Logout                                               -> logout()
 *
 * Records opened are picked LIVE from the grid response (always the first row), so
 * the same site/building recurs in server logs — expected, not a defect.
 * Site and municipality are configured by NAME (config.json) and resolved to ids at
 * runtime via each dropdown's own ComboboxData call. Both accept an -e id fast-path.
 *
 *   # smoke (always run this first) — target/credentials come from config.json
 *   k6 run -e VUS=1 -e DURATION=90s PerformanceTests/scenario2-buildingarchive.js
 *   # per-run override: -e MM_USERNAME=x -e MM_PASSWORD=y  (NOT USERNAME on Windows)
 *
 * Per-step metrics: step_navigate_duration (grids), step_open_record_duration
 * (popups), step_filter_duration (each filter apply/clear).
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, loadLandingModule, logout, openModule, openRecordModal,
  applyLocationFilter, applyDataFilter, clearDataFilter,
  resolveDataFilterId, MODULES, CONFIG, recordModalTrend,
  defaultOptions, handleSummary,
} from './lib/mainmanager.js';

// Load profile — two modes:
//   FLAT  -e VUS=N [-e DURATION=10m]  constant VUs; ignores the stages below.
//   RAMP  no -e VUS                   uses the stages below.
// Diagnostics: -e DEBUG=true logs every failing request + status; -e VERIFY=true logs
// real grid row counts per step (1-VU use only — it keeps response bodies).
// Thresholds / discardResponseBodies are inherited from defaultOptions().
const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario2: {
          executor: 'constant-vus', exec: 'scenario2',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario2: {
          executor: 'ramping-vus',
          exec: 'scenario2',
          startVUs: 1,
          stages: [
            // Keep the ramp gradual (5m). Arriving at the target all at once distorts
            // the login measurement and can tip the environment into 503 load-shedding.
            // Read steady-state numbers from the soak, not the whole-run averages.
            // Measured on bygst: 50 VU stable, 100 VU degraded but usable, 250 VU past
            // capacity — see PerformanceTests/reports/scenario2/ for the run history.
            { duration: '10m', target: 250 },  { duration: '5m', target: 100 },  // ramp to 100, then soak
          ],
          gracefulRampDown: '30s',
        },
      },
    };

    
export { handleSummary };

// Full MODULES entries (not {dataTag,dataCaption} stubs) so the record modal also gets
// each type's childKeys for its GetChildCount call.
const SITE     = MODULES.Sites;
const BUILDING = MODULES.Buildings;

const SITE_NAME         = __ENV.SITE_NAME         || CONFIG.siteName         || 'Absalonsgade 16';
const MUNICIPALITY_NAME = __ENV.MUNICIPALITY_NAME || CONFIG.municipalityName || 'Albertslund';
const SITE_GROUND_ID    = __ENV.SITE_GROUND_ID  ? parseInt(__ENV.SITE_GROUND_ID, 10)  : null;
const MUNICIPALITY_ID   = __ENV.MUNICIPALITY_ID ? parseInt(__ENV.MUNICIPALITY_ID, 10) : null;

// The Buildings "Filter" panel controls, captured from a real browser click.
// DO NOT edit the order or membership — it must match what the browser POSTs exactly.
// Only the Municipality value varies.
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

export function scenario2() {
  // Step 1: LOGIN — every iteration (see JOURNEY model note at the top of this file).
  // The sleep on failure is REQUIRED: a failed login ends the iteration in ~200ms and
  // k6 immediately starts another, so without it a struggling login endpoint gets
  // retried several times per second per VU and the test floods it into collapse.
  if (!login()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  loadLandingModule();          // post-login landing (records step_landing_duration)
  sleep(randomIntBetween(1, 3));

  // Steps 2-4: Building archive -> Site register -> Sites grid.
  const sites = openModule(MODULES.Sites, '2. Building archive -> Site register -> Sites', undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));

  // Resolve SITE name -> Ground id (cached per VU) from the top MainManFilter bar's
  // Site dropdown (LoadMMFilterControl type '3' -> ComboboxData).
  // MUST run AFTER the Sites grid load — the type-3 control is Ground-scoped, so its
  // DataPath/UniqueString/checksum only exist once Sites is the active layout.
  // Do NOT resolve this via the grid search: that search is ignored server-side and
  // silently returns row 1's id for any name you ask for.
  const siteId = (SITE_GROUND_ID != null)
    ? SITE_GROUND_ID
    : resolveDataFilterId(MODULES.Sites, 'GroundID', SITE_NAME, { type: '3', groupName: `Resolve site '${SITE_NAME}'` });
  sleep(randomIntBetween(1, 3));

  // Step 5: open a site -> popup, then close (close = client-side -> think time).
  const siteRowId = firstId(sites.listText, 'Ground');
  check(null, { 'Sites grid returned rows': () => siteRowId !== null });
  if (sites.ok && siteRowId) {
    openRecordModal(SITE, siteRowId, null, '5. Open site -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // Steps 6-7: Locations overview -> Buildings grid.
  const buildings = openModule(MODULES.Buildings, '6. Locations overview -> Buildings', undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));
  if (!buildings.ok) { logout(); return; }   // still close the journey cleanly

  // Now that the Buildings layout is active, resolve the configured MUNICIPALITY
  // name -> id from the Filter panel's dropdown (ComboboxData; checksum parsed from
  // the Building filter HTML). Falls back to -e MUNICIPALITY_ID.
  const municipalityId = (MUNICIPALITY_ID != null)
    ? MUNICIPALITY_ID : resolveDataFilterId(MODULES.Buildings, 'MunicipalityID', MUNICIPALITY_NAME);
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} RESOLVED siteId(${SITE_NAME})=${siteId} municipalityId(${MUNICIPALITY_NAME})=${municipalityId}`);
  sleep(randomIntBetween(1, 3));

  // Step 8: open a building -> popup, then close (client-side -> think time).
  const buildingId = firstId(buildings.listText, 'Building');
  check(null, { 'Buildings grid returned rows': () => buildingId !== null });
  if (buildingId) {
    openRecordModal(BUILDING, buildingId, null, '8. Open building -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // Step 9: "Site" dropdown -> the configured site (location filter applies + grid reloads).
  if (siteId) {
    applyLocationFilter(MODULES.Buildings, siteId, buildings.us, `9. Site filter -> ${SITE_NAME}`);
    sleep(randomIntBetween(1, 3));
  }

  // Step 10: "Site" dropdown -> Show all sites (clear location filter).
  applyLocationFilter(MODULES.Buildings, 0, buildings.us, '10. Site filter -> Show all sites');
  sleep(randomIntBetween(1, 3));

  // Steps 11-13: open Filter panel (client-side) -> Municipality = <name> -> Filter On.
  if (municipalityId != null) {
    applyDataFilter(MODULES.Buildings, 'DataFilter_TFMunicipalityID',
      buildingDataFilterValues(municipalityId), buildings.us, `11. Data filter -> Municipality ${MUNICIPALITY_NAME}`);
    sleep(randomIntBetween(1, 3));

    // Step 14: Clear filter (cancel).
    clearDataFilter(MODULES.Buildings, buildingDataFilterValues(municipalityId), buildings.us, '14. Clear data filter');
    sleep(randomIntBetween(1, 3));
  }

  // Step 15: Logout — closes the journey, per the manual test spec. The next
  // iteration logs in again with a fresh session (see the JOURNEY note on step 1).
  logout();
  sleep(1);
}

export default scenario2;

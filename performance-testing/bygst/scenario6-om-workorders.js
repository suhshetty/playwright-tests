/*
 * SCENARIO 6 — Login -> Operation and maintenance -> Work orders overview ->
 *              Work orders (open a WO) -> Site location filter -> Filter panel
 *              (pin, Work order status: Select all / Deselect all / Created) ->
 *              clear -> Logout
 *
 * AUTH-ONCE model (login once per VU via ensureSession; session reused across
 * iterations — login-per-iteration at high VU floods the login front door). No
 * per-iteration logout. Reverse-engineered live on
 * bygst.mainmanager.dk (2026-06-17). Mapping of the manual steps to HTTP:
 *   1. Login (once per VU)                                    -> ensureSession()
 *   2-4. Nav -> O&M -> Work orders overview -> Work orders    -> openModule(MODULES.WorkOrdersOM)
 *   5. Open a work order -> popup -> Close (client-side)      -> openRecordModal(Request)
 *   6. "Site" dropdown = Absalonsgade 16 (location filter)    -> applyLocationFilter(2682)
 *   7. "Site" dropdown = Show all sites                       -> applyLocationFilter(0)
 *   8. "Filter" button (open panel)                           -> CLIENT-SIDE -> think time
 *   9. "Pin filter"                                           -> CLIENT-SIDE (UI pref) -> think time
 *   10. Work order status -> Select all                       -> applyDataFilter(TFStatus = 3,6,5)  [RefreshDataFilter + reload]
 *   11. Work order status -> Deselect all                     -> applyDataFilter(TFStatus = empty)
 *   12. Work order status -> Created                          -> applyDataFilter(TFStatus = 3)
 *   13. Clear filter (cancel)                                 -> clearDataFilter()  [EmptyDataFilter + reload]
 *   14. (no per-iteration logout — session reused; see Step 1 / ensureSession)
 *
 * The work order opened is picked LIVE from the grid (Request$1$<id>). select2 /
 * checkbox option-loads are UI-only; each status change AUTO-applies via
 * RefreshDataFilter (no separate "Filter On" needed). Work order statuses:
 *   Created=3, In waiting=6, In progress=5, Finished=2, Cancelled=1.
 *
 *   # smoke (always first) — baseUrl/username/password/siteName all come from config.json
 *   k6 run -e VUS=1 -e DURATION=90s scenario6-om-workorders.js
 *   # (per-run override if needed: -e MM_USERNAME=Suhas -e MM_PASSWORD=<pwd>  — NOT USERNAME)
 *
 * Per-step metrics: step_navigate_duration (grid), step_open_record_duration
 * (popup), step_filter_duration (each filter apply/clear).
 */

import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  ensureSession, openModule, openRecordModal, applyLocationFilter, applyDataFilter, clearDataFilter,
  resolveGroundId, saveToggle, MODULES, CONFIG, recordModalTrend, defaultOptions, handleSummary,
} from './lib/mainmanager.js';

// Load profile (matches Scenarios 2/3/5 so they are comparable):
//   * SMOKE — -e VUS=N (e.g. -e VUS=1 -e DURATION=60s) for a quick constant-VU run.
//   * RAMP  — no VUS: STEPPED ramp 1 -> 250 VUs over 10m (30s ramp-in + 1m30s hold per
//             step at 50/100/150/200/250). Auth-once + grid-based, login paid once per VU.
//             This scenario hits the filter endpoints heavily (location + 3 status + clear),
//             which 400 server-side (known bug) → expect a high known_server_errors count
//             (IsShortcut 500 + the filter 400s), all excluded from the SLA.
const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario6: {
          executor: 'constant-vus', exec: 'scenario6',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario6: {
          executor: 'ramping-vus',
          exec: 'scenario6',
          startVUs: 1,
          stages: [
            { duration: '30s', target: 50 },  { duration: '1m30s', target: 50 },   // step 1
            { duration: '30s', target: 100 }, { duration: '1m30s', target: 100 },  // step 2
            { duration: '30s', target: 150 }, { duration: '1m30s', target: 150 },  // step 3
            { duration: '30s', target: 200 }, { duration: '1m30s', target: 200 },  // step 4
            { duration: '30s', target: 250 }, { duration: '1m30s', target: 250 },  // step 5
          ],
          gracefulRampDown: '30s',
        },
      },
    };
export { handleSummary };

const WORKORDER = { dataTag: 'Request', dataCaption: 'Work order' };

// Site is set by NAME in config.json (or -e SITE_NAME) and resolved to its id at
// runtime — no hardcoded database ids. -e SITE_GROUND_ID is an optional fast-path.
const SITE_NAME      = __ENV.SITE_NAME || CONFIG.siteName || 'Absalonsgade 16';
const SITE_GROUND_ID = __ENV.SITE_GROUND_ID ? parseInt(__ENV.SITE_GROUND_ID, 10) : null;
const STATUS_CREATED = __ENV.STATUS_CREATED || '3';                     // "Created" WO status id
const STATUS_ALL     = __ENV.STATUS_ALL || '3,6,5';                     // Created, In waiting, In progress

// The Work orders "Filter" panel data-filter controls (captured live). Only the
// Work order status (DataFilter_TFStatus) varies here; the rest stay default.
function woDataFilterValues(statusCsv) {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFDateFilterID#1003', 'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#;', 'DataFilter_TFBuildingSelection#', 'DataFilter_TFCheckwordItemID#',
    'DataFilter_TFEFCategoryID3#0', 'DataFilter_TFMaintenanceCategoryID#0', 'DataFilter_TFPriorityID#0',
    'DataFilter_TFDocumentationRequired#0', 'DataFilter_TFOrganisationFromID#0', 'DataFilter_TFOwnerID#0',
    'DataFilter_TFResponsibleOrganisationID#0', 'DataFilter_TFResponsibleID#0', 'DataFilter_TFOrganisationToID#0',
    'DataFilter_TFEmployeeToID#0', 'DataFilter_TFEFCategoryID1#0', 'DataFilter_TFEFCategoryID2#0',
    'DataFilter_TFEFBoolean1#0', 'DataFilter_TFEFOrganisationID1#0', 'DataFilter_TFEFEmployeeID1#0',
    'DataFilter_TFEFCategoryID5#0', 'DataFilter_TFEFCategoryID4#0', 'DataFilter_TFScheduleTypeID#0',
    'DataFilter_TFRequestOriginSelection#', 'DataFilter_TFShowInactiveFilterID#0',
    'DataFilter_TFFinishBehindSchedule#false', 'DataFilter_TFCheckwordID#', `DataFilter_TFStatus#${statusCsv}`,
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario6() {
  if (!ensureSession()) return;                                  // Step 1: AUTH-ONCE per VU (login once, reuse session)
  sleep(randomIntBetween(1, 3));

  // Resolve the configured site NAME -> Ground id once per VU (cached). Falls back
  // to -e SITE_GROUND_ID if given. No hardcoded ids — change the customer + site
  // name in config.json and this just works.
  const siteId = (SITE_GROUND_ID != null) ? SITE_GROUND_ID : resolveGroundId(SITE_NAME);
  sleep(randomIntBetween(1, 3));

  // Steps 2-4: O&M -> Work orders overview -> Work orders grid.
  const wo = openModule(MODULES.WorkOrdersOM, '2. O&M -> Work orders overview -> Work orders', undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));
  if (!wo.ok) return;   // session stays alive for the next iteration (auth-once)

  // Step 5: open a work order -> popup, then close (client-side -> think time).
  const woId = firstId(wo.listText, 'Request');
  if (woId) {
    openRecordModal(WORKORDER, woId, null, '5. Open work order -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // Step 6: "Site" dropdown -> the configured site (location filter).
  if (siteId) {
    applyLocationFilter(MODULES.WorkOrdersOM, siteId, wo.us, `6. Site filter -> ${SITE_NAME}`);
    sleep(randomIntBetween(1, 3));
  }

  // Step 7: "Site" dropdown -> Show all sites (clear location filter).
  applyLocationFilter(MODULES.WorkOrdersOM, 0, wo.us, '7. Site filter -> Show all sites');
  sleep(randomIntBetween(1, 3));

  // Step 8: open Filter panel — CLIENT-SIDE (no HTTP) -> think time.
  sleep(randomIntBetween(1, 3));

  // Step 9: "Pin filter" -> persists the UI preference (saveToggleValue FilterPinned=1).
  saveToggle('UserSettings', 'FilterPinned', '1');
  sleep(randomIntBetween(1, 3));

  // Step 10: Work order status -> Select all (auto-applies).
  applyDataFilter(MODULES.WorkOrdersOM, 'DataFilter_TFStatus', woDataFilterValues(STATUS_ALL), wo.us, '10. WO status -> Select all');
  sleep(randomIntBetween(1, 3));

  // Step 11: Work order status -> Deselect all.
  applyDataFilter(MODULES.WorkOrdersOM, 'DataFilter_TFStatus', woDataFilterValues(''), wo.us, '11. WO status -> Deselect all');
  sleep(randomIntBetween(1, 3));

  // Step 12: Work order status -> Created.
  applyDataFilter(MODULES.WorkOrdersOM, 'DataFilter_TFStatus', woDataFilterValues(STATUS_CREATED), wo.us, '12. WO status -> Created');
  sleep(randomIntBetween(1, 3));

  // Step 13: Clear filter (cancel).
  clearDataFilter(MODULES.WorkOrdersOM, woDataFilterValues(STATUS_CREATED), wo.us, '13. Clear data filter');
  sleep(randomIntBetween(1, 3));

  // No per-iteration logout (auth-once): logout would kill the VU's session and break
  // the next iteration, and login-per-iteration at high VU floods the login front door.
  sleep(1);
}

export default scenario6;

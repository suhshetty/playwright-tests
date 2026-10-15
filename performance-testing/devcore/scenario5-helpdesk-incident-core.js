/*
 * SCENARIO 5 — CORE tenant (https://kommunedevcore.mainmanager.is)
 *   Login -> Helpdesk -> Incidents overview -> All incidents
 *   -> clear the filter (the X on the Filter button)
 *   -> open an incident -> close -> Logout
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec.
 *
 *   1. Login                                          -> login()
 *   2. Helpdesk -> Incidents overview -> All incidents -> openModule(Incidents)
 *   3. Clear the filter (X on the Filter button)       -> clearDataFilter()
 *   4. Open an incident from the list                  -> openRecordModal(Incident)
 *   5. Close the form                                  -> client-side -> think time
 *   6. Logout                                          -> logout()
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON KOMMUNEDEVCORE 2026-09-07 — verified, not guessed
 * ---------------------------------------------------------------------------
 *   Sub-tab      subTabClicked('Incident', 0, 1168, 1, 'Incidents', 'Helpdesk')
 *                — the sub-tab LABELLED "All incidents" is subtab-Incident; there
 *                  are 11 sub-tabs under this step, so the label matters.
 *   Layout       InitMainLayout { MenuItemKey:'Incident', MenuItemID:1168,
 *                  MenuItemTypeID:1, ProcessTag:'Helpdesk',
 *                  ProcessStepTag:'Incidents' }  -> DataPath Incident$1$0
 *   Clear filter [data-testid="data-filter-clear-button"] -> emptyDataFilter(event)
 *                POST /api/MMLayout/EmptyDataFilter, form-urlencoded, 25 Value[] fields
 *   Open        LoadMMModalControl { Tag:'Incident', DataPath:'Incident$1$46928' }
 *                + GetChildCount, 7 child keys
 *
 * TWO LIBRARY VALUES WERE WRONG and are fixed in lib/mainmanager-core.js:
 *   processStepTag was 'IncidentOverview'  -> actually 'Incidents'
 *   menuItemId     was 1197                -> actually 1168
 * Same class of error as the scenario 1 WorkOrders entry, which pointed at the O&M
 * day-planning grid instead of the Helpdesk one. Do not trust an unverified id.
 *
 * WHAT THE FILTER-CLEAR STEP ACTUALLY DOES — MEASURED, NOT INFERRED
 *   The captured payload carries DataFilter_TFStatusID#5,3, which looks like a
 *   two-status restriction, so the obvious reading is that clearing it widens the grid.
 *   The row counts say otherwise. Measured at 1 VU with -e VERIFY=true:
 *       Incident grid (unfiltered):   recordsTotal=4803
 *       Incident after filter clear:  recordsTotal=4803
 *   Identical. Either the grid k6 loads is not pre-filtered the way the browser's is,
 *   or that status filter does not restrict this dataset. Either way the step is a real
 *   EmptyDataFilter round-trip plus a full grid reload, so it belongs in the load
 *   model — but do NOT describe it as widening the result set.
 *
 * ---------------------------------------------------------------------------
 * LEARNINGS FROM SCENARIOS 1, 2 AND 3, ALL APPLIED
 * ---------------------------------------------------------------------------
 * 1. NO auth-once. scenario5-helpdesk-incident.js uses ensureSession(), which is
 *    broken: k6 clears the VU cookie jar between iterations, so from iteration 2 the
 *    requests carry no session cookie and the server answers 200 with empty data,
 *    silently. That file has been measuring nothing since its 2nd iteration.
 * 2. LOGIN-FAILURE BACKOFF (20-40s) — without it a failed login restarts in ~0.3s and
 *    each VU hammers the login endpoint several times a second.
 * 3. ITERATION DELAY 10s, matching every other scenario so login rates compare.
 * 4. SERVER-ISSUED UniqueString — the CORE library always reads it from
 *    InitMainLayout. Inventing one returned 403 on kommune's Buildings grid.
 * 5. ASSERT ON CONTENT: the grid must return rows. A 200 with an empty grid is exactly
 *    what the broken auth-once model produced, and no status check catches it.
 * 6. BASE_URL GUARD — the library's last config fallback targets BYGST.
 *
 *   # smoke — run first, expect 0 business_errors
 *   bash run.sh 5 -e VUS=1 -e DURATION=90s -e VERIFY=true
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, logout, openModule, openRecordModal, clearDataFilter,
  MODULES, recordModalTrend, defaultOptions, handleSummary,
} from './lib/mainmanager-core.js';

if (!__ENV.BASE_URL) {
  throw new Error(
    'Pass -e BASE_URL=https://kommunedevcore.mainmanager.is\n' +
    'Credentials come from config-core.json, or -e MM_USERNAME / -e MM_PASSWORD.');
}

const base = defaultOptions();

export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario5core: {
          executor: 'constant-vus', exec: 'scenario5core',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario5core: {
          executor: 'ramping-vus',
          exec: 'scenario5core',
          startVUs: 1,
          // 5m ramp + 5m soak = 10 minutes, matching scenarios 1, 2 and 3.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

const INCIDENTS  = MODULES.Incidents;
const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// The Incident filter panel, captured verbatim from the browser's EmptyDataFilter call.
// DO NOT edit the order or membership — it must match what the UI posts. Note
// TFStatusID#5,3: the grid ships pre-filtered to two statuses, and clearing widens it.
function incidentFilterValues() {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFDateFilterID#1000',
    'DataFilter_TFTimeLimitINPUT#All years', 'DataFilter_TFTimeLimit#;',
    'DataFilter_TFInspectedByID#0', 'DataFilter_TFMainTypeV2ID#0',
    'DataFilter_TFMainTypeID#0', 'DataFilter_TFFromLocalChecklist#0',
    'DataFilter_TFStandardChecklistID#0', 'DataFilter_TFLocalChecklistID#0',
    'DataFilter_TFStatusID#5,3', 'DataFilter_TFCheckwordID#0',
    'DataFilter_TFCheckwordItemID#0', 'DataFilter_TFPriorityID#0',
    'DataFilter_TFThemeID#1', 'DataFilter_TFCheckwordSubitemID#0',
    'DataFilter_TFBudgetYear#0', 'DataFilter_TFIncidentMode#0',
    'DataFilter_TFFinishedByOrganisationID#0', 'DataFilter_TFFinishedByID#0',
    'DataFilter_TFDecisionQualityID#0', 'DataFilter_TFIncidentReviewStatusID#0',
    'DataFilter_TFEFScopeCategoryID1#0', 'DataFilter_TFEFGlobalCategoryID1#0',
    'DataFilter_TFInspectedByDivisionSelection#',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario5core() {
  // Step 1: LOGIN. Backoff on failure is REQUIRED — see learning 2 in the header.
  if (!login()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Step 2: Helpdesk -> Incidents overview -> All incidents.
  const grid = openModule(INCIDENTS, '2. Helpdesk -> Incidents overview -> All incidents',
    undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));
  if (!grid.ok) { logout(); sleep(ITER_DELAY); return; }

  // Step 3: clear the filter (the X on the Filter button) — EmptyDataFilter plus a full
  // grid reload. Row count is unchanged by it (4803 before and after); see the header.
  clearDataFilter(INCIDENTS, incidentFilterValues(), grid.us, '3. Clear filter (X)');
  sleep(randomIntBetween(1, 3));

  // Step 4: open an incident from the list. Picked LIVE from the grid response, so no
  // hardcoded record id.
  const incidentId = firstId(grid.listText, 'Incident');
  check(null, { 'Incidents grid returned rows': () => incidentId !== null });
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} incidentId=${incidentId}`);
  if (incidentId) {
    openRecordModal(INCIDENTS, incidentId, grid.us, '4. Open incident -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));   // Step 5: close is client-side
  }

  // Step 6: Logout, then the gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario5core;

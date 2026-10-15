/*
 * SCENARIO 6 — CORE tenant (https://kommunedevcore.mainmanager.is)
 *   Login -> Operation and maintenance -> Work order overview -> Work orders
 *   Journey A: clear the filter (X), open a work order, close it
 *   Journey B: Site dropdown -> Aktivitetscenter, then clear the Site filter
 *   Journey C: Filter button -> Pin -> status Select all -> Deselect all + "Is open"
 *              -> clear the filter (X)
 *   Logout
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec
 * (row 1 is Login, the last row is Logout; the three "Open Operation and maintenance
 * and ..." blocks in between share one session).
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON KOMMUNEDEVCORE 2026-09-09 — every payload below was recorded by
 * hooking XMLHttpRequest in the real browser and driving the real controls. Nothing
 * here is inferred from the other scenarios.
 * ---------------------------------------------------------------------------
 *   Sub-tab   subTabClicked('Request', 0, 1133, 1, 'Requests', 'OperationAndMaintenance')
 *             -> MODULES.WorkOrdersOM. The id is 1133. MODULES.WorkOrders is the
 *             HELPDESK work-order grid (1143) and shares dataTag 'Request', so getting
 *             this wrong still returns work orders and looks fine — it just measures
 *             the wrong module. The previous draft of this file made exactly that
 *             mistake, and also read row ids with dataTag 'WorkOrder' against a grid
 *             whose tag is 'Request', so it could never have opened a record.
 *   Filter    EmptyDataFilter / RefreshDataFilter, form-urlencoded, DataTag=Request,
 *             17 Value[] fields (see workOrderFilterValues) plus TemplateID=0.
 *   Statuses  Created 3, In waiting 6, In progress 5, Finished 2, Billed 9,
 *             Is open 14, Cancelled 1.
 *               Select all   -> TFStatus#3,6,5,2,9,14,1   -> 39,544 rows
 *               Deselect all -> TFStatus#   (empty)        -> 39,566 rows  (see below)
 *               Is open only -> TFStatus#14                ->  6,051 rows
 *             An EMPTY TFStatus means "no status constraint", not "match nothing" — it
 *             returns 22 MORE rows than ticking all seven boxes, because some work
 *             orders carry a status that is not one of the seven options.
 *   Site      RefreshMainManFilter, DataTag=Request,
 *             ControlIDChanged=MainManFilter_TFGroundID, 4 controls
 *             (RegionID, MainGroupID, GroundID, MainID) — matches applyLocationFilter.
 *   Open      LoadMMModalControl + GetChildCount (26 child keys) and NOTHING ELSE.
 *             No BuildGraphicalModal, no GetLayerPoints — hence skipGis on the module.
 *             Sending them would invent load the real client never generates.
 *
 * THREE THINGS THAT ARE NOT WHAT THE SPEC IMPLIES:
 *   a) "select Aktivitetscenter" — there is no site with that exact name. The dropdown
 *      holds "Aktivitetscenter Biffen", "Bøgeskovgård Aktivitetscenter", "Elev
 *      Aktivitetscenter" and others. Resolved with { prefix: true } (same trick as
 *      scenario 4's site), which lands on Aktivitetscenter Biffen = GroundID 57988.
 *      That site has 1 work order across all statuses and 0 with "Is open", so the
 *      site-filter step asserts a grid came back, NOT that it has rows.
 *   b) "tick the box for Open work order" — the checkbox is labelled "Is open" (14).
 *      There is no option called "Open work order".
 *   c) "Click the Filter-button" costs ZERO HTTP requests — the panel markup is already
 *      fetched by LoadMMFilterControl during the module load, so opening it is pure
 *      client-side. "Pin filter" fires exactly one GetMMList. Both are modelled
 *      accordingly (think time + one reloadGrid), not as invented round-trips.
 *
 * ---------------------------------------------------------------------------
 * LEARNINGS FROM SCENARIOS 1-5, ALL APPLIED
 * ---------------------------------------------------------------------------
 * 1. NO auth-once — k6 clears the VU cookie jar between iterations, so ensureSession()
 *    sends everything after iteration 1 unauthenticated and the server answers 200 with
 *    empty data, silently.
 * 2. LOGIN-FAILURE BACKOFF (20-40s) — otherwise a failed login restarts in ~0.3s and
 *    each VU hammers the login endpoint several times a second.
 * 3. ITERATION DELAY 10s, matching every other scenario so login rates compare.
 * 4. SERVER-ISSUED UniqueString — read from InitMainLayout, never invented.
 * 5. ASSERT ON CONTENT, in every run and not just under -e VERIFY. A 200 with an empty
 *    grid is the failure no status check catches. minRows is used only where an empty
 *    grid cannot be real data (see the note on the site filter above).
 * 6. BASE_URL GUARD — the library's last config fallback targets BYGST.
 * 7. VERIFY LOGGING of row counts so each filter can be shown to actually filter.
 * 8. METRIC CARDINALITY — handled in the library: every URL carrying a per-iteration
 *    UniqueString is name-tagged, or a 250 VU run blows k6's 100k series limit.
 *
 *   # smoke — run first, expect 0 business_errors
 *   bash run.sh 6 -e VUS=1 -e DURATION=160s -e VERIFY=true
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, logout, openModule, openRecordModal, reloadGrid,
  applyLocationFilter, applyDataFilter, clearDataFilter, resolveFilterId,
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
        scenario6core: {
          executor: 'constant-vus', exec: 'scenario6core',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario6core: {
          executor: 'ramping-vus',
          exec: 'scenario6core',
          startVUs: 1,
          // 5m ramp + 5m soak = 10 minutes, matching scenarios 1-5.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

const WO = MODULES.WorkOrdersOM;

const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// See note (a) in the header — prefix match, no exact "Aktivitetscenter" exists.
const SITE_NAME = __ENV.SITE_NAME || 'Aktivitetscenter';

// Work order status ids, captured from the checkbox list.
const STATUS_ALL    = '3,6,5,2,9,14,1';
const STATUS_NONE   = '';
const STATUS_ISOPEN = __ENV.OPEN_STATUS_ID || '14';   // "Is open"

// The work-order filter panel, captured verbatim from the browser's RefreshDataFilter.
// DO NOT edit the order or membership. Only TFStatus varies between calls.
//
// timeLimit: the browser sends TFTimeLimit# (empty) on EmptyDataFilter but TFTimeLimit#;
// (a bare semicolon) on RefreshDataFilter. Both are reproduced rather than normalised,
// because guessing which one the server tolerates is exactly how the bygst checksum
// bugs happened.
function workOrderFilterValues(statusCsv, timeLimit) {
  return [
    'DataFilter_TFSearchText#',
    'DataFilter_TFDateFilterID#1000',
    'DataFilter_TFTimeLimitINPUT#All years',
    `DataFilter_TFTimeLimit#${timeLimit}`,
    'DataFilter_TFMainTypeID#0',
    'DataFilter_TFAssignmentCategoryID#0',
    'DataFilter_TFFinanceDataSetID#0',
    'DataFilter_TFAccountID#0',
    'DataFilter_TFMaintenanceCategoryID#0',
    'DataFilter_TFCategoryID#0',
    'DataFilter_TFOrganisationFromID#0',
    'DataFilter_TFOwnerID#0',
    'DataFilter_TFOrganisationToID#0',
    'DataFilter_TFEmployeeToID#0',
    'DataFilter_TFShowInactiveFilterID#0',
    'DataFilter_TFFinishBehindSchedule#false',
    `DataFilter_TFStatus#${statusCsv}`,
  ];
}
const refreshValues = (statusCsv) => workOrderFilterValues(statusCsv, ';');
const emptyValues   = (statusCsv) => workOrderFilterValues(statusCsv, '');

// The browser posts this alongside DataTag on both filter endpoints.
const EXTRA = { TemplateID: 0 };

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario6core() {
  // Step 1: LOGIN. Backoff on failure is REQUIRED — see learning 2 in the header.
  if (!login()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // ---- JOURNEY A: open the grid, clear the filter, open a work order -------------
  // Step 2: O&M -> Work order overview -> Work orders.
  // minRows:1 — the unfiltered grid holds ~10k work orders; empty means a broken
  // session, not real data.
  const wo = openModule(WO, '2. O&M -> Work order overview -> Work orders',
    undefined, { keepList: true, minRows: 1 });
  sleep(randomIntBetween(1, 3));
  if (!wo.ok) { logout(); sleep(ITER_DELAY); return; }

  // Step 3: clear the filter with the X on the Filter button.
  // minRows:1 — clearing RESETS to the default status set (verified: 39,544 rows with
  // every status ticked, 10,277 after the reset). It does not empty the grid.
  clearDataFilter(WO, emptyValues(STATUS_ALL), wo.us, '3. Clear filter (X)',
    undefined, { minRows: 1, extraFields: EXTRA });
  sleep(randomIntBetween(1, 3));

  // Steps 4-5: open a work order from the list, then close it (close is client-side).
  const woId = firstId(wo.listText, WO.dataTag);
  check(null, { 'Work order grid returned rows': () => woId !== null });
  if (woId) {
    openRecordModal(WO, woId, wo.us, '4. Open work order', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // ---- JOURNEY B: Site filter ----------------------------------------------------
  // Step 6: the spec re-enters the module for this block. Reloading also hands us a
  // fresh UniqueString, which the filter calls are keyed on.
  const wo2 = openModule(WO, '6. Back to Work orders (site filter journey)',
    undefined, { keepList: true, minRows: 1 });
  sleep(randomIntBetween(1, 3));
  if (!wo2.ok) { logout(); sleep(ITER_DELAY); return; }

  // Step 7: Site dropdown -> Aktivitetscenter.
  // NO minRows here: Aktivitetscenter Biffen genuinely has very few work orders, and on
  // some status sets none at all. Asserting rows would fail on correct behaviour.
  const siteId = resolveFilterId(WO, 'GroundID', SITE_NAME,
    { type: '3', prefix: true, groupName: `Resolve site '${SITE_NAME}'` });
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} siteId=${siteId}`);
  if (siteId) {
    applyLocationFilter(WO, siteId, wo2.us, `7. Site filter -> ${SITE_NAME}`);
    sleep(randomIntBetween(1, 3));
  }

  // Step 8: clear the Site filter (Show all sites). minRows:1 — "all sites" cannot be
  // empty.
  applyLocationFilter(WO, 0, wo2.us, '8. Clear site filter (Show all sites)',
    undefined, { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // ---- JOURNEY C: status filter --------------------------------------------------
  // Step 9: the spec re-enters the module again for the third block.
  const wo3 = openModule(WO, '9. Back to Work orders (status filter journey)',
    undefined, { keepList: true, minRows: 1 });
  sleep(randomIntBetween(1, 3));
  if (!wo3.ok) { logout(); sleep(ITER_DELAY); return; }

  // Step 10: "Click the Filter-button" — ZERO HTTP (see note (c)). Think time only.
  sleep(randomIntBetween(1, 3));

  // Step 11: "Pin filter" — the layout reflow costs exactly one GetMMList.
  reloadGrid(WO, wo3.us, '11. Pin filter (grid reflow)', undefined, { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 12: Work order status -> Select all.
  applyDataFilter(WO, 'DataFilter_TFStatus', refreshValues(STATUS_ALL), wo3.us,
    '12. Status filter -> Select all', undefined, { minRows: 1, extraFields: EXTRA });
  sleep(randomIntBetween(1, 3));

  // Step 13a: Deselect all.
  // MEASURED, and it is not what you would guess: deselecting every status does NOT
  // return zero rows, it returns MORE than "select all" — 39,566 vs 39,544. An empty
  // TFStatus means "no status constraint", not "no status matches". The extra 22 rows
  // are work orders whose status is not one of the seven checkboxes at all.
  // So minRows:1 is correct here.
  applyDataFilter(WO, 'DataFilter_TFStatus', refreshValues(STATUS_NONE), wo3.us,
    '13. Status filter -> Deselect all', undefined, { minRows: 1, extraFields: EXTRA });
  sleep(randomIntBetween(1, 3));

  // Step 13b: tick "Is open" only.
  applyDataFilter(WO, 'DataFilter_TFStatus', refreshValues(STATUS_ISOPEN), wo3.us,
    `13. Status filter -> Is open (${STATUS_ISOPEN})`, undefined,
    { minRows: 1, extraFields: EXTRA });
  sleep(randomIntBetween(1, 3));

  // Step 14: clear the filter with the X again.
  clearDataFilter(WO, emptyValues(STATUS_ISOPEN), wo3.us, '14. Clear filter (X)',
    undefined, { minRows: 1, extraFields: EXTRA });
  sleep(randomIntBetween(1, 3));

  // Step 15: Logout, then the gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario6core;

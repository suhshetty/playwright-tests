/*
 * SCENARIO 6 (KOMMUNE) — https://kommune.mainmanager.is
 *   Login -> Operation and maintenance -> Work order overview -> Work orders
 *   Block A: clear the filter (X), open a work order, close it
 *   Block B: Site dropdown -> Aktivitetscenter, then clear the Site filter
 *   Block C: Filter button -> Pin -> status Select all -> Deselect all + "Is open"
 *            -> clear the filter (X)
 *   Logout
 *
 * kommune runs the SAME WebForms build as bygst and the SAME single-postback login
 * (lgnUserLogin$UserName / $Password, no OTP), so this uses lib/mainmanager.js for
 * login / openModule / openRecordModal / logout. Credentials from config-kommune.json.
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec.
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON kommune.mainmanager.is 2026-09-15 — measured, not copied
 * ---------------------------------------------------------------------------
 *   Sub-tab   subTabClicked('Request', 0, 1133, 1, 'Requests', 'OperationAndMaintenance')
 *             labelled "Work orders" under the "Work order overview" step.
 *             NOTE: bygst's MODULES.WorkOrdersOM is menuItemId 131. kommune is 1133
 *             (same as CORE). Declared locally so the shared descriptor cannot be
 *             used by accident.
 *   Grid      10,329 rows on the default status selection (3,6,5,14). pageSize 100.
 *   Statuses  3 Created, 6 In waiting, 5 In progress, 2 Finished, 9 Billed,
 *             14 "Is open", 1 Cancelled.  Default ticked: 3,6,5,14.
 *               Select all   -> TFStatus#3,6,5,2,9,14,1 -> 39,600 rows
 *               Deselect all -> TFStatus#   (empty)     -> 39,622 rows  (see below)
 *               Is open only -> TFStatus#14             ->  6,051 rows
 *             An EMPTY TFStatus means "no status constraint", NOT "match nothing" —
 *             it returns 22 MORE rows than ticking all seven boxes, because some work
 *             orders carry a status that is not one of the options. Same on CORE.
 *   Site      Aktivitetscenter Biffen = GroundID 57988. Filtering by it returns
 *             ZERO work orders, which is correct data — so the apply leg must NOT
 *             assert rows.
 *   Filter    RefreshDataFilter carries TemplateID:0; EmptyDataFilter does NOT.
 *   Open      openMyModal('Request','Request$1$82428',...,'UseDefaultViewKey','','7',
 *             'Open work order') -> LoadMMModalControl + GetChildCount (26 keys)
 *             + GetDropZoneDocuments + BuildGraphicalModal + GetLayerPoints.
 *
 * THREE THINGS THE SHARED LIBRARY GETS WRONG FOR THIS GRID
 *   1. applyLocationFilter() sends only THREE controls (MainGroupID / GroundID /
 *      MainID). kommune's work-order bar sends FOUR — it includes
 *      MainManFilter_TFRegionID#0. Captured verbatim:
 *        {"DataTag":"Request","ControlIDChanged":"MainManFilter_TFGroundID",
 *         "Value":["MainManFilter_TFRegionID#0","MainManFilter_TFMainGroupID#0",
 *                  "MainManFilter_TFGroundID#57988","MainManFilter_TFMainID#0"]}
 *      Per the library's own warning, a wrong payload is accepted with 200 and the
 *      filter then silently does not apply. Hence the local siteFilter() below.
 *   2. The filter helpers assert only status 200 and keep the response body only
 *      under -e VERIFY, so a filter that does nothing passes in a load run. The local
 *      helpers parse row counts on EVERY run.
 *   3. resolveDataFilterId() matches the dropdown label EXACTLY, but there is no site
 *      called "Aktivitetscenter" — only "Aktivitetscenter Biffen", "Bogeskovgard
 *      Aktivitetscenter" and "Elev Aktivitetscenter". The id is therefore pinned
 *      (-e SITE_GROUND_ID to override) rather than resolved by an exact name that
 *      does not exist.
 *
 * SPEC READING — the spec repeats "Select module Operation and maintenance and go to
 * tab Work order overview<Work order" at the top of each of the three blocks. That is
 * test-case boilerplate, not three navigations: a user filtering a grid is already on
 * it. The module is opened ONCE per iteration, consistent with the correction made on
 * scenario 2 and with bygst (2 openModule calls per iteration there, 1 here).
 *
 * "Click the Filter-button" costs ZERO HTTP requests (verified by hooking every XHR
 * while clicking it) — the panel markup already arrived with LoadMMFilterControl
 * during the module load. It is modelled as think time, not an invented call.
 * "Pin filter" DOES cost two: one GetMMList reflow plus
 * saveToggleValue {MySection:'UserSettings', MyKey:'FilterPinned', Value:'1'}.
 *
 * LEARNINGS CARRIED OVER:
 *   - JOURNEY model, not auth-once (k6 clears the VU cookie jar between iterations).
 *   - LOGIN-FAILURE BACKOFF 20-40s.
 *   - ITER_DELAY fixed 10s, matching bygst/CORE/Odense so login rates compare.
 *   - serverUniqueString: TRUE — without it the library invents a UniqueString the
 *     server holds no layout against, so every filter binds to nothing and the grid
 *     reloads unfiltered while all checks pass. Proven on scenario 5 kommune, where
 *     the clear step read 25,896 rows before AND after until this was turned on.
 *   - ASSERT ON CONTENT in every run, not just under -e VERIFY.
 *   - BASE_URL guard: the shared library's last config fallback targets BYGST.
 *
 *   # smoke — ALWAYS run this first
 *   bash run.sh 6 -e VUS=1 -e DURATION=180s -e VERIFY=true
 */

import { check, sleep, group } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import http from 'k6/http';
import {
  login, logout, openModule, openRecordModal, saveToggle,
  APP, ajaxJson, ajaxForm, errorRate, filterTrend, navigateTrend, recordModalTrend,
  defaultOptions, handleSummary,
} from './lib/mainmanager.js';

const KCONF = (function () {
  const candidates = ['./config-kommune.json', '../config-kommune.json', 'PerformanceTests/config-kommune.json'];
  for (let i = 0; i < candidates.length; i++) {
    try { const t = open(candidates[i]); if (t) return JSON.parse(t); } catch (e) { /* try next */ }
  }
  return {};
})();
const USERNAME = __ENV.MM_USERNAME || KCONF.username || '';
const PASSWORD = __ENV.MM_PASSWORD || KCONF.password || '';

if (!__ENV.BASE_URL) {
  throw new Error(
    'Pass -e BASE_URL=https://kommune.mainmanager.is (and -e MM_USERNAME / -e MM_PASSWORD).\n' +
    'Without it the shared library falls back to config.json, which targets bygst — ' +
    'you would load-test the wrong customer.');
}

const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario6kommune: {
          executor: 'constant-vus', exec: 'scenario6kommune',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario6kommune: {
          executor: 'ramping-vus',
          exec: 'scenario6kommune',
          startVUs: 1,
          // 5m ramp + 5m soak. For the 1-hour profile use 5m + 55m.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

// Declared LOCALLY — kommune/CORE are 1133; bygst is 131.
const WO = {
  processTag: 'OperationAndMaintenance', processStepTag: 'Requests',
  dataTag: 'Request', dataCaption: 'Work order', dataPath: 'Request$1$0',
  menuItemId: parseInt(__ENV.MENUITEM_WORKORDERS || '1133', 10), menuItemType: 1,
  pageSize: parseInt(__ENV.GRID_PAGE || '100', 10),
  mainManFilterTag: 'Request',
  dataText: 'Open work order',
  // All 26 keys the browser requests, in its order.
  childKeys: ['RequestEmployee', 'RequestMainManDocument', 'RequestMainManDocumentNoAccess',
              'RequestEmailHistory', 'RequestPlannedCost', 'RequestHours', 'RequestMaterial',
              'RequestOtherCost', 'RequestHSEItem', 'RequestInspection', 'LocalChecklist',
              'LocalChecklistIncident', 'RequestDocument', 'Incident', 'FollowUpComplaint',
              'FollowupUnfinishedIncident', 'RecurringIncident', 'RequestRecipitant', 'Thread',
              'Note', 'Reminder', 'StandardMessage', 'RequestHistoryForLocation',
              'EnvironmentalGoal', 'RequestEnvironmentalGoal', 'Invoice'],
};

const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// Aktivitetscenter Biffen. Pinned, not name-resolved — see note 3 in the header.
const SITE_GROUND_ID = parseInt(__ENV.SITE_GROUND_ID || '57988', 10);

const STATUS_ALL    = '3,6,5,2,9,14,1';
const STATUS_NONE   = '';
const STATUS_ISOPEN = __ENV.OPEN_STATUS_ID || '14';   // "Is open"

// The work-order filter panel, captured verbatim. DO NOT edit order or membership.
function woFilterValues(statusCsv) {
  return [
    'DataFilter_TFSearchText#',
    'DataFilter_TFDateFilterID#1000',
    'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#;',
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

function listBody(mod, us) {
  const len = parseInt(__ENV.GRID_PAGE || mod.pageSize || 100, 10);
  return `draw=1&start=0&length=${len}&search%5Bvalue%5D=&search%5Bregex%5D=false`
    + `&DataPath=${encodeURIComponent(mod.dataPath)}&UniqueString=${us}`
    + `&Gantt=False&PopupSQLListIndex=0&GroupBy=&ExtraParams=&IsSublist=False`;
}
function rowsIn(text) {
  const m = (text || '').match(/"recordsTotal":(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

// Reload the grid, keeping the body so the row count can be asserted on every run.
function reload(mod, us) {
  const r = http.post(`${APP}/restapi/List/GetMMList`, listBody(mod, us),
    Object.assign({ responseType: 'text' }, ajaxForm()));
  return { res: r, rows: rowsIn(typeof r.body === 'string' ? r.body : '') };
}
function assertGrid(label, r, opts) {
  opts = opts || {};
  let ok = check(r.res, {
    [`grid reloaded after ${label}`]: (x) => x.status === 200,
    [`${label} returned a grid`]:     () => r.rows !== null,
  });
  if (typeof opts.minRows === 'number') {
    ok = check(null, {
      [`${label} kept >= ${opts.minRows} rows`]: () => r.rows !== null && r.rows >= opts.minRows,
    }) && ok;
  }
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} ${label}: rows=${r.rows}`);
  errorRate.add(!ok);
  return r.rows;
}

// FOUR location controls, including RegionID — see note 1 in the header.
function siteFilter(mod, groundId, us, groupName, opts) {
  let rows = null;
  group(groupName || `Site filter ${groundId}`, function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/RefreshMainManFilter`, JSON.stringify({
      DataTag: mod.mainManFilterTag || mod.dataTag,
      ControlIDChanged: 'MainManFilter_TFGroundID',
      Value: ['MainManFilter_TFRegionID#0', 'MainManFilter_TFMainGroupID#0',
              `MainManFilter_TFGroundID#${groundId}`, 'MainManFilter_TFMainID#0'],
    }), ajaxJson());
    rows = assertGrid(`site filter (GroundID=${groundId})`, reload(mod, us), opts);
    filterTrend.add(Date.now() - t0);
  });
  return rows;
}

function statusFilter(mod, statusCsv, us, groupName, opts) {
  let rows = null;
  group(groupName || `Status filter ${statusCsv || '(none)'}`, function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/RefreshDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, ControlIDChanged: 'DataFilter_TFStatus',
      Value: woFilterValues(statusCsv), TemplateID: 0,
    }), ajaxJson());
    rows = assertGrid(`status filter (${statusCsv || 'none'})`, reload(mod, us), opts);
    filterTrend.add(Date.now() - t0);
  });
  return rows;
}

// EmptyDataFilter carries NO TemplateID — captured that way.
function clearFilter(mod, statusCsv, us, groupName, opts) {
  let rows = null;
  group(groupName || 'Clear filter (X)', function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/EmptyDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, Value: woFilterValues(statusCsv),
    }), ajaxJson());
    rows = assertGrid('filter clear', reload(mod, us), opts);
    filterTrend.add(Date.now() - t0);
  });
  return rows;
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario6kommune() {
  // Step 1: LOGIN every iteration. Backoff is REQUIRED.
  if (!login({ username: USERNAME, password: PASSWORD })) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Step 2: O&M -> Work order overview -> Work orders.
  // serverUniqueString REQUIRED — see the learnings note in the header.
  const grid = openModule(WO, '2. O&M -> Work order overview -> Work orders',
    undefined, { keepList: true, serverUniqueString: true });
  sleep(randomIntBetween(1, 3));
  if (!grid.ok) { logout(); sleep(ITER_DELAY); return; }

  const unfiltered = rowsIn(grid.listText);
  check(null, { 'work order grid returned rows': () => unfiltered !== null && unfiltered > 0 });
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} unfiltered=${unfiltered}`);

  // ---- BLOCK A ------------------------------------------------------------------
  // Step 3: clear the filter (X). Resets to the DEFAULT status set (3,6,5,14), which
  // is already the state on load, so the count does not change — but the request is
  // real and is what the spec asks for. minRows:1 because the default view is never
  // legitimately empty.
  clearFilter(WO, STATUS_ALL, grid.us, '3. Clear filter (X)', { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Steps 4-5: open a work order, then close it (close is client-side -> think time).
  const woId = firstId(grid.listText, WO.dataTag);
  check(null, { 'work order id readable from grid': () => woId !== null });
  if (woId) {
    openRecordModal(WO, woId, grid.us, '4. Open work order -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // ---- BLOCK B: site filter -----------------------------------------------------
  // Step 6: Site -> Aktivitetscenter (Biffen). NO minRows — that site genuinely has
  // zero work orders, so asserting rows would fail on correct behaviour.
  const siteRows = siteFilter(WO, SITE_GROUND_ID, grid.us,
    `6. Site filter -> Aktivitetscenter (${SITE_GROUND_ID})`);
  sleep(randomIntBetween(1, 3));

  // Step 7: clear the Site filter (Show all sites). minRows:1 — "all sites" cannot
  // legitimately be empty.
  const siteCleared = siteFilter(WO, 0, grid.us, '7. Clear site filter (Show all sites)',
    { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // The assertion that catches a site filter doing nothing: the filtered count must
  // differ from the restored one. Both are measured inside this iteration, so it
  // holds regardless of what state the account started in.
  if (siteRows !== null && siteCleared !== null) {
    check(null, { 'site filter changed the grid': () => siteRows !== siteCleared });
  }

  // ---- BLOCK C: status filter ---------------------------------------------------
  // Step 8: "Click the Filter-button" — ZERO HTTP (verified). Think time only.
  sleep(randomIntBetween(1, 3));

  // Step 9: "Pin filter" — one grid reflow plus the UserSettings toggle.
  group('9. Pin filter', function () {
    const t0 = Date.now();
    assertGrid('pin filter reflow', reload(WO, grid.us), { minRows: 1 });
    saveToggle('UserSettings', 'FilterPinned', '1');
    navigateTrend.add(Date.now() - t0);
  });
  sleep(randomIntBetween(1, 3));

  // Step 10: Work order status -> Select all.
  statusFilter(WO, STATUS_ALL, grid.us, '10. Status -> Select all', { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 11a: Deselect all. minRows:1 is correct — an EMPTY status list means "no
  // constraint" and returns MORE rows than all-ticked (39,622 vs 39,600), not zero.
  statusFilter(WO, STATUS_NONE, grid.us, '11. Status -> Deselect all', { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 11b: tick "Is open" only.
  statusFilter(WO, STATUS_ISOPEN, grid.us,
    `11. Status -> Is open (${STATUS_ISOPEN})`, { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 12: clear the filter with the X again.
  clearFilter(WO, STATUS_ISOPEN, grid.us, '12. Clear filter (X)', { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 13: Logout, then the fixed gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario6kommune;

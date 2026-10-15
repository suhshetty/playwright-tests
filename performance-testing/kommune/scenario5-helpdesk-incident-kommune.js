/*
 * SCENARIO 5 (KOMMUNE) — https://kommune.mainmanager.is
 *   Login -> Helpdesk -> Incidents overview -> All incidents
 *   -> Clear the filter (X on the Filter button)
 *   -> Open an incident from the list -> close the form
 *   -> Logout
 *
 * kommune runs the SAME WebForms build as bygst and the SAME single-postback login
 * (lgnUserLogin$UserName / $Password — verified live, no OTP), so this uses
 * lib/mainmanager.js unchanged. Credentials come from config-kommune.json.
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec.
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON kommune.mainmanager.is 2026-09-15 — measured, not copied
 * ---------------------------------------------------------------------------
 *   Sub-tab   subTabClicked('Incident', 0, 1168, 1, 'Incidents', 'Helpdesk')
 *             labelled "All incidents" under the "Incidents overview" step.
 *             NOTE: bygst's MODULES.Incidents is menuItemId 142 with pageSize 10.
 *             kommune is 1168 with pageSize 100. Reusing the shared descriptor would
 *             open the wrong module and mis-state the grid cost, so the descriptor is
 *             declared locally below. (CORE is also 1168 — bygst is the odd one.)
 *   Grid      openModule sequence matches the browser: 3x saveToggleValue,
 *             InitMainLayout, 2x LoadMMFilterControl, BuildLayout,
 *             GetMMListHeaders, GetMMList.
 *   Clear     ONE call + grid reload: POST MMLayout.asmx/EmptyDataFilter with the
 *             25 Value[] fields below, then restapi/List/GetMMList.
 *             NO TemplateID on EmptyDataFilter (RefreshDataFilter has it; this does not).
 *   Open      openMyModal('Incident','Incident$1$46977','46977','<us>',
 *                          'UseDefaultViewKey','','7','Open incident', ...)
 *             -> LoadMMModalControl + GetChildCount (7 keys) + BuildGraphicalModal
 *                + GetLayerPoints. The shared openRecordModal already sends all of
 *                these, so no local version is needed.
 *
 * WHAT THE CLEAR ACTUALLY DOES — and a state warning:
 *   Default view is filtered to status 5,3 and shows 74 rows.
 *   After the clear it shows 4,837 rows.
 *   That filter state is stored PER USER ACCOUNT and persists across logout/login
 *   (same behaviour proven on Odense). So iteration 1 opens a 74-row grid and every
 *   later iteration opens a 4,837-row grid. Both are legitimate; the checks therefore
 *   assert "a grid came back with rows", NOT a fixed count, and -e VERIFY logs the
 *   before/after so the difference is visible rather than surprising.
 *
 * LEARNINGS CARRIED OVER:
 *   - JOURNEY model, not auth-once. bygst's scenario5 uses ensureSession(), which is
 *     the BROKEN model: k6 clears the VU cookie jar between iterations, so every
 *     request after iteration 1 goes out unauthenticated and the server answers 200
 *     with no data. This file logs in every iteration instead.
 *   - LOGIN-FAILURE BACKOFF (20-40s), or a failing login is retried several times a
 *     second per VU and floods the endpoint.
 *   - ITER_DELAY fixed 10s, matching bygst/CORE/Odense so login rates compare.
 *   - ASSERT ON CONTENT, in EVERY run and not just under -e VERIFY. The shared
 *     clearDataFilter asserts only status 200 and keeps the body only under VERIFY,
 *     so a filter that silently does nothing passes. clearFilterChecked() below keeps
 *     the response and asserts on the row count.
 *   - BASE_URL guard: the shared library's last config fallback targets BYGST.
 *
 *   # smoke — ALWAYS run this first
 *   bash run.sh 5 -e VUS=1 -e DURATION=120s -e VERIFY=true
 */

import { check, sleep, group } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import http from 'k6/http';
import {
  login, logout, openModule, openRecordModal,
  APP, ajaxJson, ajaxForm, errorRate, filterTrend, recordModalTrend,
  defaultOptions, handleSummary,
} from './lib/mainmanager.js';

// Credentials come from config-kommune.json (gitignored), NOT config.json — that one
// targets bygst and is shared with the bygst scenarios. -e still wins for a one-off.
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
        scenario5kommune: {
          executor: 'constant-vus', exec: 'scenario5kommune',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario5kommune: {
          executor: 'ramping-vus',
          exec: 'scenario5kommune',
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

// Declared LOCALLY — kommune is 1168 / pageSize 100; bygst is 142 / pageSize 10.
const INCIDENTS = {
  processTag: 'Helpdesk', processStepTag: 'Incidents',
  dataTag: 'Incident', dataCaption: 'Incident', dataPath: 'Incident$1$0',
  menuItemId: parseInt(__ENV.MENUITEM_INCIDENTS || '1168', 10), menuItemType: 1,
  pageSize: parseInt(__ENV.GRID_PAGE || '100', 10),
  // Exactly the 7 keys the browser requests on an incident open.
  childKeys: ['CheckItemDoc', 'IncidentRecipitant', 'IncidentReview', 'DeviationThread',
              'ConnectedRequest', 'BIMElementIncident', 'LocalChecklist'],
};

const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// The All-incidents filter panel, captured verbatim from the browser's own
// EmptyDataFilter body. DO NOT edit the order or membership.
// TFStatusID#5,3 and TFThemeID#1 are the DEFAULT selections the panel carries — they
// are sent as-is because that is what the client sends when the X is clicked.
function incidentFilterValues() {
  return [
    'DataFilter_TFSearchText#',
    'DataFilter_TFDateFilterID#1000',
    'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#;',
    'DataFilter_TFInspectedByID#0',
    'DataFilter_TFMainTypeV2ID#0',
    'DataFilter_TFMainTypeID#0',
    'DataFilter_TFFromLocalChecklist#0',
    'DataFilter_TFStandardChecklistID#0',
    'DataFilter_TFLocalChecklistID#0',
    'DataFilter_TFStatusID#5,3',
    'DataFilter_TFCheckwordID#0',
    'DataFilter_TFCheckwordItemID#0',
    'DataFilter_TFPriorityID#0',
    'DataFilter_TFThemeID#1',
    'DataFilter_TFCheckwordSubitemID#0',
    'DataFilter_TFBudgetYear#0',
    'DataFilter_TFIncidentMode#0',
    'DataFilter_TFFinishedByOrganisationID#0',
    'DataFilter_TFFinishedByID#0',
    'DataFilter_TFDecisionQualityID#0',
    'DataFilter_TFIncidentReviewStatusID#0',
    'DataFilter_TFEFScopeCategoryID1#0',
    'DataFilter_TFEFGlobalCategoryID1#0',
    'DataFilter_TFInspectedByDivisionSelection#',
  ];
}

// Same body builder the shared library uses for GetMMList (not exported there).
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

// Clear the data filter (the X on the Filter button) and assert on the DATA, not just
// the status. The shared clearDataFilter() checks status 200 only and discards the body
// unless -e VERIFY is set, which means a no-op filter passes silently in a load run.
function clearFilterChecked(mod, us, groupName) {
  let rows = null;
  group(groupName || 'Clear filter (X)', function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/EmptyDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, Value: incidentFilterValues(),
    }), ajaxJson());   // no TemplateID here — captured that way

    const list = http.post(`${APP}/restapi/List/GetMMList`, listBody(mod, us),
      Object.assign({ responseType: 'text' }, ajaxForm()));
    rows = rowsIn(typeof list.body === 'string' ? list.body : '');

    const ok = check(list, {
      'grid reloaded after filter clear': (r) => r.status === 200,
      'filter clear returned a grid':     () => rows !== null,
      'filter clear left rows in the grid': () => rows !== null && rows > 0,
    });
    errorRate.add(!ok);
    filterTrend.add(Date.now() - t0);
  });
  return rows;
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario5kommune() {
  // Step 1: LOGIN every iteration. The backoff is REQUIRED — a failed login ends the
  // iteration in ~200ms and k6 starts another immediately.
  if (!login({ username: USERNAME, password: PASSWORD })) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Step 2: Helpdesk -> Incidents overview -> All incidents.
  // serverUniqueString: TRUE — REQUIRED for the filter step to mean anything.
  // The library defaults to a CLIENT-INVENTED UniqueString, which the server accepts
  // (200) but holds no layout against, so the filter binds to nothing and the grid
  // returns the raw unfiltered set. Measured here on the first smoke: 25,896 rows
  // before AND after the clear, while the browser shows 74 then 4,837 — i.e. the
  // clear was doing nothing and every check still passed.
  // It is off by default on bygst only to keep runs 001-056 comparable
  // (see lib/mainmanager.js:584). This scenario is new, so there is no history to
  // protect and it is on from the first run.
  const grid = openModule(INCIDENTS,
    '2. Helpdesk -> Incidents overview -> All incidents', undefined,
    { keepList: true, serverUniqueString: true });
  sleep(randomIntBetween(1, 3));
  if (!grid.ok) { logout(); sleep(ITER_DELAY); return; }

  const before = rowsIn(grid.listText);
  check(null, { 'incident grid returned rows': () => before !== null && before > 0 });

  // Step 3: clear the filter with the X on the Filter button.
  // Expect 74 -> 4,837 on a fresh account; on later iterations it is already cleared,
  // so both numbers are 4,837. See the state warning in the header.
  const after = clearFilterChecked(INCIDENTS, grid.us, '3. Clear filter (X)');
  sleep(randomIntBetween(1, 3));

  if (__ENV.VERIFY) {
    console.log(`[VERIFY] vu=${__VU} iter=${__ITER} incidents before=${before} afterClear=${after}`);
  }

  // Steps 4-5: open an incident from the list, then close it (close is client-side).
  const incidentId = firstId(grid.listText, 'Incident');
  check(null, { 'incident id readable from grid': () => incidentId !== null });
  if (incidentId) {
    openRecordModal(INCIDENTS, incidentId, grid.us,
      '4. Open incident -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // Step 6: Logout, then the fixed gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario5kommune;

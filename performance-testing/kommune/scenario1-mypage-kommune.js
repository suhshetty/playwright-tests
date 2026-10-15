/*
 * SCENARIO 1 — KOMMUNE tenant (https://kommune.mainmanager.is)
 *   Login -> My page -> "Unfinished work orders on my organisation" widget
 *   -> Work order grid -> back to My page -> Logout
 *
 * Sibling of scenario1-login-mypage-logout.js, kept separate so that file and its run
 * history stay untouched — same split as scenario2-buildingarchive-kommune.js.
 * Shares lib/mainmanager.js (kommune is a WebForms tenant, like bygst).
 *
 * Manual test steps -> HTTP:
 *   1. Login                                             -> login()
 *   2. Select module My page                             -> openMyPage()
 *   3. (My page tab / dashboard widgets)                 -> openMyPageTab()
 *   4. Click "Unfinished work orders on my organisation" -> openModule(WorkOrders,
 *                                                           { snapshotId })
 *   5. Go back - select module My page                   -> openMyPage()
 *   6. Click logout                                      -> logout()
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON KOMMUNE 2026-09-03 — all values verified, none guessed
 * ---------------------------------------------------------------------------
 *   My page tab      selectMainMenu('MainSummary-2147483643', ...)
 *                    -> InitMainLayout { MenuItemKey:'MainSummary-2147483643',
 *                       SummaryID:2147483643, MenuItemID:0, MenuItemTypeID:2,
 *                       ProcessTag:'MyPage' }  then BuildMyPage { MainSummaryID:... }
 *   Widget           snapshotSelectedFromMyPage(4270)
 *                    -> SelectSnapshotFromMyPage { SnapshotID: 4270 }
 *                    label "Unfinished work orders on my organisation" (290 rows)
 *   Work order grid  InitMainLayout { MenuItemKey:'Request', MenuItemID:1143,
 *                       MenuItemTypeID:1, ProcessTag:'Helpdesk',
 *                       ProcessStepTag:'Request' }  -> DataPath Request$1$0
 *
 * Both 4270 and 1143 happen to equal the library defaults, because lib/mainmanager.js
 * was originally written against kommune. They are still declared explicitly below and
 * are -e overridable: they are per-TENANT data, and assuming a default matches is how
 * the scenario 2 Buildings grid ended up 403ing for an afternoon.
 *
 * ---------------------------------------------------------------------------
 * FIXES CARRIED OVER FROM THE BYGST SCENARIO 2 WORK
 * ---------------------------------------------------------------------------
 * 1. LOGIN-FAILURE BACKOFF (the important one). The original scenario 1 does
 *    `if (!login()) return;` with no pause. A failed login ends the iteration in
 *    ~0.3s and k6 immediately starts another, so each VU retries several times a
 *    second and the test floods a struggling login endpoint into collapse. On bygst
 *    this produced 65-69% login failures. Fixed here with a 20-40s backoff.
 * 2. ITERATION DELAY 10s, not 1s. Requested by the customer for bygst; applied to
 *    every scenario since so login rates are comparable across tenants.
 * 3. SERVER-ISSUED UniqueString (opts.serverUniqueString). openModule otherwise
 *    invents one, which the server has no layout for: on kommune's Buildings grid
 *    that returned 403, and on bygst it silently made every filter a no-op.
 * 4. BASE_URL GUARD. The library resolves its target at import time and falls back to
 *    config.json, which points at BYGST. Without the flag you would load-test the
 *    wrong customer. Fails loudly instead.
 * 5. NO auth-once. ensureSession() is broken: k6 clears the VU cookie jar between
 *    iterations, so from iteration 2 the requests carry no session cookie and the
 *    server answers 200 with empty data, silently. Scenarios 1/3/5/6 all still have
 *    this bug. The journey model below sidesteps it and matches the manual spec.
 * 6. METRIC CARDINALITY. Already fixed in the library (tags.name on the URLs that
 *    carry a per-call UniqueString) — noted so it is not undone.
 *
 *   # smoke — run this first, expect 0 business_errors
 *   bash run.sh 1 -e VUS=1 -e DURATION=90s
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, openMyPage, openMyPageTab, openModule, logout,
  MODULES, widgetTrend, defaultOptions, handleSummary,
} from './lib/mainmanager.js';

// Credentials from config-kommune.json (gitignored), NOT config.json — that targets
// bygst and is shared with the bygst scenarios. -e still wins for a one-off.
const KCONF = (function () {
  const candidates = ['./config-kommune.json', '../config-kommune.json', 'PerformanceTests/config-kommune.json'];
  for (let i = 0; i < candidates.length; i++) {
    try { const t = open(candidates[i]); if (t) return JSON.parse(t); } catch (e) { /* try next */ }
  }
  return {};
})();
const USERNAME = __ENV.MM_USERNAME || KCONF.username || '';
const PASSWORD = __ENV.MM_PASSWORD || KCONF.password || '';

// Fix 4 — see header.
if (!__ENV.BASE_URL) {
  throw new Error(
    'Pass -e BASE_URL=https://kommune.mainmanager.is\n' +
    'Without it the shared library falls back to config.json, which targets bygst — ' +
    'you would load-test the wrong customer.');
}

const base = defaultOptions();

export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario1kommune: {
          executor: 'constant-vus', exec: 'scenario1kommune',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario1kommune: {
          executor: 'ramping-vus',
          exec: 'scenario1kommune',
          startVUs: 1,
          // 5m ramp + 5m soak = 10 minutes, matching the scenario 2 runs. Gradual on
          // purpose: arriving at the target at once distorts the login measurement and
          // can tip the environment into 503 load-shedding.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

// Per-TENANT values, captured live (see header). Declared explicitly rather than
// inherited, and overridable per run.
const WIDGET_SNAPSHOT_ID = parseInt(__ENV.WIDGET_SNAPSHOT_ID || '4270', 10);
const WORKORDERS = Object.assign({}, MODULES.WorkOrders,
  { menuItemId: parseInt(__ENV.MENUITEM_WORKORDERS || '1143', 10) });

// Fix 2 — see header.
const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// Fix 3 — see header. keepList lets us assert the grid actually returned rows.
const OPTS = { keepList: true, serverUniqueString: true, snapshotId: WIDGET_SNAPSHOT_ID };

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario1kommune() {
  // Step 1: LOGIN. Fix 1 — the backoff is REQUIRED, not tidiness. See header.
  if (!login({ username: USERNAME, password: PASSWORD })) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Step 2: navigation menu -> My page. Opening the menu itself is client-side and
  // fires no HTTP, so this is just the module switch + dashboard load.
  openMyPage('2. Navigation -> My page module');
  sleep(randomIntBetween(1, 3));

  // Step 3: the My page tab — reloads the dashboard counter widgets.
  openMyPageTab('3. My page tab');
  sleep(randomIntBetween(1, 3));

  // Step 4: click "Unfinished work orders on my organisation".
  // SelectSnapshotFromMyPage tells the server which saved snapshot was clicked, THEN
  // the Work order grid loads scoped to it. Captured live: snapshot 4270 -> Helpdesk /
  // Request / DataPath Request$1$0.
  const wo = openModule(WORKORDERS, `4. Widget (snapshot ${WIDGET_SNAPSHOT_ID}) -> Work order grid`,
    widgetTrend, OPTS);

  // Assert the grid actually returned rows. Without this the step "passes" on an empty
  // grid — exactly how the broken auth-once scenarios went unnoticed for weeks.
  const woId = firstId(wo.listText, 'Request');
  check(null, { 'Work order grid returned rows': () => woId !== null });
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} workOrderRow=${woId}`);
  sleep(randomIntBetween(1, 3));

  // Step 5: back to My page.
  openMyPage('5. Navigation -> My page module');
  sleep(randomIntBetween(1, 3));

  // Step 6: Logout, then the gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario1kommune;

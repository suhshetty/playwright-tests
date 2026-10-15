/*
 * SCENARIO 1 — CORE tenant (https://kommunedevcore.mainmanager.is)
 *   Login -> My page (Dashboard) -> "Unfinished work orders on my organisation"
 *   widget -> Work order grid -> back to My page -> Logout
 *
 * Same manual test steps as scenario1-mypage-kommune.js, against the ASP.NET Core
 * build. The step sequence is identical; only the HTTP layer differs, and that lives
 * in lib/mainmanager-core.js. See CORE-API-MAPPING.md.
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec.
 * (Auth-once is NOT usable: k6 clears the VU cookie jar between iterations, so from
 * iteration 2 the requests carry no session cookie and the server answers 200 with
 * empty data, silently. Proven on bygst 2026-08-26.)
 *
 *   1. Login                                              -> login()
 *   2. Select module My page                              -> openMyPage()
 *   3. Click "Unfinished work orders on my organisation"  -> selectSnapshotFromMyPage()
 *                                                            + openModule(WorkOrders)
 *   4. Go back - select module My page                    -> openMyPage()
 *   5. Logout                                             -> logout()
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON KOMMUNEDEVCORE 2026-09-03 — verified, not guessed
 * ---------------------------------------------------------------------------
 *   My page      GetMenuItemSteps -> 3x saveToggleValue -> InitMainLayout
 *                  { MenuItemKey:'MainSummary-2147483643', SummaryID:2147483643,
 *                    MenuItemID:0, MenuItemTypeID:2, ProcessTag:'MyPage',
 *                    ProcessStepTag:'MainSummary-2147483643' }        <- JSON
 *                -> BuildMyPage  MainSummaryID=2147483643&FilterValues=  <- FORM
 *                -> InitPortalAggregate x18, CONCURRENT                  <- FORM
 *                   PortalKey=Snapshot-4390&MainModuleID=883
 *                   &ExcludeLocation=false&Checksum=<server-issued>
 *   Widget       SelectSnapshotFromMyPage  SnapshotID=4270              <- FORM
 *                label "Unfinished work orders on my organisation" (290)
 *   Grid         InitMainLayout { MenuItemKey:'Request', MenuItemID:1143,
 *                  ProcessTag:'Helpdesk', ProcessStepTag:'Request' }
 *                -> DataPath Request$1$0
 *
 * ---------------------------------------------------------------------------
 * WHAT WAS WRONG WITH THE PREVIOUS VERSION OF THIS FILE (all fixed)
 * ---------------------------------------------------------------------------
 * 1. THE DASHBOARD WAS NEVER LOADED. openMyPage() stopped after InitMainLayout —
 *    no BuildMyPage, no widget calls. Step 2 measured a navigation, not a My Page
 *    load, and omitted the ~18-way concurrent fan-out that is the entire point of
 *    this scenario. On kommune at 250 VUs BuildMyPage succeeded only 4-8% of the
 *    time while login was still at 93-96%, so this is where the load actually bites.
 * 2. THE CHECKS WERE FAKE. openMyPage asserted `() => true` twice — they passed even
 *    if every request 500'd, so step 2 could not fail.
 * 3. WRONG GRID. MODULES.WorkOrders pointed at OperationAndMaintenance /
 *    WorkOrderDayPlanning / WorkOrder / 1150. Snapshot 4270 actually opens
 *    Helpdesk / Request / 1143 — a different screen.
 * 4. THE WIDGET CLICK NEVER HAPPENED. The file loaded the grid directly and its own
 *    comment admitted SelectSnapshotFromMyPage was missing; WIDGET_SNAPSHOT_ID was
 *    declared but never used, so the grid was not scoped to the snapshot.
 * 5. Missing the bygst fixes: 1s iteration delay, no BASE_URL guard, no assertion
 *    that the grid returned rows.
 *
 * Also carried over: InitPortalAggregate needs a server-issued Checksum. Omitting it
 * returns HTTP 500 — the same defect found in the WebForms library the same morning,
 * where it had silently failed every dashboard widget on every run.
 *
 *   # smoke — run first, expect 0 business_errors
 *   bash run.sh 1 -e VUS=1 -e DURATION=90s -e VERIFY=true
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, logout, openMyPage, openModule, selectSnapshotFromMyPage,
  MODULES, defaultOptions, handleSummary,
} from './lib/mainmanager-core.js';

// The core library resolves its target at import time from -e BASE_URL, then
// config-core.json, then config.json — and that last fallback points at BYGST.
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
        scenario1core: {
          executor: 'constant-vus', exec: 'scenario1core',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario1core: {
          executor: 'ramping-vus',
          exec: 'scenario1core',
          startVUs: 1,
          // 5m ramp + 5m soak = 10 minutes, matching every other scenario run.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

// Per-TENANT data (a user's saved snapshot). 4270 verified live on kommunedevcore.
const WIDGET_SNAPSHOT_ID = parseInt(__ENV.WIDGET_SNAPSHOT_ID || '4270', 10);
const WORKORDERS = MODULES.WorkOrders;

// Aligned to 10s across all scenarios so login rates stay comparable between tenants.
const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario1core() {
  // Step 1: LOGIN. The backoff is REQUIRED: a failed login ends the iteration in
  // ~0.3s and k6 immediately starts another, so without it each VU retries several
  // times a second and floods a struggling login endpoint into collapse.
  if (!login()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Step 2: My page. Loads the dashboard AND its ~18 concurrent widget calls.
  if (!openMyPage('2. Navigation -> My page (Dashboard)')) {
    logout();
    sleep(ITER_DELAY);
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Step 3: click the widget. Tell the server which snapshot was clicked FIRST —
  // otherwise the grid loads unscoped and is not the widget's data.
  selectSnapshotFromMyPage(WIDGET_SNAPSHOT_ID);
  const wo = openModule(WORKORDERS, `3. Widget (snapshot ${WIDGET_SNAPSHOT_ID}) -> Work order grid`,
    undefined, { keepList: true });

  // Assert the grid actually returned rows. Without this the step "passes" on an
  // empty grid — how the broken auth-once scenarios went unnoticed for weeks.
  const woId = firstId(wo.listText, 'Request');
  check(null, { 'Work order grid returned rows': () => woId !== null });
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} workOrderRow=${woId}`);
  sleep(randomIntBetween(1, 3));

  // Step 4: back to My page — a second full dashboard load.
  openMyPage('4. Navigation -> My page (Dashboard)');
  sleep(randomIntBetween(1, 3));

  // Step 5: Logout, then the gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario1core;

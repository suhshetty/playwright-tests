/*
 * SCENARIO 1 — Login -> open My Page module -> click "My page" tab -> Logout
 *
 * Uses the JOURNEY model (login + logout every iteration). That is REQUIRED here,
 * not just a style choice (validated live 2026-06-16):
 *
 *   The My Page dashboard (BuildMyPage) loads its widgets reliably right after a
 *   FRESH login (the two loads in one journey iteration both succeed). But in a
 *   long-lived AUTH-ONCE session it starts returning an EMPTY dashboard from the
 *   2nd iteration on. So the only way to repeatedly measure a real dashboard load
 *   is a fresh session per iteration. Auth-once-per-VU does NOT work for this
 *   scenario (it would measure empty dashboards after the first iteration).
 *
 *   Auth-once (ensureSession in lib) IS the right model for GRID-based scenarios
 *   (2-6), where loads are repeatable (fresh UniqueString per load). See _scenario-template.js.
 *
 * Re-point at any customer via -e BASE_URL. Credentials from data/users.csv or env.
 *   k6 run scenario1-login-mypage-logout.js
 *   k6 run -e VUS=1 -e DURATION=30s scenario1-login-mypage-logout.js   # smoke
 */

import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { login, openMyPage, openMyPageTab, openModule, logout, MODULES, WIDGET_SNAPSHOT_ID, widgetTrend, defaultOptions, handleSummary } from './lib/mainmanager.js';

export const options = defaultOptions();
export { handleSummary };   // auto-writes summary.html + summary.json at end of run

export function scenario1() {
  if (!login()) return;                          // Step 1: login (fresh session => dashboard loads with widgets)
  sleep(randomIntBetween(1, 3));

  openMyPage('2. Navigation -> My Page module'); // Step 2: nav menu (client-side) -> select My Page
  sleep(randomIntBetween(1, 3));

  openMyPageTab('3. My page tab');               // Step 3: dashboard widgets
  sleep(randomIntBetween(1, 3));

  // Step 4: click the "Unfinished work orders on my organisation" widget ->
  // SelectSnapshotFromMyPage + load the Work order grid (captured live 2026-06-17).
  openModule(MODULES.WorkOrders, '4. Unfinished WO widget -> Work order grid', widgetTrend, { snapshotId: WIDGET_SNAPSHOT_ID });
  sleep(randomIntBetween(1, 3));

  openMyPage('5. Navigation -> My Page module'); // Step 5: nav menu -> back to My Page
  sleep(randomIntBetween(1, 3));

  logout();                                      // Step 6
  sleep(1);
}

export default scenario1;

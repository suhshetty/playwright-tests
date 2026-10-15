/*
 * SCENARIO TEMPLATE — copy to scenarioN-<name>.js and fill in the flow.
 *
 * All the heavy lifting (login, navigation, logout, customer re-pointing via
 * -e BASE_URL) lives in lib/mainmanager.js. Here you only describe the unique flow.
 *
 * Pick ONE of the two models:
 *
 *  A) JOURNEY (login + logout every iteration). REQUIRED for the My Page dashboard,
 *     which only loads widgets in a fresh session. Use scenarioN below.
 *
 *  B) AUTH-ONCE SESSION (login once per VU, then loop). Use for GRID modules, whose
 *     loads ARE repeatable. Avoids re-paying the heavy login each iteration. Use
 *     scenarioNSession below.
 */

import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { login, ensureSession, openMyPage, openMyPageTab, openModule, discoverModule, logout, MODULES, defaultOptions } from './lib/mainmanager.js';

export const options = defaultOptions();

// A) JOURNEY model — use for dashboard flows (login per iteration).
export function scenarioN() {
  if (!login()) return;
  sleep(randomIntBetween(1, 3));

  // openMyPage('2. Open My Page module');
  // openMyPageTab('3. My page tab');
  sleep(randomIntBetween(1, 3));

  logout();
  sleep(1);
}

// B) AUTH-ONCE SESSION model — use for repeatable GRID flows (login once per VU).
export function scenarioNSession() {
  if (!ensureSession()) return;                 // login + landing, ONCE per VU

  // PORTABLE: resolve the grid's tenant ids from the live menu — no hardcoding.
  // discoverModule(process, step, data) matches by Key or English caption.
  //   const grid = discoverModule('OperationAndMaintenance', 'WorkOrders', 'WorkOrder');
  //   if (grid) openModule(grid, 'Work Orders');
  // Or use a pre-captured static descriptor: openModule(MODULES.Pictures, 'Pictures');
  sleep(randomIntBetween(1, 3));
}

export default scenarioN;

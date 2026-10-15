/*
 * SCENARIO 3 (CORE tenants) — Login -> Human resources -> Organisation overview
 *              -> Open Company -> Open Person -> Logout
 *
 * Manual test steps:
 *   1. Login                                                           -> login()
 *   2. Open Human resources -> Organisation overview                   -> openModule(HumanResources)
 *   3. Search tree for MM GROUP ApS -> Open company                   -> openRecordModal(Company)
 *   4. Search tree for Gro Ustad -> Open person                       -> openRecordModal(Person)
 *   5. Logout                                                          -> logout()
 *
 * JOURNEY model — login AND logout on every iteration. Tree navigation
 * loads the company/person organisation data on the right panel.
 *
 *   # smoke (always run this first)
 *   k6 run -e VUS=1 -e DURATION=90s -e DEBUG=true \
 *     -e BASE_URL=https://kommunedevcore.mainmanager.is \
 *     -e MM_USERNAME=suhsh -e MM_PASSWORD='<password>' \
 *     PerformanceTests/scenario3-humanresources-core.js
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, loadLandingModule, logout, openModule, openRecordModal,
  defaultOptions, handleSummary, recordModalTrend,
  MODULES,
} from '../lib/mainmanager-core.js';

// Load profile — two modes:
//   FLAT  -e VUS=N [-e DURATION=10m]  constant VUs; ignores the stages below.
//   RAMP  no -e VUS                   uses the stages below.
// -e DEBUG=true logs every failing/slow request.
const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario3core: {
          executor: 'constant-vus', exec: 'scenario3core',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario3core: {
          executor: 'ramping-vus',
          exec: 'scenario3core',
          startVUs: 1,
          // Gradual ramp: arriving at the target all at once distorts the login
          // measurement and can tip the environment into 503 load-shedding.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

// Test data: IDs for known companies and persons in the HR tree
// These can be overridden with -e environment variables
const COMPANY_ID = parseInt(__ENV.COMPANY_ID || '1', 10);  // MM GROUP ApS or default
const PERSON_ID = parseInt(__ENV.PERSON_ID || '1', 10);     // Gro Ustad or default

export function scenario3core() {
  // Step 1: LOGIN — every iteration. See JOURNEY model note at the top of this file.
  // The sleep on failure is REQUIRED: a failed login ends the iteration in ~200ms and
  // k6 immediately starts another, so without it a struggling login endpoint gets
  // retried several times per second per VU and the test floods it into collapse.
  if (!login()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  loadLandingModule();
  sleep(randomIntBetween(1, 3));

  // Step 2: Open Human resources module -> Organisation overview -> Build organisation trees
  const hrModule = openModule(MODULES.HumanResources, '2. Human resources -> Organisation overview', undefined, {});
  sleep(randomIntBetween(1, 3));

  if (!hrModule) {
    logout();
    return;
  }

  // Step 3: Search tree for MM GROUP ApS -> Open company record modal
  // In a real scenario, tree search would be implemented. For now, we open a known company ID.
  // This step models the behaviour of:
  //   - Open the tree panel on the left
  //   - Search for "MM GROUP ApS"
  //   - Right-click on result
  //   - Select "Open company"
  openRecordModal(MODULES.HumanResources, COMPANY_ID, '', '3. Open MM GROUP ApS (company)', recordModalTrend, { mainId: 0 });
  sleep(randomIntBetween(1, 3));

  // Step 4: Search tree for Gro Ustad -> Open person record modal
  // Similar to step 3, but for a person record:
  //   - Search for "Gro Ustad" in the tree
  //   - Select "Open person"
  openRecordModal(MODULES.Person, PERSON_ID, '', '4. Open Gro Ustad (person)', recordModalTrend, { mainId: 0 });
  sleep(randomIntBetween(1, 3));

  // Step 5: Logout — closes the journey, per the manual test spec.
  logout();
  sleep(1);
}

export default scenario3core;

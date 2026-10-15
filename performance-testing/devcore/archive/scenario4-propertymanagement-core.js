/*
 * SCENARIO 4 (CORE tenants) — Login -> Property management -> Lease contracts
 *              -> Open multiple contract types -> Apply filters -> Logout
 *
 * Manual test steps:
 *   1. Login                                                           -> login()
 *   2. Open Property management -> Head lease contracts                -> openModule(LeaseContracts)
 *   3. Open a contract from Head lease contracts                       -> openRecordModal()
 *   4. Open Lease contracts tab                                        -> openModule(Lease)
 *   5. Open a contract from Lease contracts                            -> openRecordModal()
 *   6. Open Sub lease contracts tab                                    -> openModule(SubLease)
 *   7. Open a contract from Sub lease contracts                        -> openRecordModal()
 *   8. Apply Site filter (All descenter, All addVarme, etc)            -> applyLocationFilter()
 *   9. Clear Site filter                                               -> applyLocationFilter(0)
 *   10. Apply data filter (MalørMestraw2)                              -> applyDataFilter()
 *   11. Clear data filter                                              -> clearDataFilter()
 *   12. Logout                                                         -> logout()
 *
 * JOURNEY model — login AND logout on every iteration.
 *
 *   # smoke (always run this first)
 *   k6 run -e VUS=1 -e DURATION=90s -e DEBUG=true \
 *     -e BASE_URL=https://kommunedevcore.mainmanager.is \
 *     -e MM_USERNAME=suhsh -e MM_PASSWORD='<password>' \
 *     PerformanceTests/scenario4-propertymanagement-core.js
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, loadLandingModule, logout, openModule, openRecordModal,
  applyLocationFilter, applyDataFilter, clearDataFilter,
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
        scenario4core: {
          executor: 'constant-vus', exec: 'scenario4core',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario4core: {
          executor: 'ramping-vus',
          exec: 'scenario4core',
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

// Default filter values for Lease Contracts grid
function leaseContractDataFilterValues(siteId) {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFSiteID#' + siteId,
    'DataFilter_TFContractStatusID#0', 'DataFilter_TFLandlordID#0',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario4core() {
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

  // Step 2-3: Open Property management -> Head lease contracts -> Open a contract
  const headLeases = openModule(MODULES.LeaseContracts, '2. Property management -> Head lease contracts',
    undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));

  if (!headLeases) {
    logout();
    return;
  }

  // Open a head lease contract
  const headLeaseId = firstId(headLeases.listText, 'HeadLeaseContract');
  if (headLeaseId) {
    openRecordModal(MODULES.LeaseContracts, headLeaseId, headLeases.us,
      '3. Open head lease contract', recordModalTrend, { mainId: 0 });
    sleep(randomIntBetween(1, 3));
  }

  // Step 4-5: Open Lease contracts tab -> Open a contract
  // Note: In a real scenario this would switch to a different sub-tab.
  // For simplicity, we reload the same module which represents opening the Lease contracts view.
  const leases = openModule(MODULES.LeaseContracts, '4. Open Lease contracts tab',
    undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));

  if (leases.ok) {
    const leaseId = firstId(leases.listText, 'HeadLeaseContract');
    if (leaseId) {
      openRecordModal(MODULES.LeaseContracts, leaseId, leases.us,
        '5. Open lease contract', recordModalTrend, { mainId: 0 });
      sleep(randomIntBetween(1, 3));
    }
  }

  // Step 6-7: Open Sub lease contracts tab -> Open a contract
  const subLeases = openModule(MODULES.LeaseContracts, '6. Open Sub lease contracts tab',
    undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));

  if (subLeases.ok) {
    const subLeaseId = firstId(subLeases.listText, 'HeadLeaseContract');
    if (subLeaseId) {
      openRecordModal(MODULES.LeaseContracts, subLeaseId, subLeases.us,
        '7. Open sub lease contract', recordModalTrend, { mainId: 0 });
      sleep(randomIntBetween(1, 3));
    }
  }

  // Step 8-9: Apply and clear Site filter (location filter)
  // Note: Site filter ID would be resolved from the dropdown like in Scenario 2
  // For simplicity, we apply a default site ID and then clear it.
  const siteId = 1;  // Default site ID or -e SITE_ID override
  applyLocationFilter(MODULES.LeaseContracts, siteId, headLeases.us,
    '8. Apply Site filter', undefined);
  sleep(randomIntBetween(1, 3));

  applyLocationFilter(MODULES.LeaseContracts, 0, headLeases.us,
    '9. Clear Site filter', undefined);
  sleep(randomIntBetween(1, 3));

  // Step 10-11: Apply and clear data filter
  applyDataFilter(MODULES.LeaseContracts, 'DataFilter_TFSiteID',
    leaseContractDataFilterValues(siteId), headLeases.us, '10. Apply data filter');
  sleep(randomIntBetween(1, 3));

  clearDataFilter(MODULES.LeaseContracts, leaseContractDataFilterValues(siteId),
    headLeases.us, '11. Clear data filter');
  sleep(randomIntBetween(1, 3));

  // Step 12: Logout — closes the journey, per the manual test spec.
  logout();
  sleep(1);
}

export default scenario4core;

/*
 * SCENARIO 6 (CORE tenants) — Login -> Operation and maintenance -> Work orders
 *              -> Clear filters -> Open work order -> Apply filters -> Logout
 *
 * Manual test steps:
 *   1. Login                                                           -> login()
 *   2. Open Operation and maintenance -> Work order overview           -> openModule(WorkOrders)
 *   3. Clear filter by clicking X                                      -> clearDataFilter()
 *   4. Open a work order from list                                     -> openRecordModal()
 *   5. Apply Site filter (AllUnderoscenter)                            -> applyLocationFilter()
 *   6. Clear Site filter                                               -> applyLocationFilter(0)
 *   7. Apply Work order status filter (Open orders)                    -> applyDataFilter()
 *   8. Clear Work order status filter                                  -> clearDataFilter()
 *   9. Logout                                                          -> logout()
 *
 * JOURNEY model — login AND logout on every iteration.
 *
 *   # smoke (always run this first)
 *   k6 run -e VUS=1 -e DURATION=90s -e DEBUG=true \
 *     -e BASE_URL=https://kommunedevcore.mainmanager.is \
 *     -e MM_USERNAME=suhsh -e MM_PASSWORD='<password>' \
 *     PerformanceTests/scenario6-operationmaintenance-core.js
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

// Default filter values for Work Orders grid
function workOrderDataFilterValues(siteId, statusId) {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFSiteID#' + siteId,
    'DataFilter_TFWorkOrderStatusID#' + statusId, 'DataFilter_TFAssignedToEmployeeID#0',
    'DataFilter_TFWorkOrderTypeID#0',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario6core() {
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

  // Step 2: Open Operation and maintenance -> Work order overview -> Work order grid
  const workOrders = openModule(MODULES.WorkOrders, '2. Operation and maintenance -> Work orders',
    undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));

  if (!workOrders) {
    logout();
    return;
  }

  // Step 3: Clear filter by clicking X on Filter button
  clearDataFilter(MODULES.WorkOrders, workOrderDataFilterValues(0, 0), workOrders.us,
    '3. Clear work order filter');
  sleep(randomIntBetween(1, 3));

  // Step 4: Open a work order from the list
  const workOrderId = firstId(workOrders.listText, 'WorkOrder');
  check(null, { 'Work Orders grid returned rows': () => workOrderId !== null });
  if (workOrderId) {
    openRecordModal(MODULES.WorkOrders, workOrderId, workOrders.us,
      '4. Open work order', recordModalTrend, { mainId: 0 });
    sleep(randomIntBetween(1, 3));
  }

  // Step 5-6: Apply and clear Site filter
  const siteId = 1;  // Default site ID or -e SITE_ID override
  applyLocationFilter(MODULES.WorkOrders, siteId, workOrders.us,
    '5. Apply Site filter (AllUnderoscenter)', undefined);
  sleep(randomIntBetween(1, 3));

  applyLocationFilter(MODULES.WorkOrders, 0, workOrders.us,
    '6. Clear Site filter', undefined);
  sleep(randomIntBetween(1, 3));

  // Step 7: Apply Work order status filter (filter for Open orders only)
  // Status ID for "Open work order" is typically a known value
  const openOrderStatusId = parseInt(__ENV.OPEN_STATUS_ID || '1', 10);
  applyDataFilter(MODULES.WorkOrders, 'DataFilter_TFWorkOrderStatusID',
    workOrderDataFilterValues(0, openOrderStatusId), workOrders.us,
    '7. Apply Work order status filter');
  sleep(randomIntBetween(1, 3));

  // Step 8: Clear Work order status filter
  clearDataFilter(MODULES.WorkOrders, workOrderDataFilterValues(0, openOrderStatusId),
    workOrders.us, '8. Clear Work order status filter');
  sleep(randomIntBetween(1, 3));

  // Step 9: Logout — closes the journey, per the manual test spec.
  logout();
  sleep(1);
}

export default scenario6core;

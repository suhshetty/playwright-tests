/*
 * SCENARIO 5 (CORE tenants) — Login -> Helpdesk -> Incidents overview -> Open incident
 *              -> Close incident form -> Logout
 *
 * Manual test steps:
 *   1. Login                                                           -> login()
 *   2. Open Helpdesk module -> Incidents overview -> All incidents     -> openModule(MODULES.Incidents)
 *   3. Clear filters (click X on Filter button)                       -> clearDataFilter()
 *   4. Open an incident from the list -> Close form                   -> openRecordModal()
 *   5. Logout                                                          -> logout()
 *
 * JOURNEY model — login AND logout on every iteration.
 *
 *   # smoke (always run this first)
 *   k6 run -e VUS=1 -e DURATION=90s -e DEBUG=true \
 *     -e BASE_URL=https://kommunedevcore.mainmanager.is \
 *     -e MM_USERNAME=suhsh -e MM_PASSWORD='<password>' \
 *     PerformanceTests/scenario5-helpdesk-core.js
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, loadLandingModule, logout, openModule, openRecordModal,
  clearDataFilter, defaultOptions, handleSummary,
  MODULES, recordModalTrend,
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
        scenario5core: {
          executor: 'constant-vus', exec: 'scenario5core',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario5core: {
          executor: 'ramping-vus',
          exec: 'scenario5core',
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

// Default filter values for Incidents grid (captured from real browser)
function incidentDataFilterValues() {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFIncidentGroupID#0', 'DataFilter_TFIncidentTypeID#0',
    'DataFilter_TFIncidentStatusID#0', 'DataFilter_TFIncidentPriorityID#0',
    'DataFilter_TFAssignedToEmployeeID#0', 'DataFilter_TFCreatedByID#0',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario5core() {
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

  // Step 2: Open Helpdesk module -> Incidents overview -> All incidents
  const incidents = openModule(MODULES.Incidents, '2. Helpdesk -> Incidents overview', undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));

  if (!incidents) {
    logout();
    return;
  }

  // Step 3: Clear filters (click X on Filter button)
  // The Incidents grid has a data filter that needs to be cleared
  clearDataFilter(MODULES.Incidents, incidentDataFilterValues(), incidents.us, '3. Clear incident filters');
  sleep(randomIntBetween(1, 3));

  // Step 4: Open an incident from the list -> popup -> Close (client-side)
  const incidentId = firstId(incidents.listText, 'Incident');
  check(null, { 'Incidents grid returned rows': () => incidentId !== null });
  if (incidents.ok && incidentId) {
    openRecordModal(MODULES.Incidents, incidentId, incidents.us, '4. Open incident -> popup', recordModalTrend,
      { mainId: 0 });
    sleep(randomIntBetween(1, 3));
  }

  // Step 5: Logout — closes the journey, per the manual test spec.
  logout();
  sleep(1);
}

export default scenario5core;

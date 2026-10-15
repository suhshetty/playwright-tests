/*
 * SCENARIO 5 — Login -> Helpdesk -> Incidents overview -> Incidents grid ->
 *              open an incident (modal popup) -> Close Window -> Logout
 *
 * AUTH-ONCE model (login once per VU via ensureSession; session reused across
 * iterations — login-per-iteration at high VU floods the login front door). No
 * per-iteration logout. Reverse-engineered live on
 * bygst.mainmanager.dk (2026-06-17). Mapping of the manual steps to HTTP:
 *   1. Login (once per VU)                              -> ensureSession()
 *   2. Navigation -> "Helpdesk / service management"  \
 *   3. "Incidents overview" tab                         } one grid load:
 *   4. "Incidents" sub-tab                             /  openModule(MODULES.Incidents)
 *      (GetMenuItemSteps -> GetMenuItemProcessItems -> InitMainLayout ->
 *       IsShortcut -> BuildLayout -> GetMMListHeaders -> GetMMList)
 *   5. Open an incident -> popup                        -> openRecordModal()  (LoadMMModalControl)
 *   6. Close Window                                     -> CLIENT-SIDE, no HTTP (modeled as think time)
 *   7. (no per-iteration logout — session reused; see Step 1 / ensureSession)
 *
 * The incident to open is picked from the LIVE grid response (no hardcoded id),
 * so it adapts to whatever data the target tenant has.
 *
 *   # smoke (always first) — baseUrl/username/password come from config.json
 *   k6 run -e VUS=1 -e DURATION=60s scenario5-helpdesk-incident.js
 *   # (per-run override: -e MM_USERNAME=Suhas -e MM_PASSWORD=<pwd>  — NOT USERNAME on Windows)
 *
 * Per-step metrics: step_navigate_duration (grid load), step_open_record_duration (modal).
 * Re-point at any WebForms tenant via config.json baseUrl. The Incidents
 * descriptor (MODULES.Incidents) is bygst-captured; for another tenant swap it for
 * discoverModule('Helpdesk', 'Incidents', 'Incident') to resolve ids from the live menu.
 */

import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { ensureSession, openModule, openRecordModal, MODULES, recordModalTrend, defaultOptions, handleSummary } from './lib/mainmanager.js';

// Load profile (matches Scenario 2 & 3 so the three are comparable):
//   * SMOKE — -e VUS=N (e.g. -e VUS=1 -e DURATION=60s) for a quick constant-VU run.
//   * RAMP  — no VUS: STEPPED ramp 1 -> 250 VUs over 10m (30s ramp-in + 1m30s hold per
//             step at 50/100/150/200/250). Auth-once + grid-based, so login is paid once
//             per VU. discardResponseBodies / thresholds inherited from defaultOptions().
const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario5: {
          executor: 'constant-vus', exec: 'scenario5',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario5: {
          executor: 'ramping-vus',
          exec: 'scenario5',
          startVUs: 1,
          stages: [
            { duration: '30s', target: 50 },  { duration: '1m30s', target: 50 },   // step 1
            { duration: '30s', target: 100 }, { duration: '1m30s', target: 100 },  // step 2
            { duration: '30s', target: 150 }, { duration: '1m30s', target: 150 },  // step 3
            { duration: '30s', target: 200 }, { duration: '1m30s', target: 200 },  // step 4
            { duration: '30s', target: 250 }, { duration: '1m30s', target: 250 },  // step 5
          ],
          gracefulRampDown: '30s',
        },
      },
    };
export { handleSummary };   // auto-writes summary.html + summary.json at end of run

export function scenario5() {
  if (!ensureSession()) return;                  // Step 1: AUTH-ONCE per VU (login once, reuse session)
  sleep(randomIntBetween(1, 3));

  // Steps 2-4: Navigation -> Helpdesk -> "Incidents overview" tab -> "Incidents" sub-tab.
  // keepList keeps the grid response so we can open a real incident from it.
  const grid = openModule(MODULES.Incidents,
    '2. Helpdesk -> Incidents overview -> Incidents', undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));

  // Step 5: open an incident from the grid -> modal popup. Pick the first incident
  // id present in the grid response (datapath form Incident$1$<id>).
  const m = (grid.listText || '').match(/Incident\$1\$(\d+)/);
  if (grid.ok && m) {
    openRecordModal(MODULES.Incidents, m[1], grid.us, '5. Open incident -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
    // Step 6: "Close Window" — client-side only (no HTTP), so it's just think time.
  }

  // No per-iteration logout (auth-once): logout would kill the VU's session and break
  // the next iteration, and login-per-iteration at high VU floods the login front door.
  sleep(1);
}

export default scenario5;

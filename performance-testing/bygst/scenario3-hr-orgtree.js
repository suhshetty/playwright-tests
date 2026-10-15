/*
 * SCENARIO 3 — Login -> Human resources -> Organisations overview ->
 *              "Build organisation trees" -> open a Company (popup) -> close ->
 *              open a Person (popup) -> close -> Logout
 *
 * AUTH-ONCE model (login once per VU via ensureSession; session reused across
 * iterations — same fix as Scenario 2). The org-tree reloads fine in a long-lived
 * session, and logging in every iteration at high VU floods the login front door
 * (the old journey model collapsed at ~250 VUs: login page failing ~98%). No
 * per-iteration logout. Reverse-engineered live on bygst.mainmanager.dk (2026-06-17).
 * Mapping of the manual steps to HTTP:
 *   1. Login (once per VU)                                   -> ensureSession()
 *   2. Nav -> "Human resources"                            \
 *   3. "Organisations overview" tab                          } one dual-tree load:
 *   4. "Build organisation trees" sub-tab                   /  openTree(MODULES.OrganisationTree)
 *      (GetMenuItemSteps -> GetMenuItemProcessItems -> InitMainLayout -> IsShortcut
 *       -> BuildLayout -> Graphical/Tree x2: left = org/companies, right = persons)
 *   5. Right-click an org node -> "Open Company" -> popup   -> openRecordModal(COMPANY)  (LoadMMModalControl)
 *   6. Close the Company popup                              -> CLIENT-SIDE, no HTTP (verified) -> think time
 *   7. Right-click a person node -> "Open Person" -> popup  -> openRecordModal(PERSON)
 *   8. Close the Person popup                               -> CLIENT-SIDE, no HTTP -> think time
 *   9. (no per-iteration logout — session reused; see Step 1 / ensureSession)
 *
 * The Company/Person to open are picked LIVE from the tree responses — each tree
 * node carries its record id in a_attr.serverid, so we read the first one
 * (/"serverid":"(\d+)"/). No hardcoded record, so it works against current data.
 *
 *   # smoke (always first) — baseUrl/username/password come from config.json
 *   k6 run -e VUS=1 -e DURATION=60s scenario3-hr-orgtree.js
 *   # (per-run override: -e MM_USERNAME=Suhas -e MM_PASSWORD=<pwd>  — NOT USERNAME on Windows)
 *
 * Per-step metrics: step_tree_load_duration (the dual-tree view),
 * step_open_record_duration (each Company/Person popup).
 * Re-point at any WebForms tenant via config.json baseUrl; the
 * OrganisationTree ids are bygst-captured (MODULES.OrganisationTree).
 */

import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { ensureSession, openTree, openRecordModal, MODULES, treeTrend, recordModalTrend, defaultOptions, handleSummary } from './lib/mainmanager.js';

// Load profile. Matches Scenario 2 so the two are comparable:
//   * SMOKE — -e VUS=N (e.g. -e VUS=1 -e DURATION=60s) for a quick constant-VU run.
//   * RAMP  — no VUS: STEPPED ramp 1 -> 250 VUs over 10m (30s ramp-in + 1m30s hold per
//             step at 50/100/150/200/250). NOTE: Scenario 3 is a JOURNEY model (full
//             login every iteration), so at 250 VUs this also stresses the login/auth
//             path with up to ~250 concurrent logins — heavier on auth than Scenario 2's
//             auth-once model. discardResponseBodies / thresholds inherited from defaultOptions().
const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario3: {
          executor: 'constant-vus', exec: 'scenario3',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario3: {
          executor: 'ramping-vus',
          exec: 'scenario3',
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

// Record types opened from the trees (LoadMMModalControl only needs the tag + id).
const COMPANY = { dataTag: 'Company', dataCaption: 'Company' };
const PERSON  = { dataTag: 'Person',  dataCaption: 'Person' };

// Each tree node carries its record id in a_attr.serverid — grab the first one.
function firstServerId(treeText) {
  const m = (treeText || '').match(/"serverid":"(\d+)"/);
  return m ? m[1] : null;
}

export function scenario3() {
  // Step 1: AUTH-ONCE per VU (same fix as Scenario 2). ensureSession() logs in + loads
  // the landing module on the FIRST iteration of each VU, then returns true on every
  // later iteration WITHOUT re-authenticating. This measures HR org-tree *browsing*
  // capacity instead of flooding the login endpoint (login per iteration at 250 VUs
  // overwhelms the login front door — that was the journey-model failure mode).
  if (!ensureSession()) return;
  sleep(randomIntBetween(1, 3));

  // Steps 2-4: Nav -> Human resources -> Organisations overview -> Build organisation trees.
  // Loads both trees (left = orgs/companies, right = persons) and keeps them so we
  // can open a real Company and Person from the live data. The tree reloads fine in a
  // long-lived session (fresh UniqueString each load — not the dashboard exception).
  const tree = openTree(MODULES.OrganisationTree,
    '2. HR -> Organisations overview -> Build organisation trees', treeTrend);
  sleep(randomIntBetween(1, 3));
  if (!tree.ok) return;   // session stays alive for the next iteration (auth-once)

  // Step 5: open a Company from the LEFT (organisation) tree -> modal popup.
  const companyId = firstServerId(tree.leftText);
  if (companyId) {
    openRecordModal(COMPANY, companyId, null, '5. Open company -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
    // Step 6: Close the Company popup — client-side (no HTTP), so just think time.
  }

  // Step 7: open a Person from the RIGHT (persons) tree -> modal popup.
  const personId = firstServerId(tree.rightText);
  if (personId) {
    openRecordModal(PERSON, personId, null, '7. Open person -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
    // Step 8: Close the Person popup — client-side (no HTTP), so just think time.
  }

  // NOTE: no per-iteration logout (auth-once). Logging out would kill the VU's session
  // and break the next iteration — and a logout-per-iteration also hammers the auth path.
  // Just pace before the VU loops.
  sleep(1);
}

export default scenario3;

/*
 * SCENARIO 3 — CORE tenant (https://kommunedevcore.mainmanager.is)
 *   Login -> Human resources -> Organisation overview -> Build organisation trees
 *   -> search LEFT tree -> right-click a company -> Open company -> close
 *   -> search RIGHT tree -> right-click a person  -> Open person  -> close
 *   -> Logout
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec.
 *
 *   1. Login                                              -> login()
 *   2. HR -> Organisation overview -> Build org trees      -> openTree()
 *   3. Search LEFT tree for <company>                      -> CLIENT-SIDE, no HTTP
 *   4. Right-click the node                                -> populateTreeActionMenu()
 *   5. "Open company" -> popup                             -> openRecordModal(Company)
 *   6. Close the popup                                     -> client-side -> think time
 *   7. Search RIGHT tree for <person>                      -> CLIENT-SIDE, no HTTP
 *   8. Right-click the node                                -> populateTreeActionMenu()
 *   9. "Open person" -> popup                              -> openRecordModal(Person)
 *  10. Close the popup                                     -> client-side -> think time
 *  11. Logout                                              -> logout()
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON KOMMUNEDEVCORE 2026-09-07 — verified, not guessed
 * ---------------------------------------------------------------------------
 *   Tree view   subTabClicked('OrganisationTree', 0, 2926, 1, 'Organisation',
 *                             'HumanResources')
 *               InitMainLayout { MenuItemKey:'OrganisationTree', MenuItemID:2926,
 *                 MenuItemTypeID:1, ProcessTag:'HumanResources',
 *                 ProcessStepTag:'Organisation' }
 *               GET /mmv2/restapi/Graphical/Tree
 *                   ?parent=%23&datapath=OrganisationTree$1$0&uniquestring=<us>
 *                   &child=false&treeid=MMLeftTree-OrganisationTree     (465 nodes)
 *                   &child=true &treeid=MMRightTree-BuildPersonTree     (768 nodes)
 *   Right-click GET /api/MMLayoutReadOnly/PopulateTreeActionMenu
 *                   ?sDataTag=Organisation&lDataID=50421
 *   Open company POST /api/MMLayout/LoadMMModalControl
 *                   { Tag:'Company', DataPath:'Company$1$50421', Id:'50421',
 *                     UniqueString:<from the action menu>, ContentType:'7',
 *                     DataText:'Open company', ... }
 *                + GetChildCount, 8 child keys
 *   Open person  same shape, Tag:'Person', 14 child keys
 *
 * THE TREE SEARCH FIRES NO HTTP. Typing in either tree's search box filters the
 * already-loaded jstree client-side — verified: zero network requests. Both trees are
 * fetched in FULL up front (~330 KB each), so the search step costs the server nothing
 * and the tree load is where all the weight is. Modelled here as think time.
 *
 * ---------------------------------------------------------------------------
 * LEARNINGS FROM SCENARIOS 1 AND 2, ALL APPLIED HERE
 * ---------------------------------------------------------------------------
 * 1. NO auth-once. The existing scenario3-hr-orgtree.js uses ensureSession(), which is
 *    broken: k6 clears the VU cookie jar between iterations, so from iteration 2 every
 *    request goes out with NO session cookie and the server answers 200 with empty
 *    data — silently. That scenario has been measuring nothing since its 2nd iteration.
 * 2. LOGIN-FAILURE BACKOFF. A failed login ends the iteration in ~0.3s; without a pause
 *    k6 restarts immediately and each VU retries several times a second, flooding the
 *    login endpoint. 20-40s backoff, as in scenarios 1 and 2.
 * 3. ITERATION DELAY 10s, matching every other scenario so login rates compare.
 * 4. SERVER-ISSUED TOKENS, never invented. Three of them here: the layout UniqueString
 *    from InitMainLayout, and a DIFFERENT UniqueString per record from
 *    PopulateTreeActionMenu. Inventing these caused 403s on kommune's Buildings grid
 *    and HTTP 500s on the My Page widgets.
 * 5. ASSERT ON CONTENT, not status. openTree checks the trees actually returned nodes;
 *    a 200 with an empty tree is exactly what the broken auth-once model produced.
 * 6. BASE_URL GUARD — the library falls back to config.json, which targets BYGST.
 * 7. RECORDS PICKED LIVE from the tree response (a_attr.serverid), so no hardcoded ids.
 *
 *   # smoke — run first, expect 0 business_errors
 *   bash run.sh 3 -e VUS=1 -e DURATION=90s -e VERIFY=true
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, logout, openTree, populateTreeActionMenu, openRecordModal,
  MODULES, treeTrend, recordModalTrend, defaultOptions, handleSummary,
} from './lib/mainmanager-core.js';

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
          // 5m ramp + 5m soak = 10 minutes, matching scenarios 1 and 2.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

const ORGTREE = MODULES.OrganisationTree;
const COMPANY = MODULES.CompanyRecord;
const PERSON  = MODULES.PersonRecord;

const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// The manual spec searches for specific names. The search is client-side, so it costs
// nothing server-side — but we still resolve the SAME record the tester would open, by
// finding that name in the tree payload. Falls back to the first node of the right type
// if the name is absent, so the scenario keeps working against changing data.
const COMPANY_NAME = __ENV.COMPANY_NAME || 'MM GROUP ApS';
const PERSON_NAME  = __ENV.PERSON_NAME  || 'Gro Ustad';

// Find a node by display name and return its record id.
//
// Anchor on the NAME ANYWHERE in the payload rather than on `"text":"<name>`: the two
// trees format text differently. Companies come through plain —
//   {"text":"MM GROUP ApS", ... "a_attr":{... "serverid":"50421" ...}}
// but persons are wrapped in markup and suffixed with a count —
//   {"text":"<b>Gro Ustad (1)</b>", ...}
// so a prefix match silently misses every person and the caller falls back to node 1.
// Note li_attr also carries a "serverid", always empty — the real id is in a_attr, so
// the regex must require digits.
function serverIdByName(treeText, name) {
  if (!treeText) return null;
  const i = treeText.indexOf(name);
  if (i < 0) return null;
  const m = treeText.slice(i, i + 1500).match(/"a_attr":\{[^}]*?"serverid":"(\d+)"/);
  return m ? m[1] : null;
}

function firstServerId(treeText) {
  const m = (treeText || '').match(/"a_attr":\{[^}]*?"serverid":"(\d+)"/);
  return m ? m[1] : null;
}

export function scenario3core() {
  // Step 1: LOGIN. Backoff on failure is REQUIRED — see learning 2 in the header.
  if (!login()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Steps 2: HR -> Organisation overview -> Build organisation trees.
  // One layout, two full trees. This is the heavy part of the scenario.
  const tree = openTree(ORGTREE, '2. HR -> Organisation overview -> Build org trees', treeTrend);
  sleep(randomIntBetween(1, 3));
  if (!tree.ok) { logout(); sleep(ITER_DELAY); return; }

  // Step 3: search the LEFT tree — client-side, no HTTP. Think time only.
  const companyId = serverIdByName(tree.leftText, COMPANY_NAME) || firstServerId(tree.leftText);
  check(null, { [`left tree contains '${COMPANY_NAME}'`]: () => serverIdByName(tree.leftText, COMPANY_NAME) !== null });
  sleep(randomIntBetween(1, 3));

  // Steps 4-6: right-click -> Open company -> close.
  if (companyId) {
    const us = populateTreeActionMenu(COMPANY.nodeTag, companyId, 'company');
    if (us) {
      openRecordModal(COMPANY, companyId, us, '5. Open company -> popup', recordModalTrend);
    }
    if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} companyId=${companyId} us=${us ? 'ok' : 'MISSING'}`);
    sleep(randomIntBetween(1, 3));   // close is client-side
  }

  // Step 7: search the RIGHT tree — client-side, no HTTP.
  const personId = serverIdByName(tree.rightText, PERSON_NAME) || firstServerId(tree.rightText);
  check(null, { [`right tree contains '${PERSON_NAME}'`]: () => serverIdByName(tree.rightText, PERSON_NAME) !== null });
  sleep(randomIntBetween(1, 3));

  // Steps 8-10: right-click -> Open person -> close.
  if (personId) {
    const us = populateTreeActionMenu(PERSON.nodeTag, personId, 'person');
    if (us) {
      openRecordModal(PERSON, personId, us, '9. Open person -> popup', recordModalTrend);
    }
    if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} personId=${personId} us=${us ? 'ok' : 'MISSING'}`);
    sleep(randomIntBetween(1, 3));
  }

  // Step 11: Logout, then the gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario3core;

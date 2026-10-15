/*
 * SCENARIO 3 (KOMMUNE) — https://kommune.mainmanager.is
 *   Login -> Human resources -> Organisation overview -> Build organisation trees
 *   -> LEFT tree:  search "MM GROUP ApS" -> right-click -> Open company  -> close
 *   -> RIGHT tree: search "Gro"          -> right-click -> Open person   -> close
 *   -> Logout
 *
 * kommune runs the SAME WebForms build as bygst, and its login is the SAME single
 * postback (lgnUserLogin$UserName / $Password — verified live 2026-09-15, no OTP), so
 * this uses lib/mainmanager.js unchanged. Credentials come from config-kommune.json.
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec.
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON kommune.mainmanager.is 2026-09-15 — measured, not copied
 * ---------------------------------------------------------------------------
 *   Sub-tab   subTabClicked('OrganisationTree', 0, 2926, 1, 'Organisation',
 *                            'HumanResources')
 *             -> menu item 2926. NOTE: bygst's MODULES.OrganisationTree is 686.
 *             kommune matches CORE (2926), NOT bygst. Reusing the shared descriptor
 *             would silently open the wrong module, so the descriptor is declared
 *             locally below.
 *   Trees     restapi/Graphical/Tree, two calls from one layout:
 *               left  treeid=MMLeftTree-OrganisationTree   child=false  (~363 KB)
 *               right treeid=MMRightTree-BuildPersonTree   child=true   (~1.1 MB)
 *   Search    THE TREE SEARCH COSTS ZERO HTTP REQUESTS. Verified by hooking every XHR
 *             while typing into the search box: the jstree filters data already
 *             downloaded. So steps 3 and 7 are think time, not requests. Inventing a
 *             search call here would fabricate load the real client never generates.
 *   Right-click ONE call: POST services/MMLayoutReadOnly.asmx/PopulateTreeActionMenu
 *               body {"sDataTag":"<a_attr.tag>","lDataID":<a_attr.serverid>}
 *               The response markup carries the SERVER-ISSUED UniqueString, which the
 *               modal must echo back — that is why the menu step cannot be skipped.
 *   Open      openMyModal('Company','Company$1$50421','50421','<UniqueString>',
 *                          'UseDefaultViewKey','','7','Open company', ...)
 *
 * TWO PARSING TRAPS, both hit and handled:
 *   a) The record id is in a_attr, NOT li_attr. Every node carries BOTH, and
 *      li_attr.serverid is null and appears FIRST:
 *        "text":"MM GROUP ApS","li_attr":{...,"serverid":null,...},
 *        "a_attr":{"tag":"Organisation","serverid":"50421","serverkey":"11547"}
 *      Taking "the next serverid after the name" yields null. nodeByName() below
 *      skips forward to the a_attr block.
 *   b) Person names are WRAPPED IN <b> AND SUFFIXED:
 *        "text":"<b>Gro Ustad (1)</b>"
 *      so an exact match on "Gro Ustad" finds nothing. nodeByName() matches the name
 *      ANYWHERE inside the text value. (Same trap as the CORE tenant.)
 *
 * SPEC READING — the spec lists "Open Human resources and go to tab Organisation
 * overview<Build organisation trees" twice, once per block. That is test-case
 * boilerplate, not a second navigation: a user who has just opened the company form
 * is still on the trees page and simply searches the other tree. So the module is
 * opened ONCE per iteration and both records come off that one load — matching
 * bygst's scenario 3 (one openTree per iteration) so the two compare directly.
 *
 * LEARNINGS CARRIED OVER:
 *   - JOURNEY model, not auth-once: k6 clears the VU cookie jar between iterations,
 *     so a held session sends unauthenticated requests that answer 200 with no data.
 *   - LOGIN-FAILURE BACKOFF (20-40s), or a failing login is retried several times a
 *     second per VU and floods the endpoint.
 *   - ITER_DELAY fixed 10s, matching bygst/CORE/Odense so login rates compare.
 *   - ASSERT ON CONTENT: both trees must return nodes AND both records must resolve.
 *     A 200 with an empty tree is the failure no status check catches.
 *   - BASE_URL guard: the shared library's last config fallback targets BYGST.
 *
 *   # smoke — ALWAYS run this first
 *   bash run.sh 3 -e VUS=1 -e DURATION=120s -e VERIFY=true
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import http from 'k6/http';
import {
  login, logout, openTree, openRecordModal,
  APP, ajaxJson, errorRate, navigateTrend, treeTrend, recordModalTrend,
  defaultOptions, handleSummary,
} from './lib/mainmanager.js';
import { group } from 'k6';

// Credentials come from config-kommune.json (gitignored), NOT config.json — that one
// targets bygst and is shared with the bygst scenarios. -e still wins for a one-off.
const KCONF = (function () {
  const candidates = ['./config-kommune.json', '../config-kommune.json', 'PerformanceTests/config-kommune.json'];
  for (let i = 0; i < candidates.length; i++) {
    try { const t = open(candidates[i]); if (t) return JSON.parse(t); } catch (e) { /* try next */ }
  }
  return {};
})();
const USERNAME = __ENV.MM_USERNAME || KCONF.username || '';
const PASSWORD = __ENV.MM_PASSWORD || KCONF.password || '';

if (!__ENV.BASE_URL) {
  throw new Error(
    'Pass -e BASE_URL=https://kommune.mainmanager.is (and -e MM_USERNAME / -e MM_PASSWORD).\n' +
    'Without it the shared library falls back to config.json, which targets bygst — ' +
    'you would load-test the wrong customer.');
}

const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario3kommune: {
          executor: 'constant-vus', exec: 'scenario3kommune',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario3kommune: {
          executor: 'ramping-vus',
          exec: 'scenario3kommune',
          startVUs: 1,
          // 5m ramp + 5m soak. For the 1-hour profile use 5m + 55m.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

// Declared LOCALLY, not taken from MODULES — kommune's id is 2926, bygst's is 686.
const ORGTREE = {
  processTag: 'HumanResources', processStepTag: 'Organisation',
  dataTag: 'OrganisationTree', dataCaption: 'Build organisation tree',
  dataPath: 'OrganisationTree$1$0',
  menuItemId: parseInt(__ENV.MENUITEM_ORGTREE || '2926', 10), menuItemType: 1,
  leftTreeId: 'MMLeftTree-OrganisationTree',
  rightTreeId: 'MMRightTree-BuildPersonTree',
};

// The record types opened from the trees. LoadMMModalControl needs the tag + caption.
const COMPANY = { dataTag: 'Company', dataCaption: 'Company', dataText: 'Open company' };
const PERSON  = { dataTag: 'Person',  dataCaption: 'Person',  dataText: 'Open person' };

const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// Spec values. Searched for by NAME in the tree we already downloaded, so a data
// refresh that changes ids does not break the run. -e overrides skip the lookup.
const COMPANY_NAME = __ENV.COMPANY_NAME || 'MM GROUP ApS';
const PERSON_NAME  = __ENV.PERSON_NAME  || 'Gro Ustad';
const COMPANY_ID   = __ENV.COMPANY_ID ? parseInt(__ENV.COMPANY_ID, 10) : null;   // verified live: 50421
const PERSON_ID    = __ENV.PERSON_ID  ? parseInt(__ENV.PERSON_ID, 10)  : null;   // verified live: 57685

// Find a tree node by (partial) display name and return its a_attr id + tag.
// See traps (a) and (b) in the header — this deliberately does NOT use li_attr and
// deliberately matches the name as a SUBSTRING of the text value.
function nodeByName(treeText, name) {
  const t = treeText || '';
  const needle = String(name).toLowerCase();
  let from = 0;
  for (;;) {
    const ti = t.toLowerCase().indexOf('"text":"', from);
    if (ti < 0) return null;
    const close = t.indexOf('"', ti + 8);
    const text = close > 0 ? t.slice(ti + 8, close) : '';
    if (text.toLowerCase().indexOf(needle) !== -1) {
      // Walk forward to THIS node's a_attr block and read serverid + tag from it.
      const ai = t.indexOf('"a_attr"', ti);
      if (ai > 0) {
        const blk = t.slice(ai, ai + 700);
        const id = /"serverid":"(\d+)"/.exec(blk);
        const tag = /"tag":"([^"]+)"/.exec(blk);
        if (id) return { id: id[1], tag: tag ? tag[1] : null, text: text };
      }
    }
    from = ti + 8;
  }
}

// Right-click on a tree node. ONE request; the response markup carries the
// server-issued UniqueString that LoadMMModalControl must echo back.
function populateTreeActionMenu(sDataTag, lDataID, groupName) {
  let us = '';
  group(groupName || `Right-click ${sDataTag} ${lDataID}`, function () {
    const t0 = Date.now();
    const res = http.post(`${APP}/services/MMLayoutReadOnly.asmx/PopulateTreeActionMenu`,
      JSON.stringify({ sDataTag: sDataTag, lDataID: parseInt(lDataID, 10) }),
      Object.assign({ responseType: 'text' }, ajaxJson()));

    // .asmx wraps the markup in {"d":"<html>"}; json('d') returns undefined (not a
    // throw) when the shape differs, so fall through to the raw body explicitly.
    let html = '';
    try { html = res.json('d') || ''; } catch (e) { html = ''; }
    if (!html && typeof res.body === 'string') html = res.body;
    // The markup may arrive with HTML-encoded quotes depending on the wrapper.
    html = html.replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

    const m = new RegExp("openMyModal\\('[^']*','[^']*','" + lDataID
      + "','([0-9a-fA-F]{16,40})'").exec(html);
    if (m) us = m[1];

    const ok = check(null, {
      [`action menu returned a UniqueString (${sDataTag})`]: () => us !== '',
    });
    errorRate.add(!ok);
    navigateTrend.add(Date.now() - t0);
  });
  return us;
}

export function scenario3kommune() {
  // Step 1: LOGIN every iteration. The backoff is REQUIRED — a failed login ends the
  // iteration in ~200ms and k6 starts another immediately.
  if (!login({ username: USERNAME, password: PASSWORD })) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Step 2: HR -> Organisation overview -> Build organisation trees.
  // Loads BOTH trees from one layout (~1.5 MB total), which is the bulk of this
  // scenario's cost.
  const tree = openTree(ORGTREE,
    '2. HR -> Organisation overview -> Build organisation trees', treeTrend);
  sleep(randomIntBetween(1, 3));
  if (!tree.ok) { logout(); sleep(ITER_DELAY); return; }

  // CONTENT assertion — a 200 with an empty tree passes every status check.
  const leftNodes  = (tree.leftText.match(/"a_attr"/g)  || []).length;
  const rightNodes = (tree.rightText.match(/"a_attr"/g) || []).length;
  check(null, {
    'left tree returned nodes':  () => leftNodes > 0,
    'right tree returned nodes': () => rightNodes > 0,
  });

  // Step 3: "In the tree to the left - search for MM GROUP ApS".
  // ZERO HTTP — the jstree filters already-downloaded data (verified). Think time only.
  const company = COMPANY_ID
    ? { id: String(COMPANY_ID), tag: 'Organisation', text: COMPANY_NAME }
    : nodeByName(tree.leftText, COMPANY_NAME);
  check(null, { [`found company '${COMPANY_NAME}' in left tree`]: () => !!company });
  sleep(randomIntBetween(1, 3));

  if (__ENV.VERIFY) {
    console.log(`[VERIFY] vu=${__VU} iter=${__ITER} leftNodes=${leftNodes} rightNodes=${rightNodes}`
      + ` company=${company ? company.id + '/' + company.tag + ' "' + company.text + '"' : 'NOT FOUND'}`);
  }

  // Steps 4-5: right-click -> Open company -> close (close is client-side -> think).
  if (company) {
    const us = populateTreeActionMenu(company.tag || 'Organisation', company.id,
      `4. Right-click '${COMPANY_NAME}' -> action menu`);
    if (us) {
      openRecordModal(COMPANY, company.id, us, '5. Open company -> popup', recordModalTrend);
      sleep(randomIntBetween(1, 3));
    }
  }

  // Step 7: "In the tree to the right - search for Gro". Again ZERO HTTP.
  // NOTE the node text is "<b>Gro Ustad (1)</b>" — matched as a substring, see trap (b).
  const person = PERSON_ID
    ? { id: String(PERSON_ID), tag: 'Person', text: PERSON_NAME }
    : nodeByName(tree.rightText, PERSON_NAME);
  check(null, { [`found person '${PERSON_NAME}' in right tree`]: () => !!person });
  sleep(randomIntBetween(1, 3));

  if (__ENV.VERIFY) {
    console.log(`[VERIFY] vu=${__VU} iter=${__ITER} person=`
      + (person ? person.id + '/' + person.tag + ' "' + person.text + '"' : 'NOT FOUND'));
  }

  // Steps 8-9: right-click -> Open person -> close.
  if (person) {
    const us = populateTreeActionMenu(person.tag || 'Person', person.id,
      `8. Right-click '${PERSON_NAME}' -> action menu`);
    if (us) {
      openRecordModal(PERSON, person.id, us, '9. Open person -> popup', recordModalTrend);
      sleep(randomIntBetween(1, 3));
    }
  }

  // Step 10: Logout, then the fixed gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario3kommune;

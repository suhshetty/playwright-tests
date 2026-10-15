/*
 * SCENARIO 4 (KOMMUNE) — https://kommune.mainmanager.is
 *   Login -> Property management -> Lease contracts overview
 *   -> Head lease contracts  (open a contract, close)
 *   -> Lease contracts       (open a contract, close)
 *   -> Sub lease contracts   (open a contract, close)
 *   -> Lease contract renegotiations (open a record)
 *   -> Head lease contracts: Site filter, then clear
 *   -> Head lease contracts: Filter button -> Payer filter, then clear (X)
 *   -> Logout
 *
 * kommune runs the SAME WebForms build as bygst and the SAME single-postback login
 * (lgnUserLogin$UserName / $Password, no OTP), so login / openModule /
 * openRecordModal / logout come from lib/mainmanager.js. Credentials from
 * config-kommune.json. The shared library is NOT modified.
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec.
 * The longest scenario in the kommune set: 5 grid loads, 4 record opens, 4 filters.
 *
 * ---------------------------------------------------------------------------
 * ONE STEP IS DELIBERATELY NOT IMPLEMENTED — READ THIS
 * ---------------------------------------------------------------------------
 * The spec's renegotiation block ends "Select Save (and close)". This script OPENS the
 * renegotiation record but does NOT save it. Deliberate, not an oversight:
 *
 *   1. It is a WRITE to a SINGLE SHARED ROW. Captured live on kommune:
 *      openMyModal('LeaseContractRenegotiation','LeaseContractRenegotiation$1$1','1',...)
 *      — record id 1, the same row for every VU (identical to CORE). At 250 VUs that
 *      measures row-lock contention, not application capacity, and the number would
 *      not mean what the report says it means.
 *   2. Replicating it faithfully means echoing ~20 form fields plus a server-issued
 *      Checksum parsed out of a large HTML blob. Getting that wrong writes corrupted
 *      data to a shared record, repeatedly, under load.
 *
 * The record OPEN is the bulk of the step's cost and IS included, so the load profile
 * is close. If the write must be measured, do it as a separate low-VU test against
 * per-VU records.
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON kommune.mainmanager.is 2026-09-15 — measured, not copied
 * ---------------------------------------------------------------------------
 *   Tab       "Lease contracts overview" (step tag LeaseContract) under
 *             ProcessTag 'PropertyManagement'.
 *   Sub-tabs  FOUR separate grids, each with its own id AND its own row count —
 *             which is the proof they are not the same grid loaded four times:
 *               Head lease contracts          5387  HeadLeaseContract   32 rows
 *               Lease contracts               1328  LeaseContract       90 rows
 *               Sub lease contracts           5394  SubLeaseContract    11 rows
 *               Lease contract renegotiations 5417  LeaseContractRenegotiation 5 rows
 *             All four ids are identical to CORE. bygst is NOT verified for this
 *             module, so nothing is taken from MODULES — descriptors are local.
 *   Site      RefreshMainManFilter, DataTag=HeadLeaseContract,
 *             ControlIDChanged=MainManFilter_TFGroundID, FOUR controls
 *             (RegionID / MainGroupID / GroundID / MainID).  32 -> 3 rows.
 *   Payer     RefreshDataFilter, DataTag=HeadLeaseContract, TemplateID:0,
 *             24 Value[] fields, ControlIDChanged=DataFilter_TFBenificiary2ID.
 *             32 -> 15 rows.
 *   Clear     EmptyDataFilter, same 24 fields, NO TemplateID (verified). -> 32 rows.
 *   Open      LoadMMModalControl + GetChildCount (6 keys on head lease)
 *             + GetDropZoneDocuments + BuildGraphicalModal + GetLayerPoints.
 *
 * FOUR TRAPS, ALL HIT AND HANDLED
 *   1. STALE DataTag. My first capture of the site filter showed
 *      DataTag:"Request" — left over from the O&M work-order grid visited earlier in
 *      the same browser session. Re-captured from a clean page load it is
 *      "HeadLeaseContract". A stale tag is accepted with 200 and the filter then
 *      silently does not apply. (Same trap as CORE scenario 4.)
 *   2. STALE FILTER STATE. Filter state is stored per ACCOUNT and survives
 *      logout/login, so the second capture showed MainID#58358 carried over from the
 *      previous selection. Reset to "Show all sites" first, then the clean payload is
 *      MainID#0.
 *   3. THE SITE NAME DOES NOT EXIST AS WRITTEN. The spec says "Affaldscenter,
 *      AffaldVarme, Center for Miljo og En" — that is the server's TRUNCATED label,
 *      and TWO different sites share it (ids 63351 and 58358). Exact-name lookup
 *      returns nothing, so the id is pinned. Either site satisfies the step.
 *   4. PAYER IS A COMBOBOX-TREE, not a select2. DataFilter_TFBenificiary2ID is a
 *      hidden input whose options lazy-load into the DOM; there is no ComboboxData
 *      endpoint to replay, so the id cannot be resolved at runtime. Read off the live
 *      control: refreshComboBoxTree(2,50566,'11644','MalerMestrene2') -> 50566.
 *      Note the label and field name disagree: "Payer" is TFBenificiary2ID, while
 *      TFPayerContactID is a DIFFERENT field ("Payer contact").
 *
 * SPEC READING — each block repeats "Select module Property management and go to tab
 * Lease contracts overview<Head lease contracts". For the two FILTER blocks that is
 * test-case boilerplate, not a re-navigation, so Head lease contracts is re-opened
 * only once for the filter work (it must be re-opened because three other sub-tabs
 * were loaded in between, which genuinely changes the active grid).
 *
 * LEARNINGS CARRIED OVER:
 *   - JOURNEY model, not auth-once (k6 clears the VU cookie jar between iterations).
 *   - LOGIN-FAILURE BACKOFF 20-40s.
 *   - ITER_DELAY fixed 10s, matching bygst/CORE/Odense so login rates compare.
 *   - serverUniqueString: TRUE — without it the library invents a UniqueString the
 *     server holds no layout against, every filter binds to nothing, and the grid
 *     reloads unfiltered while all checks pass.
 *   - ASSERT ON CONTENT in every run, not just under -e VERIFY.
 *   - BASE_URL guard: the shared library's last config fallback targets BYGST.
 *
 *   # smoke — ALWAYS run this first
 *   bash run.sh 4 -e VUS=1 -e DURATION=200s -e VERIFY=true
 */

import { check, sleep, group } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import http from 'k6/http';
import {
  login, logout, openModule, openRecordModal,
  APP, ajaxJson, ajaxForm, errorRate, filterTrend, recordModalTrend,
  defaultOptions, handleSummary,
} from './lib/mainmanager.js';

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
        scenario4kommune: {
          executor: 'constant-vus', exec: 'scenario4kommune',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario4kommune: {
          executor: 'ramping-vus',
          exec: 'scenario4kommune',
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

// All four declared LOCALLY. bygst has no verified descriptor for this module, and
// sharing one descriptor across the four sub-tabs is exactly the bug the first CORE
// version of this scenario had (it loaded the same grid three times).
function leaseGrid(dataTag, caption, menuItemId, childKeys) {
  return {
    processTag: 'PropertyManagement', processStepTag: 'LeaseContract',
    dataTag: dataTag, dataCaption: caption, dataPath: `${dataTag}$1$0`,
    menuItemId: menuItemId, menuItemType: 1,
    pageSize: parseInt(__ENV.GRID_PAGE || '100', 10),
    mainManFilterTag: dataTag,
    dataText: `Open ${caption.toLowerCase()}`,
    childKeys: childKeys || [],
  };
}
const HEAD  = leaseGrid('HeadLeaseContract', 'Head lease contract',
  parseInt(__ENV.MENUITEM_HEADLEASE || '5387', 10),
  // The 6 keys the browser requests on a head-lease open.
  ['SubContract', 'ServiceContractBenificiary', 'LeaseContractRenegotiation',
   'LeaseContractUtilization', 'CostDistributionAgreement', 'ServiceContractDocument']);
const LEASE = leaseGrid('LeaseContract', 'Lease contract',
  parseInt(__ENV.MENUITEM_LEASE || '1328', 10));
const SUB   = leaseGrid('SubLeaseContract', 'Sub lease contract',
  parseInt(__ENV.MENUITEM_SUBLEASE || '5394', 10));
const RENEG = leaseGrid('LeaseContractRenegotiation', 'Lease contract renegotiation',
  parseInt(__ENV.MENUITEM_RENEG || '5417', 10));

const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// Pinned ids — see traps 3 and 4. Both overridable per run.
const SITE_GROUND_ID = parseInt(__ENV.SITE_GROUND_ID || '58358', 10);   // "Affaldscenter, ..."
const PAYER_ID       = parseInt(__ENV.PAYER_ID || '50566', 10);         // MalerMestrene2

// The Head lease contract filter panel, captured verbatim. DO NOT edit order or
// membership. Only the Payer value varies. TFStatusID ships with 14 preselected.
function headLeaseFilterValues(payerId) {
  return [
    'DataFilter_TFSearchText#',
    'DataFilter_TFDateFilterID#1008',
    'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#;',
    'DataFilter_TFStatusID#1,10,11,13,14,15,16,17,18,19,2,20,5,8',
    'DataFilter_TFLeaseContractTypeID#0',
    'DataFilter_TFRentalTypeID#0',
    'DataFilter_TFTenancyStatusID#0',
    'DataFilter_TFCodeSearch#',
    'DataFilter_TFEFCategoryID1#0',
    'DataFilter_TFContractStatusCategoryID#0',
    'DataFilter_TFProviderID#0',
    'DataFilter_TFManagerID#0',
    'DataFilter_TFEFBoolean3#0',
    'DataFilter_TFAgentID#0',
    'DataFilter_TFAgentContactID#0',
    `DataFilter_TFBenificiary2ID#${payerId}`,          // <- "Payer"
    'DataFilter_TFPayerContactID#0',
    'DataFilter_TFEFBoolean2#0',
    'DataFilter_TFBenificiaryID#0',
    'DataFilter_TFEFBoolean1#0',
    'DataFilter_TFEFBoolean4#0',
    'DataFilter_TFHasTerminationClause#0',
    'DataFilter_TFShowInactiveFilterID#0',
  ];
}

function listBody(mod, us) {
  const len = parseInt(__ENV.GRID_PAGE || mod.pageSize || 100, 10);
  return `draw=1&start=0&length=${len}&search%5Bvalue%5D=&search%5Bregex%5D=false`
    + `&DataPath=${encodeURIComponent(mod.dataPath)}&UniqueString=${us}`
    + `&Gantt=False&PopupSQLListIndex=0&GroupBy=&ExtraParams=&IsSublist=False`;
}
function rowsIn(text) {
  const m = (text || '').match(/"recordsTotal":(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}
function reload(mod, us) {
  const r = http.post(`${APP}/restapi/List/GetMMList`, listBody(mod, us),
    Object.assign({ responseType: 'text' }, ajaxForm()));
  return { res: r, rows: rowsIn(typeof r.body === 'string' ? r.body : '') };
}
function assertGrid(label, r, opts) {
  opts = opts || {};
  let ok = check(r.res, {
    [`grid reloaded after ${label}`]: (x) => x.status === 200,
    [`${label} returned a grid`]:     () => r.rows !== null,
  });
  if (typeof opts.minRows === 'number') {
    ok = check(null, {
      [`${label} kept >= ${opts.minRows} rows`]: () => r.rows !== null && r.rows >= opts.minRows,
    }) && ok;
  }
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} ${label}: rows=${r.rows}`);
  errorRate.add(!ok);
  return r.rows;
}

// FOUR location controls including RegionID — the shared applyLocationFilter sends
// only three, which is not what this grid's client sends (see trap 1).
function siteFilter(mod, groundId, us, groupName, opts) {
  let rows = null;
  group(groupName || `Site filter ${groundId}`, function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/RefreshMainManFilter`, JSON.stringify({
      DataTag: mod.mainManFilterTag || mod.dataTag,
      ControlIDChanged: 'MainManFilter_TFGroundID',
      Value: ['MainManFilter_TFRegionID#0', 'MainManFilter_TFMainGroupID#0',
              `MainManFilter_TFGroundID#${groundId}`, 'MainManFilter_TFMainID#0'],
    }), ajaxJson());
    rows = assertGrid(`site filter (GroundID=${groundId})`, reload(mod, us), opts);
    filterTrend.add(Date.now() - t0);
  });
  return rows;
}

function payerFilter(mod, payerId, us, groupName, opts) {
  let rows = null;
  group(groupName || `Payer filter ${payerId}`, function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/RefreshDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, ControlIDChanged: 'DataFilter_TFBenificiary2ID',
      Value: headLeaseFilterValues(payerId), TemplateID: 0,
    }), ajaxJson());
    rows = assertGrid(`payer filter (${payerId})`, reload(mod, us), opts);
    filterTrend.add(Date.now() - t0);
  });
  return rows;
}

// EmptyDataFilter carries NO TemplateID — verified.
function clearFilter(mod, payerId, us, groupName, opts) {
  let rows = null;
  group(groupName || 'Clear filter (X)', function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/EmptyDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, Value: headLeaseFilterValues(payerId),
    }), ajaxJson());
    rows = assertGrid('filter clear', reload(mod, us), opts);
    filterTrend.add(Date.now() - t0);
  });
  return rows;
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

// Open a contract grid and the first record in it. Returns the grid result so the
// caller can reuse its UniqueString.
function gridAndOpen(mod, gridLabel, openLabel) {
  const grid = openModule(mod, gridLabel, undefined,
    { keepList: true, serverUniqueString: true });
  sleep(randomIntBetween(1, 3));
  if (!grid.ok) return grid;

  const rows = rowsIn(grid.listText);
  const id = firstId(grid.listText, mod.dataTag);
  check(null, {
    [`${mod.dataTag} grid returned rows`]: () => id !== null && rows !== null && rows > 0,
  });
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} ${mod.dataTag} grid rows=${rows}`);
  if (id) {
    openRecordModal(mod, id, grid.us, openLabel, recordModalTrend);
    sleep(randomIntBetween(1, 3));   // close is client-side
  }
  return grid;
}

export function scenario4kommune() {
  // Step 1: LOGIN every iteration. Backoff is REQUIRED.
  if (!login({ username: USERNAME, password: PASSWORD })) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Steps 2-3: Head lease contracts -> open a contract -> close.
  const head = gridAndOpen(HEAD,
    '2. Property mgmt -> Lease contracts overview -> Head lease contracts',
    '3. Open head lease contract');
  if (!head.ok) { logout(); sleep(ITER_DELAY); return; }

  // Steps 4-5: Lease contracts -> open -> close.
  gridAndOpen(LEASE, '4. Lease contracts', '5. Open lease contract');

  // Steps 6-7: Sub lease contracts -> open -> close.
  gridAndOpen(SUB, '6. Sub lease contracts', '7. Open sub lease contract');

  // Step 8: Lease contract renegotiations -> open a record.
  // The spec's "Save (and close)" is NOT performed — see the header for why.
  gridAndOpen(RENEG, '8. Lease contract renegotiations', '9. Open renegotiation');

  // Step 10: back to Head lease contracts for the filter work. This re-open IS real —
  // three other sub-tabs were loaded in between, so the active grid genuinely changed.
  // It also hands back a fresh UniqueString, which the filter calls are keyed on.
  const head2 = openModule(HEAD, '10. Back to Head lease contracts', undefined,
    { keepList: true, serverUniqueString: true });
  sleep(randomIntBetween(1, 3));
  if (!head2.ok) { logout(); sleep(ITER_DELAY); return; }

  const baseline = rowsIn(head2.listText);
  check(null, { 'head lease baseline has rows': () => baseline !== null && baseline > 0 });

  // Step 11: Site dropdown -> Affaldscenter. Expect 32 -> 3.
  // NO minRows on the apply leg: a site with no contracts is legitimate data.
  const siteRows = siteFilter(HEAD, SITE_GROUND_ID, head2.us,
    `11. Site filter -> Affaldscenter (${SITE_GROUND_ID})`);
  sleep(randomIntBetween(1, 3));

  // Step 12: clear the Site filter (Show all sites). minRows:1 — cannot be empty.
  const siteCleared = siteFilter(HEAD, 0, head2.us,
    '12. Clear site filter (Show all sites)', { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // The assertion that catches a filter doing nothing: compare the two legs measured
  // inside THIS iteration, so it holds whatever state the account started in.
  if (siteRows !== null && siteCleared !== null) {
    check(null, { 'site filter changed the grid': () => siteRows !== siteCleared });
  }

  // Step 13: "Click the Filter-button" — ZERO HTTP (the panel markup already arrived
  // with LoadMMFilterControl during the module load). Think time only.
  sleep(randomIntBetween(1, 3));

  // Step 14: Payer -> MalerMestrene2. Expect 32 -> 15.
  const payerRows = payerFilter(HEAD, PAYER_ID, head2.us,
    `14. Payer filter -> MalerMestrene2 (${PAYER_ID})`, { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 15: clear the filter with the X. minRows:1 — must restore the full grid.
  const payerCleared = clearFilter(HEAD, PAYER_ID, head2.us,
    '15. Clear filter (X)', { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  if (payerRows !== null && payerCleared !== null) {
    check(null, { 'payer filter changed the grid': () => payerRows !== payerCleared });
  }

  // Step 16: Logout, then the fixed gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario4kommune;

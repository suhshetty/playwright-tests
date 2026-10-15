/*
 * SCENARIO 4 — CORE tenant (https://kommunedevcore.mainmanager.is)
 *   Login -> Property management -> Lease contracts overview
 *   -> Head lease contracts  (open a contract, close)
 *   -> Lease contracts       (open a contract, close)
 *   -> Sub lease contracts   (open a contract, close)
 *   -> Lease contract renegotiations (open a record)
 *   -> Head lease contracts: Site filter, then clear
 *   -> Head lease contracts: Payer filter, then clear
 *   -> Logout
 *
 * JOURNEY model — login AND logout every iteration, matching the manual spec.
 * The longest scenario in the suite: 4 grid loads, 4 record opens, 4 filter operations.
 *
 * ---------------------------------------------------------------------------
 * ONE STEP IS DELIBERATELY NOT IMPLEMENTED — READ THIS
 * ---------------------------------------------------------------------------
 * The manual spec's renegotiation step ends "Select Save (and close)". This script
 * OPENS the renegotiation record but does NOT save it. That is a deliberate scope
 * decision, not an oversight:
 *
 *   1. It is a WRITE. Captured live: POST /api/MMLayout/Save with DataPath
 *      LeaseContractRenegotiation$1$1 — record id 1. Every VU would save the SAME row.
 *      At 250 VUs that measures row-lock contention, not application capacity, and the
 *      number it produces would not mean what the report says it means.
 *   2. Replicating it faithfully means echoing the form's ~20 Modal1_TF* values back
 *      plus a server-issued Checksum, all parsed out of a 75 KB HTML blob. Getting that
 *      wrong writes corrupted data to a shared record, repeatedly, under load.
 *
 * The open-record call is the bulk of the step's cost and IS included, so the load
 * profile is close. If the write must be measured, do it as a separate low-VU test
 * against per-VU records rather than folding it in here.
 *
 * Captured Save payload, for whoever picks this up:
 *   POST /api/MMLayout/Save   (form-urlencoded)
 *     UniqueString, DataPath, ActionKey, Value[] (form fields),
 *     AskToContinueConfirmed=false, SaveButtonValue=32, Checksum=<server-issued>
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON KOMMUNEDEVCORE 2026-09-09 — verified, not guessed
 * ---------------------------------------------------------------------------
 *   Tab       tab-LeaseContract = "Lease contracts overview"
 *   Sub-tabs  FOUR distinct grids, each with its own id and dataTag:
 *               Head lease contracts          5387  HeadLeaseContract
 *               Lease contracts               1328  LeaseContract
 *               Sub lease contracts           5394  SubLeaseContract
 *               Lease contract renegotiations 5417  LeaseContractRenegotiation
 *   Layout    InitMainLayout { ProcessTag:'PropertyManagement',
 *               ProcessStepTag:'LeaseContract', MenuItemID:<above> }
 *   Site      RefreshMainManFilter, form-urlencoded,
 *               DataTag=HeadLeaseContract, ControlIDChanged=MainManFilter_TFGroundID
 *   Payer     RefreshDataFilter, DataTag=HeadLeaseContract, 24 Value[] fields.
 *             "Payer" is DataFilter_TFBenificiary2ID — the label and the field name do
 *             NOT match, and TFPayerContactID is a different field ("Payer contact").
 *   Open      LoadMMModalControl + GetChildCount (6 child keys on head lease)
 *
 * TWO FILTER GOTCHAS, both hit and fixed here (they cost an afternoon):
 *   a) The site dropdown does NOT contain a plain "Affaldscenter" option. The real
 *      label is "Affaldscenter, AffaldVarme, Center for Miljo og En" (truncated by the
 *      server), and TWO options share that same visible text. Exact-match lookup
 *      returns nothing, so resolveFilterId() is called with { prefix: true } and matches
 *      on the leading fragment. Verified to bite: GroundID 58358 narrows 29 rows -> 3.
 *   b) Payer (DataFilter_TFBenificiary2ID) is a combobox-TREE, not a select2. There is
 *      no ComboboxData endpoint to query and its options lazy-load into the DOM, so an
 *      id cannot be resolved at runtime the way the site id can. The id is therefore
 *      pinned, read off the live control (refreshComboBoxTree(2, 50566, '11644',
 *      'MalerMestrene2')) and overridable with -e PAYER_ID. Verified to bite: 29 -> 12.
 *      If that payer is ever deleted the step still runs, it just stops narrowing —
 *      check the VERIFY row counts after any data refresh.
 *
 * The older archive/scenario4-propertymanagement-core.js drove all three
 * contract grids through one module descriptor, so it loaded the same grid three times.
 * This file uses the four separate descriptors.
 *
 * ---------------------------------------------------------------------------
 * LEARNINGS FROM SCENARIOS 1, 2, 3 AND 5, ALL APPLIED
 * ---------------------------------------------------------------------------
 * 1. NO auth-once — k6 clears the VU cookie jar between iterations, so ensureSession()
 *    sends every request after iteration 1 unauthenticated and the server answers 200
 *    with empty data, silently.
 * 2. LOGIN-FAILURE BACKOFF (20-40s) — otherwise a failed login restarts in ~0.3s and
 *    each VU hammers the login endpoint several times a second.
 * 3. ITERATION DELAY 10s, matching every other scenario so login rates compare.
 * 4. SERVER-ISSUED UniqueString — read from InitMainLayout, never invented.
 * 5. ASSERT ON CONTENT — every grid must return rows. A 200 with an empty grid is what
 *    the broken auth-once model produced and no status check catches it. These
 *    assertions run in EVERY run, not just under -e VERIFY:
 *      - 'grid returned data'  the body really is a DataTables payload, on all 5 loads
 *      - 'grid returned rows'  a record id was readable, on all 4 contract grids
 *      - 'kept/restored >= 1 rows' on the two filter-RESTORE legs (minRows)
 *    No minRows on the filter-APPLY legs: zero matches is a legitimate answer there.
 *    Falsified on 2026-09-09 by forcing minRows to 99999 — both checks failed and
 *    business_errors rose to 0.125, confirming they are not rubber stamps.
 * 6. BASE_URL GUARD — the library's last config fallback targets BYGST.
 * 7. VERIFY LOGGING of row counts, on top of (5), so a filter can be SHOWN to narrow
 *    the grid: site 29 -> 3, payer 29 -> 12, both back to 29 on clear.
 * 8. METRIC CARDINALITY — GetMMListHeaders, BuildGraphicalModal, GetLayerPoints and
 *    ComboboxData all embed a per-iteration UniqueString (and a Date.now() cache
 *    buster) in the URL, so they carry tags:{name}. Untagged, this scenario alone
 *    would mint ~9 new time series per iteration and blow k6's 100k limit partway
 *    through a 250 VU run — the defect that truncated bygst run-059.
 *
 *   # smoke — run first, expect 0 business_errors
 *   bash run.sh 4 -e VUS=1 -e DURATION=120s -e VERIFY=true
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, logout, openModule, openRecordModal,
  applyLocationFilter, applyDataFilter, clearDataFilter, resolveFilterId,
  MODULES, recordModalTrend, defaultOptions, handleSummary,
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
          // 5m ramp + 5m soak = 10 minutes, matching scenarios 1, 2, 3 and 5.
          stages: [
            { duration: '5m', target: 250 }, { duration: '5m', target: 250 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

export { handleSummary };

const HEAD   = MODULES.HeadLeaseContract;
const LEASE  = MODULES.LeaseContract;
const SUB    = MODULES.SubLeaseContract;
const RENEG  = MODULES.LeaseContractRenegotiation;

const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// Spec values.
//
// SITE is resolved by NAME at runtime through the dropdown's own lookup, with PREFIX
// matching: the real option is "Affaldscenter, AffaldVarme, Center for Miljo og En..."
// and the spec quotes it truncated, so an exact match finds nothing. There are also two
// options sharing that label, and either satisfies the step.
//
// PAYER cannot be resolved the same way. "Payer" (DataFilter_TFBenificiary2ID) is a
// COMBOBOX-TREE control, not a select2 dropdown — it has no ComboboxData endpoint, and
// its options lazy-load into the DOM only when the control is opened. There is no
// server call to replay. The id below was read from the live control
// (refreshComboBoxTree(2, 50566, '11644', 'MalerMestrene2')) and is per-TENANT data,
// like the widget snapshot id in scenario 1. Override with -e PAYER_ID for another
// tenant; find it by opening the Payer control and inspecting the node's serverid.
const SITE_NAME = __ENV.SITE_NAME || 'Affaldscenter';
const PAYER_ID  = parseInt(__ENV.PAYER_ID || '50566', 10);   // MalerMestrene2

// The Head lease contract filter panel, captured verbatim from the browser's
// RefreshDataFilter call. DO NOT edit the order or membership. Only the Payer value
// varies. Note TFStatusID ships with 14 statuses preselected.
function headLeaseFilterValues(payerId) {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFDateFilterID#1008',
    'DataFilter_TFTimeLimitINPUT#All years', 'DataFilter_TFTimeLimit#;',
    'DataFilter_TFStatusID#1,10,11,13,14,15,16,17,18,19,2,20,5,8',
    'DataFilter_TFLeaseContractTypeID#0', 'DataFilter_TFRentalTypeID#0',
    'DataFilter_TFTenancyStatusID#0', 'DataFilter_TFCodeSearch#',
    'DataFilter_TFEFCategoryID1#0', 'DataFilter_TFContractStatusCategoryID#0',
    'DataFilter_TFProviderID#0', 'DataFilter_TFManagerID#0',
    'DataFilter_TFEFBoolean3#0', 'DataFilter_TFAgentID#0',
    'DataFilter_TFAgentContactID#0',
    `DataFilter_TFBenificiary2ID#${payerId}`,          // <- "Payer"
    'DataFilter_TFPayerContactID#0', 'DataFilter_TFEFBoolean2#0',
    'DataFilter_TFBenificiaryID#0', 'DataFilter_TFEFBoolean1#0',
    'DataFilter_TFEFBoolean4#0', 'DataFilter_TFHasTerminationClause#0',
    'DataFilter_TFShowInactiveFilterID#0',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

// Open one contract grid and the first record in it. Returns the grid result so the
// caller can reuse its UniqueString for later filter calls.
function gridAndOpen(mod, gridLabel, openLabel) {
  const grid = openModule(mod, gridLabel, undefined, { keepList: true });
  sleep(randomIntBetween(1, 3));
  if (!grid.ok) return grid;

  const id = firstId(grid.listText, mod.dataTag);
  check(null, { [`${mod.dataTag} grid returned rows`]: () => id !== null });
  if (id) {
    openRecordModal(mod, id, grid.us, openLabel, recordModalTrend);
    sleep(randomIntBetween(1, 3));   // close is client-side
  }
  return grid;
}

export function scenario4core() {
  // Step 1: LOGIN. Backoff on failure is REQUIRED — see learning 2 in the header.
  if (!login()) {
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

  // Step 10: back to Head lease contracts for the filter steps. Reloading gives a fresh
  // UniqueString, which the filter calls below are keyed on.
  // minRows:1 — this reload is the BASELINE the two filter pairs are measured against.
  // If it comes back empty the filter steps still answer 200 and still "pass" while
  // comparing nothing to nothing, which is the bygst empty-grid trap exactly.
  const head2 = openModule(HEAD, '10. Back to Head lease contracts', undefined,
    { keepList: true, minRows: 1 });
  sleep(randomIntBetween(1, 3));
  if (!head2.ok) { logout(); sleep(ITER_DELAY); return; }

  // Step 11: Site dropdown -> select a site, then clear it.
  const siteId = resolveFilterId(HEAD, 'GroundID', SITE_NAME,
    { type: '3', prefix: true, groupName: `Resolve site '${SITE_NAME}'` });
  // No minRows on the APPLY leg — a site with zero contracts is a legitimate answer.
  if (siteId) {
    applyLocationFilter(HEAD, siteId, head2.us, `11. Site filter -> ${SITE_NAME}`);
    sleep(randomIntBetween(1, 3));
  }
  // minRows:1 on the RESTORE leg — "Show all sites" returning nothing cannot be real data.
  applyLocationFilter(HEAD, 0, head2.us, '12. Site filter -> Show all sites',
    undefined, { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 13: Filter panel -> Payer -> filter, then clear via the X.
  // PAYER_ID is configured, not looked up — see the note above the constant.
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} siteId=${siteId} payerId=${PAYER_ID}`);
  applyDataFilter(HEAD, 'DataFilter_TFBenificiary2ID',
    headLeaseFilterValues(PAYER_ID), head2.us, `13. Payer filter -> id ${PAYER_ID}`);
  sleep(randomIntBetween(1, 3));

  // minRows:1 — clearing the filter must restore the full grid. This is the assertion
  // that would have caught the bygst "200 with an empty grid" defect under load.
  clearDataFilter(HEAD, headLeaseFilterValues(PAYER_ID), head2.us, '14. Clear filter (X)',
    undefined, { minRows: 1 });
  sleep(randomIntBetween(1, 3));

  // Step 15: Logout, then the gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario4core;

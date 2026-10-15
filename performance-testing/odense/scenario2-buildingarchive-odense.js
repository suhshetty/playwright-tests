/*
 * SCENARIO 2 (ODENSE) — https://fm.odense.dk  "Odense kommune demo MainManager"
 *   Login -> Building archive -> Site register/Sites (open a site)
 *   -> Locations overview/Buildings (open a building)
 *   -> Site location filter -> clear -> City data filter -> clear -> Logout
 *
 * Same 15 manual steps as scenario2-buildingarchive.js (bygst). Odense runs the same
 * WebForms build, so the HTTP layer is the shared lib/mainmanager.js. The two Odense
 * deltas (2-step login, prefix site lookup) live in lib/mainmanager-odense.js, which
 * re-exports everything else. lib/mainmanager.js IS NOT MODIFIED — bygst runs 001-059
 * stay comparable.
 *
 * JOURNEY model — login AND logout every iteration (step 15 is Logout).
 *
 * ---------------------------------------------------------------------------
 * VERIFIED LIVE ON fm.odense.dk 2026-09-10 — measured, not assumed
 * ---------------------------------------------------------------------------
 *   Sites      menu item 540 (Ground)     -> IDENTICAL to bygst
 *   Buildings  menu item 8   (Building)   -> IDENTICAL to bygst
 *              so MODULES.Sites / MODULES.Buildings are reused unchanged.
 *   Grid sizes Sites 850 rows, Buildings 2,286 rows.
 *   Location   RefreshMainManFilter -> DataTag 'Ground',
 *              MainGroupID / GroundID / MainID  == what applyLocationFilter sends.
 *   Filters    JSON payloads (WebForms style), TemplateID:0 on RefreshDataFilter.
 *   Open       openMyModal('Ground','Ground$1$271',...) — standard shape.
 *
 * TWO THINGS DIFFER FROM BYGST, BOTH MEASURED:
 *
 *   1. THERE IS NO MUNICIPALITY FILTER. Odense is a single municipality, so the
 *      Buildings filter panel has no DataFilter_TFMunicipalityID at all — bygst's
 *      step 11 field simply does not exist here. The closest equivalent that carries
 *      real data is CITY (DataFilter_TFCityID). Chosen value "Odense C" = id 18,
 *      which narrows Buildings 2,286 -> 557. The whole 18-field panel below was
 *      captured verbatim from the browser; it is NOT bygst's list (different fields).
 *
 *   2. SITE NAMES ARE CODE-PREFIXED AND THE SEARCH BREAKS ON SPACES.
 *      Chosen site "1101 Rådhuset" = GroundID 381 (narrows Buildings 2,286 -> 3).
 *      Measured behaviour of the dropdown's own search:
 *          q="1101"          -> 1 hit
 *          q="Rådhuset"      -> 1 hit
 *          q="1101 Rådhuset" -> NO DATA   (the space kills it)
 *          q="Radhuset"      -> NO DATA   (accent-sensitive)
 *      So SITE_NAME defaults to the bare code '1101' and is matched as a PREFIX via
 *      resolveFilterIdPrefix(). Bonus: it keeps this file pure ASCII, which avoids the
 *      encoding corruption we hit editing these files on Windows previously.
 *
 * LEARNINGS CARRIED OVER FROM BYGST/CORE:
 *   - JOURNEY model, not auth-once: k6 clears the VU cookie jar between iterations,
 *     so a held session silently sends unauthenticated requests that answer 200 with
 *     empty data.
 *   - LOGIN-FAILURE BACKOFF (20-40s), or a failing login is retried several times a
 *     second per VU and floods the endpoint.
 *   - ITER_DELAY fixed at 10s, matching bygst/kommune/CORE so login rates compare.
 *   - ASSERT ON CONTENT: grids must return rows; the login asserts GetTempCode's
 *     Success flag, because it answers 200 with Success:false on a bad password.
 *   - -e VERIFY=true logs row counts so each filter can be shown to actually filter.
 *
 *   # smoke — ALWAYS run this first
 *   bash run.sh 2 -e VUS=1 -e DURATION=120s -e VERIFY=true
 */

import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  loginOdense, resolveFilterIdPrefix, ODENSE_CONFIG, rowsIn, resetAccountFilterState,
  loadLandingModule, logout, openModule, openRecordModal,
  applyLocationFilterChecked, applyDataFilterChecked, clearDataFilterChecked,
  MODULES, recordModalTrend, defaultOptions, handleSummaryOdense,
} from './lib/mainmanager-odense.js';
import { check as k6check } from 'k6';

// The shared library resolves BASE_URL at import time and its LAST fallback is
// config.json, which points at BYGST. Require the flag so a missing config-odense.json
// can never silently aim this at another customer.
if (!__ENV.BASE_URL) {
  throw new Error(
    'Pass -e BASE_URL=https://fm.odense.dk\n' +
    'Credentials come from config-odense.json, or -e MM_USERNAME / -e MM_PASSWORD.');
}

const base = defaultOptions();
export const options = __ENV.VUS
  ? {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario2odense: {
          executor: 'constant-vus', exec: 'scenario2odense',
          vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m',
        },
      },
    }
  : {
      discardResponseBodies: base.discardResponseBodies,
      thresholds: base.thresholds,
      scenarios: {
        scenario2odense: {
          executor: 'ramping-vus',
          exec: 'scenario2odense',
          startVUs: 1,
          // 5m ramp to 150 VU + 55m soak = 1 HOUR. Same shape as the bygst 1-hour
          // runs (055 / 058 / 059) so the two tenants compare directly, and written
          // as plain literals like bygst's so the file always states what ran.
          //
          // 150 VU is the cap the customer asked for (16 Sep). Earlier Odense runs
          // used 250 and drove the environment into refusing TCP connections three
          // times -- do not raise this without a fresh agreement and a window.
          // For the 10-minute warm-up, change '55m' to '5m' on the second stage.
          stages: [
            { duration: '5m', target: 150 },  { duration: '55m', target: 150 },
          ],
          gracefulRampDown: '30s',
        },
      },
    };

// Odense-specific report: the shared one's "Server errors observed" table covers only
// three bygst filter endpoints and reports zero while the login path is returning 503s.
// handleSummaryOdense keeps that report and appends the real login-path status breakdown.
export { handleSummaryOdense as handleSummary };

// ---------------------------------------------------------------------------
// setup() — runs ONCE before any VU starts.
//
// Odense stores grid filter state PER USER ACCOUNT, and it SURVIVES logout/login.
// Proven 2026-09-10: filter Buildings to 3 rows, log out, log back in -> still 3 rows.
// So if a previous run was interrupted mid-iteration (VU killed at test end, or an
// early-return path), this run's FIRST iteration opens an already-filtered grid — a
// 3-row page instead of a 2,286-row one, which quietly makes the latency numbers
// meaningless as well as breaking any "did the filter narrow it?" assertion.
// Clearing it once here costs one login and guarantees a known starting state.
// ---------------------------------------------------------------------------
export function setup() {
  if (!loginOdense()) return { reset: null };
  const rows = resetAccountFilterState(MODULES.Buildings, '0. Reset inherited filter state');
  logout();
  console.log(`[SETUP] account filter state reset — Buildings now ${rows} rows`);
  return { reset: rows };
}

const SITE     = MODULES.Sites;       // 540 — same id as bygst
const BUILDING = MODULES.Buildings;   // 8   — same id as bygst

const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// '1101' is a SEARCH TOKEN matched as a prefix, not a full name — see header note 2.
const SITE_NAME      = __ENV.SITE_NAME || ODENSE_CONFIG.siteName || '1101';
const CITY_NAME      = __ENV.CITY_NAME || ODENSE_CONFIG.cityName || 'Odense C';
const SITE_GROUND_ID = __ENV.SITE_GROUND_ID ? parseInt(__ENV.SITE_GROUND_ID, 10) : null;
const CITY_ID        = __ENV.CITY_ID        ? parseInt(__ENV.CITY_ID, 10)        : null;

// The Odense Buildings "Filter" panel, captured verbatim from the browser's own
// RefreshDataFilter body. DO NOT edit the order or membership. Only the City varies.
// This is NOT bygst's field list — Odense has no Municipality/Subtype/Manager fields
// and does have the EFScopeCategory/FacilityUsage ones.
function buildingDataFilterValues(cityId) {
  return [
    'DataFilter_TFSearchText#',
    'DataFilter_TFDateFilterID#1001',
    'DataFilter_TFTimeLimitINPUT#All years',
    // '#;' — a bare semicolon, NOT empty. Captured verbatim from both the browser's
    // RefreshDataFilter and its EmptyDataFilter on Odense 2026-09-10. An earlier
    // version of this file sent it empty; the server tolerated that, but it is not
    // what the client sends and "tolerated" is not the bar these scripts aim for.
    'DataFilter_TFTimeLimit#;',
    'DataFilter_TFGeographicalRegionID#0',
    'DataFilter_TFIsLocatedOnMap#0',
    'DataFilter_TFEFGlobalCategoryID1#0',
    'DataFilter_TFFacilityUsageID#0',
    'DataFilter_TFUsageID#0',
    `DataFilter_TFCityID#${cityId}`,
    'DataFilter_TFZipCodeID#0',
    'DataFilter_TFPreservationConditions#0',
    'DataFilter_TFEFScopeCategoryID1#0',
    'DataFilter_TFShowInactiveFilterID#0',
    'DataFilter_TFEFScopeCategoryID4#0',
    'DataFilter_TFOwningConditionID#0',
    'DataFilter_TFEFScopeCategoryID5#0',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

export function scenario2odense() {
  // Step 1: LOGIN (Odense 2-request flow). Backoff on failure is REQUIRED.
  if (!loginOdense()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  loadLandingModule();
  sleep(randomIntBetween(1, 3));

  // Steps 2-4: Building archive -> Site register -> Sites grid (850 rows).
  //
  // serverUniqueString: TRUE — see the long note below at step 9. In short: without it
  // the library invents a UniqueString the server has no layout for, so every filter
  // binds to nothing and the grid silently reloads UNFILTERED.
  const sites = openModule(SITE, '2. Building archive -> Site register -> Sites',
    undefined, { keepList: true, serverUniqueString: true });
  sleep(randomIntBetween(1, 3));

  // Step 5: open a site -> popup, then close (close is client-side -> think time).
  const siteRowId = firstId(sites.listText, 'Ground');
  check(null, { 'Sites grid returned rows': () => siteRowId !== null });
  if (sites.ok && siteRowId) {
    openRecordModal(SITE, siteRowId, sites.us, '5. Open site -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // Steps 6-7: Locations overview -> Buildings grid (2,286 rows).
  const buildings = openModule(BUILDING, '6. Locations overview -> Buildings',
    undefined, { keepList: true, serverUniqueString: true });
  sleep(randomIntBetween(1, 3));
  if (!buildings.ok) { logout(); sleep(ITER_DELAY); return; }

  // Resolve both dropdown values now that the Buildings layout is active — that is
  // what issues the filter controls' DataPath/UniqueString/checksum.
  //   Site: type '3' = top location bar, PREFIX match (see header note 2).
  //   City: type '2' = right-hand Filter panel, exact match ('Odense C' resolves clean).
  const siteId = (SITE_GROUND_ID != null)
    ? SITE_GROUND_ID
    : resolveFilterIdPrefix(BUILDING, 'GroundID', SITE_NAME,
        { type: '3', prefix: true, groupName: `Resolve site '${SITE_NAME}'` });

  const cityId = (CITY_ID != null)
    ? CITY_ID
    : resolveFilterIdPrefix(BUILDING, 'CityID', CITY_NAME,
        { type: '2', groupName: `Resolve city '${CITY_NAME}'` });

  if (__ENV.VERIFY) {
    console.log(`[VERIFY] vu=${__VU} iter=${__ITER} siteId(${SITE_NAME})=${siteId} cityId(${CITY_NAME})=${cityId}`);
  }
  sleep(randomIntBetween(1, 3));

  // Step 8: open a building -> popup, then close (client-side -> think time).
  const buildingId = firstId(buildings.listText, 'Building');
  check(null, { 'Buildings grid returned rows': () => buildingId !== null });
  if (buildingId) {
    openRecordModal(BUILDING, buildingId, null, '8. Open building -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  // Step 9: "Site" dropdown -> 1101 Rådhuset. Expect 2,286 -> 3.
  //
  // WHY openModule ABOVE PASSES serverUniqueString:true — READ BEFORE CHANGING.
  // lib/mainmanager.js defaults to a CLIENT-INVENTED UniqueString. The server accepts
  // it (200) but holds no layout against it, so RefreshMainManFilter/RefreshDataFilter
  // bind to nothing and the grid reloads UNFILTERED. It is completely silent: every
  // check passes, only the row count gives it away.
  // Observed here on the first Odense smoke, before the flag was set: site filter and
  // city filter both returned 2,286 of 2,286 — i.e. no filtering at all — while the
  // browser gives 3 and 557 for the same inputs.
  // On bygst this flag is OFF by design, purely so runs 001-056 stay comparable
  // (see the note at lib/mainmanager.js:584). Odense has NO run history to protect,
  // so it is ON from the first run and the filter steps measure something real.
  // BASELINE for the "did the filter actually do anything?" assertions. Read from the
  // grid body openModule already kept, so it tracks the data instead of hardcoding
  // 2,286 — which would rot the moment Odense's demo data changes.
  const baseline = rowsIn(buildings.listText);   // logged only; assertions no longer depend on it
  if (__ENV.VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} unfiltered baseline=${baseline}`);

  // NOTE ON THE SPEC'S REPEATED NAVIGATION ROW.
  // The manual spec is written as four standalone blocks, and blocks 3 and 4 each
  // begin with "Select module Building archive and go to tab Locations overview<
  // Buildings". That repetition is there because each block is authored as its own
  // test case with its own precondition — NOT because the user navigates three times.
  // A real user filtering a grid is already on that page and stays there.
  // So the module is opened ONCE (step 6) and every filter below reuses its
  // UniqueString. This also matches bygst exactly (2 openModule calls per iteration:
  // Sites once, Buildings once), which is what keeps the two tenants comparable.
  let filtered9 = null;
  if (siteId) {
    filtered9 = applyLocationFilterChecked(BUILDING, siteId, buildings.us,
      `9. Site filter -> ${SITE_NAME}`, {}).rows;
    sleep(randomIntBetween(1, 3));
  }

  // Step 10: "Site" dropdown -> Show all sites (clear the location filter).
  // minRows:1 — "show all" coming back empty cannot be real data.
  const restored10 = applyLocationFilterChecked(BUILDING, 0, buildings.us,
    '10. Site filter -> Show all sites', { minRows: 1 }).rows;
  sleep(randomIntBetween(1, 3));

  // THE ASSERTION THAT CATCHES A FILTER DOING NOTHING.
  // Compare step 9 against step 10 rather than against the count read at module open.
  // Both are measured inside this iteration, so this holds even if the account started
  // in an inherited filtered state (see setup()). If the site filter is silently
  // ignored — which is exactly what happens with a client-invented UniqueString —
  // step 9 equals step 10 and this FAILS. A bare 200 check would not notice.
  if (filtered9 !== null && restored10 !== null) {
    k6check(null, {
      'site filter actually narrowed the grid': () => filtered9 < restored10,
    });
  }

  // Steps 11-13: Filter panel (opening it is client-side) -> City = Odense C -> Filter On.
  // Expect 2,286 -> 557.
  // Step 11: "Click the Filter-button" — ZERO HTTP requests. Verified in the browser:
  // the panel markup already arrived with LoadMMFilterControl during the module load,
  // so opening it is pure client-side. Modelled as think time, not an invented call.
  sleep(randomIntBetween(1, 3));

  if (cityId != null) {
    // Steps 12-13: fill the City field and filter.
    const filtered11 = applyDataFilterChecked(BUILDING, 'DataFilter_TFCityID',
      buildingDataFilterValues(cityId), buildings.us,
      `12. Data filter -> City ${CITY_NAME}`, {}).rows;
    sleep(randomIntBetween(1, 3));

    // Step 14: Clear filter via the X. minRows:1 — clearing must restore the grid.
    const restored14 = clearDataFilterChecked(BUILDING, buildingDataFilterValues(cityId),
      buildings.us, '14. Clear filter (X)', { minRows: 1 }).rows;
    sleep(randomIntBetween(1, 3));

    // Same self-referential check as the site filter above.
    if (filtered11 !== null && restored14 !== null) {
      k6check(null, {
        'city filter actually narrowed the grid': () => filtered11 < restored14,
      });
    }
  }

  // Step 15: Logout, then the fixed gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

export default scenario2odense;

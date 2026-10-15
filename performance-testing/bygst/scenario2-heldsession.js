/*
 * SCENARIO 2 — HELD SESSION variant (bygst)
 *
 * Same 15 steps as scenario2-buildingarchive.js, but each virtual user logs in ONCE and
 * then repeats the journey for the whole run without logging out — which is what the
 * customer asked for ("250 simultaneous users, logged in most of the time").
 *
 * WHY THIS IS A SEPARATE FILE, AND WHY THE LOOP IS INSIDE THE ITERATION
 * --------------------------------------------------------------------
 * k6 clears the VU cookie jar at the START OF EVERY ITERATION. Verified 2026-08-26:
 *     iter 0: cookies AT START = NONE
 *     iter 0: cookies AFTER login = [".ASPXAUTH","ASP.NET_SessionId"]
 *     iter 1: cookies AT START = NONE          <-- session gone
 * So the library's ensureSession() (auth-once) never actually held a session: it skips
 * login because a module-scoped flag says "already logged in", but the cookies are gone,
 * so from iteration 2 every request is UNAUTHENTICATED. The server answers 200 with an
 * empty result set, nothing errors, and no check catches it. That is the real cause of
 * "the grids come back empty in a long-lived session" — not a product defect.
 * (Scenarios 1/3/5/6 use ensureSession and are affected; scenario 2 is not, because it
 * logs in every iteration.)
 *
 * The fix is structural: keep the whole run inside ONE iteration, so the jar is never
 * cleared. Hence the while-loop below instead of relying on k6 iterations.
 *
 * SECOND FIX THIS FILE DEPENDS ON — opts.serverUniqueString
 * ---------------------------------------------------------
 * openModule historically INVENTED the UniqueString instead of using the one
 * InitMainLayout issues. The server accepts it (200) but has no layout for it, so the
 * filters bind to nothing and the grid always reloads unfiltered. Proven in one session:
 * invented -> 2554 rows after filtering; server-issued -> 3 rows (matches the browser).
 * This file opts in; the production scenario 2 does not, so its run history stays
 * comparable.
 *
 *   # validate at 25 VUs, with row counts proving the filters bite
 *   k6 run -e VUS=25 -e LOOP_SECONDS=300 -e VERIFY=true \
 *     -e REPORT_DIR=reports/scenario2-held/run-001 \
 *     scenario2-heldsession.js
 *
 * VERIFY is 1-VU-friendly but usable at 25 (it keeps response bodies — expect more
 * memory and slightly higher receive times; don't compare VERIFY runs to clean ones).
 */

import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  login, loadLandingModule, logout, openModule, openRecordModal,
  applyLocationFilter, applyDataFilter, clearDataFilter,
  resolveDataFilterId, MODULES, CONFIG, recordModalTrend,
  defaultOptions, handleSummary,
} from './lib/mainmanager.js';

const base = defaultOptions();

// How many times a held session stopped working and had to be re-established. The
// headline stability number for this model — 0 means every VU held one session all run.
const sessionDeaths = new Counter('session_deaths');
// Journeys that failed but recovered on the SAME session, i.e. transient server errors
// rather than a dead session. Keeping these separate is the whole point: run-004 proved
// they are easy to confuse, and confusing them is expensive (see JOURNEY_RETRIES below).
const transientFails = new Counter('transient_journey_failures');

// How long each VU keeps looping journeys inside its single iteration.
const LOOP_SECONDS = parseInt(__ENV.LOOP_SECONDS || '300', 10);
// Window over which the VUs' initial logins are spread (the missing "ramp").
const RAMP_SECONDS = parseInt(__ENV.RAMP_SECONDS || '300', 10);
const LOGIN_RETRIES = parseInt(__ENV.LOGIN_RETRIES || '5', 10);
// Failed journeys on the same session before we conclude the session is actually dead.
// A single failure is usually transient 503 load-shedding, NOT a dead session, and the
// two are indistinguishable from the client. Run-004 (2026-08-27) re-logged in on the
// first failure: 250 VUs hit the login page at once, 0 of 1127 attempts succeeded, and
// the run ended with 8.62% http-failed vs 4.73% for run-003 which never re-logged in.
const JOURNEY_RETRIES = parseInt(__ENV.JOURNEY_RETRIES || '3', 10);
// Window to spread re-logins over. Same lesson as above: 250 logins staggered over 5m
// succeeded 100%; 250 at once succeeded 0%. Never let the herd re-login together.
const RELOGIN_JITTER = parseInt(__ENV.RELOGIN_JITTER || '120', 10);
// maxDuration is a safety net, not the pacing — the loop's own deadline ends the run.
// Must cover the staggered start + the loop + the final journey + logout, or k6 cancels
// requests in flight (they surface as HTTP 0 and look like dead sessions).
const MAX_DURATION = __ENV.DURATION || `${RAMP_SECONDS + LOOP_SECONDS + 240}s`;

export const options = {
  discardResponseBodies: base.discardResponseBodies,
  thresholds: base.thresholds,
  scenarios: {
    // per-vu-iterations, NOT constant-vus: exactly ONE iteration per VU, so one login
    // per VU for the whole run. With constant-vus, k6 starts a fresh iteration the
    // moment the loop finishes, which logs in again and defeats the point.
    heldsession: {
      executor: 'per-vu-iterations',
      exec: 'heldSession',
      vus: parseInt(__ENV.VUS || '25', 10),
      iterations: 1,
      maxDuration: MAX_DURATION,
      gracefulStop: '60s',
    },
  },
};

export { handleSummary };

const SITE     = MODULES.Sites;
const BUILDING = MODULES.Buildings;
const OPTS     = { keepList: true, serverUniqueString: true };

const SITE_NAME         = __ENV.SITE_NAME         || CONFIG.siteName         || 'Adelgade 11';
const MUNICIPALITY_NAME = __ENV.MUNICIPALITY_NAME || CONFIG.municipalityName || 'København';
const ITER_DELAY        = parseInt(__ENV.ITER_DELAY || '10', 10);

// Identical to the production scenario — order and membership must match the browser.
function buildingDataFilterValues(municipalityId) {
  return [
    'DataFilter_TFSearchText#', 'DataFilter_TFDateFilterID#1001', 'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#;', 'DataFilter_TFIsLocatedOnMap#0',
    'DataFilter_TFMainTypeID#0', 'DataFilter_TFSubtypeID#0',
    `DataFilter_TFMunicipalityID#${municipalityId}`,
    'DataFilter_TFCityID#0', 'DataFilter_TFZipCodeID#0',
    'DataFilter_TFPreservationConditions#0', 'DataFilter_TFOwningConditionID#0',
    'DataFilter_TFManagerID#0', 'DataFilter_TFManufacturerID#0',
    'DataFilter_TFContactID#0', 'DataFilter_TFEnergyLabelCertificateID#0', 'DataFilter_TFEnergyLabelID#0',
    'DataFilter_TFShowInactiveFilterID#0',
  ];
}

function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

// One pass of steps 2-14. Returns false if the session looks dead, so the caller can
// stop looping instead of hammering a broken session for the rest of the run.
function oneJourney(n) {
  const sites = openModule(MODULES.Sites, '2. Building archive -> Site register -> Sites', undefined, OPTS);
  sleep(randomIntBetween(1, 3));

  const siteId = resolveDataFilterId(MODULES.Sites, 'GroundID', SITE_NAME,
    { type: '3', groupName: `Resolve site '${SITE_NAME}'` });
  sleep(randomIntBetween(1, 3));

  const siteRowId = firstId(sites.listText, 'Ground');
  // THE assertion this variant exists to make: on a held session the grid must keep
  // returning rows. Empty here = the session died, which is the failure we're hunting.
  const alive = check(null, { 'session alive: Sites grid returned rows': () => siteRowId !== null });
  if (!alive) return false;

  openRecordModal(SITE, siteRowId, null, '5. Open site -> popup', recordModalTrend);
  sleep(randomIntBetween(1, 3));

  const buildings = openModule(MODULES.Buildings, '6. Locations overview -> Buildings', undefined, OPTS);
  sleep(randomIntBetween(1, 3));
  if (!buildings.ok) return false;

  const municipalityId = resolveDataFilterId(MODULES.Buildings, 'MunicipalityID', MUNICIPALITY_NAME);
  sleep(randomIntBetween(1, 3));

  const buildingId = firstId(buildings.listText, 'Building');
  check(null, { 'session alive: Buildings grid returned rows': () => buildingId !== null });
  if (buildingId) {
    openRecordModal(BUILDING, buildingId, null, '8. Open building -> popup', recordModalTrend);
    sleep(randomIntBetween(1, 3));
  }

  if (siteId) {
    applyLocationFilter(MODULES.Buildings, siteId, buildings.us, `9. Site filter -> ${SITE_NAME}`);
    sleep(randomIntBetween(1, 3));
  }
  applyLocationFilter(MODULES.Buildings, 0, buildings.us, '10. Site filter -> Show all sites');
  sleep(randomIntBetween(1, 3));

  if (municipalityId != null) {
    applyDataFilter(MODULES.Buildings, 'DataFilter_TFMunicipalityID',
      buildingDataFilterValues(municipalityId), buildings.us,
      `11. Data filter -> Municipality ${MUNICIPALITY_NAME}`);
    sleep(randomIntBetween(1, 3));
    clearDataFilter(MODULES.Buildings, buildingDataFilterValues(municipalityId), buildings.us,
      '14. Clear data filter');
    sleep(randomIntBetween(1, 3));
  }
  return true;
}

export function heldSession() {
  // STAGGERED START. per-vu-iterations gives no ramp: all VUs would start at t=0 and
  // fire N simultaneous logins. At 250 VUs the login page already drops ~2 of every 3
  // requests (run-055/056/058), so a synchronised burst would fail most of them — and
  // with iterations:1 a VU whose single login fails is idle for the WHOLE run. Spread
  // the logins over RAMP_SECONDS to mirror the journey model's 5m ramp.
  // t0 is captured BEFORE the stagger. per-vu-iterations starts every VU at once, so t0
  // is effectively the test start for all of them — which lets the loop below use one
  // shared wall-clock deadline. Without that, each VU would loop for LOOP_SECONDS from
  // its OWN login time, so the last VU would finish RAMP_SECONDS after the first and the
  // window at full concurrency would be short by that much. This way the profile matches
  // scenario2-buildingarchive's ramping-vus exactly: RAMP up, then all VUs to the end.
  const t0 = Date.now();
  const vus = parseInt(__ENV.VUS || '25', 10);
  sleep(((__VU - 1) / vus) * RAMP_SECONDS);

  // Log in, retrying: losing a VU to one unlucky login would silently shrink the
  // concurrency we are trying to measure. Returns false if it never got in.
  function signIn(why) {
    let attempt = 0;
    while (!login()) {
      attempt++;
      if (attempt >= LOGIN_RETRIES) {
        console.error(`[HELD] vu=${__VU} gave up after ${attempt} login attempts (${why})`);
        return false;
      }
      sleep(randomIntBetween(10, 25));
    }
    loadLandingModule();
    sleep(randomIntBetween(1, 3));
    return true;
  }

  if (!signIn('initial')) return;

  // Shared wall-clock deadline (see the t0 note above): every VU stops at
  // RAMP_SECONDS + LOOP_SECONDS from test start, so the run is exactly that long and all
  // VUs are active together for the whole soak.
  const deadline = t0 + (RAMP_SECONDS + LOOP_SECONDS) * 1000;
  let n = 0, relogins = 0, consecutiveFails = 0;
  while (Date.now() < deadline) {
    n++;
    const ok = oneJourney(n);
    if (__ENV.VERIFY) console.log(`[HELD] vu=${__VU} journey=${n} ok=${ok} elapsed=${Math.round((Date.now() - t0) / 1000)}s`);

    if (ok) { consecutiveFails = 0; sleep(ITER_DELAY); continue; }

    // A failed journey is AMBIGUOUS: transient 503 load-shedding and a genuinely dead
    // session look identical from here (grid returns no rows either way). Assume
    // transient first and retry on the SAME session — cheap if right, and if wrong we
    // only lose a couple of journeys. Escalating straight to re-login is what wrecked
    // run-004 (see JOURNEY_RETRIES).
    consecutiveFails++;
    if (consecutiveFails < JOURNEY_RETRIES) {
      transientFails.add(1);
      if (Date.now() >= deadline) break;
      sleep(randomIntBetween(5, 20));
      continue;
    }

    // JOURNEY_RETRIES failures in a row on one session: treat it as really dead.
    sessionDeaths.add(1);
    relogins++;
    console.error(`[HELD] vu=${__VU} session dead after ${consecutiveFails} failed journeys `
      + `(t=${Math.round((Date.now() - t0) / 1000)}s) — re-login #${relogins}`);
    if (Date.now() >= deadline) break;
    // JITTER, not a fixed pause. If every VU sleeps the same amount they arrive at the
    // login page together, which is exactly the burst that fails.
    sleep(randomIntBetween(1, RELOGIN_JITTER));
    if (!signIn(`after death #${relogins}`)) return;
    consecutiveFails = 0;
  }

  // Step 15 — once, at the very end.
  logout();
}

export default heldSession;

/*
 * ============================================================================
 * MIXED-WORKLOAD RUNNER — open model (arrival-rate), weighted per scenario
 * ============================================================================
 *
 * Models a realistic blend of the 6 scenarios running together, each at its own
 * share of a target request rate. Unlike the per-scenario files (closed model,
 * good for smoke/debug), this uses constant-arrival-rate so throughput is held
 * constant regardless of response time — that's how you find the capacity knee.
 *
 *   k6 run scenarios/all.js
 *   k6 run -e RATE=10 -e DURATION=15m -e BASE_URL=https://<tenant>.mainmanager.is \
 *          scenarios/all.js
 *
 * ADD A SCENARIO (2-6):
 *   1. In its file, export a named exec fn (e.g. `export function scenario2(){...}`).
 *   2. Import + re-export it here (k6 requires exec fns to be exported by THIS entry).
 *   3. Add a scenarios{} entry; give it a WEIGHT (its share of RATE).
 * ============================================================================
 */

import { defaultThresholds, handleSummary } from '../lib/mainmanager.js';
export { handleSummary };   // auto-writes summary.html + summary.json at end of run
// Scenario 1 uses the JOURNEY shape (login per iteration): the My Page dashboard
// only loads widgets in a fresh session, so auth-once can't re-measure it.
// Grid-based scenarios (2-6) can instead use the auth-once session shape.
import { scenario1 } from '../scenario1-login-mypage-logout.js';
// import { scenario2Session } from '../scenario2-....js';

// Total iterations/sec across the whole blend, and how long to hold it.
const RATE     = parseInt(__ENV.RATE || '2', 10);
const DURATION = __ENV.DURATION || '5m';

// Each scenario's share of RATE (weights need not sum to 1 — they're scaled).
const WEIGHTS = {
  scenario1: 1.0,
  // scenario2Session: 0.5,
};

// --- build constant-arrival-rate executors from the weights -----------------
const totalWeight = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
function arrivalScenario(execName, weight) {
  const rate = Math.max(1, Math.round((weight / totalWeight) * RATE));
  return {
    executor: 'constant-arrival-rate',
    exec: execName,
    rate, timeUnit: '1s',
    duration: DURATION,
    // Little's law: VUs needed = rate(/s) * iteration_duration(s). MEASURED 1-VU
    // iteration is ~39s (login ~25s + nav + dashboard + think time), NOT the
    // ~10-15s first guessed — so preAllocate rate*40. maxVUs adds headroom because
    // login/auth latency (and thus iteration duration) grows under load.
    preAllocatedVUs: Math.max(20, rate * 40),
    maxVUs: Math.max(100, rate * 80),
    tags: { scenario: execName },
  };
}

export const options = {
  discardResponseBodies: true,   // cap memory; parsed reads opt back in with responseType:'text'
  scenarios: {
    scenario1_mypage: arrivalScenario('scenario1', WEIGHTS.scenario1),
    // scenario2_xxx: arrivalScenario('scenario2Session', WEIGHTS.scenario2Session),
  },
  thresholds: defaultThresholds(),
};

// k6 resolves `exec` names against functions exported by the ENTRY module.
export { scenario1 };
// export { scenario2Session };

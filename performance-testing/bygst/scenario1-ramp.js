

/*
 * SCENARIO 1 — CAPACITY RAMP (open model, STEPPED arrival rate)
 *
 * Same flow as scenario1-login-mypage-logout.js (JOURNEY model: login per
 * iteration — REQUIRED for the My Page dashboard, which only loads widgets in a
 * fresh session), but driven by a STEPPED arrival rate to find the capacity knee
 * instead of a fixed smoke load. Load profile lives in rampOptions() in the lib.
 *
 * WHAT TO WATCH (validated 2026-06-17): the 1-VU baseline login is ~25s, of which
 * the credential POST (step_login_auth_duration) alone is ~22s. Authentication is
 * the dominant cost, so it's the metric most likely to break super-linearly under
 * load. Read step_login_auth_duration p95 stage-by-stage — the rate at which it
 * runs away (or business_errors climb) is your capacity ceiling.
 *
 * Re-point at any customer via config.json baseUrl (or -e BASE_URL). Credentials from
 * config.json, or data/users.csv (a DISTINCT account per VU = realistic concurrent
 * logins), or -e MM_USERNAME/MM_PASSWORD (NOT USERNAME — Windows OS-var collision).
 *
 *   # default ramp: peak 60 iters/min (1/s), 3m per stage  (~15 min total)
 *   k6 run scenario1-ramp.js
 *
 *   # gentler peak + longer holds + report under its own name
 *   k6 run -e PEAK_RATE=30 -e STEP_TIME=4m -e REPORT_PREFIX=ramp \
 *          scenario1-ramp.js
 *
 *   # re-pointed at another customer
 *   k6 run -e BASE_URL=https://<tenant>.mainmanager.is scenario1-ramp.js
 *
 * Tunables: PEAK_RATE (iters/min), STEP_TIME, ITER_EST_S (Little's-law sizing,
 * default 40s from the smoke), RAMP_HEADROOM (maxVUs multiplier). See rampOptions().
 */

import { rampOptions, handleSummary } from './lib/mainmanager.js';
import { scenario1 } from './scenario1-login-mypage-logout.js';

export const options = rampOptions('scenario1');   // stepped arrival rate, Little's-law VU pool
export { handleSummary };                           // auto-writes summary.html + summary.json
export { scenario1 };                               // k6 resolves exec:'scenario1' against THIS module

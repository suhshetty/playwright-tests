/*
 * ============================================================================
 * Shared MainManager helpers for K6 performance scenarios
 * ============================================================================
 *
 * Reusable building blocks shared by ALL scenarios:
 *     login()         - ASP.NET WebForms login (VIEWSTATE handling + cookie jar)
 *     openMyPage()    - select the "My page" module (Dashboard) from the nav menu
 *     openMyPageTab() - click the "My page" tab (reload Dashboard counter widgets)
 *     openModule()    - "click navigation -> open a GRID module and load its grid"
 *     logout()
 *
 * Ground truth (validated live 2026-06-16): the "My page" tab = a Dashboard
 * (BuildMyPage + ~18 InitPortalAggregate counters). The "My shortcuts" tab = a
 * Pictures grid (GetMMList, DataPath Picture$1$0) — that's the openModule() shape.
 *
 * Reusable across CUSTOMERS too: every tenant exposes the same endpoints, only
 * the host differs, so just override BASE_URL / USERNAME / PASSWORD via -e env vars.
 *
 * Each scenario file imports these, picks a module from MODULES (or supplies its
 * own descriptor), and only declares what is unique to it (load profile, the
 * specific sequence of steps).
 * ============================================================================
 */

import http from 'k6/http';
import { check, group } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { SharedArray } from 'k6/data';
import exec from 'k6/execution';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

// ---------------------------------------------------------------------------
// Config file — the ONE place to set per-customer values (host, credentials, the
// site/filter NAMES used by scenarios). Edit PerformanceTests/config.json (copy it
// from config.example.json). It's gitignored so real passwords aren't committed.
// Precedence for any value: -e ENV  >  config.json  >  built-in default. So you can
// keep everything in config.json and still override one value with -e for a one-off.
// ---------------------------------------------------------------------------
export const CONFIG = (function () {
  // k6 open() base path varies (CWD vs script dir), so try the likely locations.
  const candidates = ['../config.json', './config.json', 'config.json', 'PerformanceTests/config.json'];
  for (let i = 0; i < candidates.length; i++) {
    try { const t = open(candidates[i]); if (t) return JSON.parse(t); } catch (e) { /* try next */ }
  }
  return {};
})();

export const BASE_URL = __ENV.BASE_URL || CONFIG.baseUrl || 'https://kommune.mainmanager.is';
export const APP      = `${BASE_URL}/mmv2`;

// Credentials come from config.json (or -e MM_USERNAME / -e MM_PASSWORD to override),
// else the data/users.csv pool. NOTE: we deliberately use MM_USERNAME, NOT USERNAME —
// on Windows `USERNAME` is a built-in OS env var (your login name) that k6 inherits
// into __ENV and would silently shadow config.json.
export const USERNAME = __ENV.MM_USERNAME || CONFIG.username || 'suhsh';
export const PASSWORD = __ENV.MM_PASSWORD || CONFIG.password || '';

// "My page" dashboard tab id. 2147483643 = int.MaxValue-4 — a PRODUCT SENTINEL
// constant for "the My Page dashboard", confirmed in BuildMainMenu as the node's
// MainSummaryID (live 2026-06-17). Being a reserved constant it's expected to be
// the SAME on every tenant, so it does NOT need correlation; still -e overridable
// as a safety valve. Verify once on a new tenant (BuildMainMenu -> My page node).
export const MYPAGE_SUMMARY_ID = parseInt(__ENV.MYPAGE_SUMMARY_ID || '2147483643', 10);

// "Unfinished work orders on my organisation" My Page widget = saved snapshot id 4270
// (kommune; captured live 2026-06-17). Clicking a dashboard widget calls
// SelectSnapshotFromMyPage(<id>) then loads that snapshot's grid. Snapshot ids are
// per-tenant DATA (a user's saved snapshot), so override with -e WIDGET_SNAPSHOT_ID
// per environment (or parse it from the BuildMyPage widget list).
export const WIDGET_SNAPSHOT_ID = parseInt(__ENV.WIDGET_SNAPSHOT_ID || '4270', 10);

// ---------------------------------------------------------------------------
// User pool — each VU logs in as a DIFFERENT test account so multi-VU load is
// realistic (distinct sessions/data), not one user hammered by every VU.
// Reads data/users.csv (header: username,password). Falls back to a single env user.
// ---------------------------------------------------------------------------
// CSV pool only (multi-account load). The single-user override (env/config.json) is
// resolved in currentUser() — NOT here — because k6 caches a SharedArray's contents
// from an early init pass that doesn't reliably reflect CONFIG, which would shadow it.
export const USERS = new SharedArray('users', function () {
  try {
    const rows = papaparse.parse(open('../data/users.csv'), { header: true }).data
      .filter((r) => r && r.username);
    if (rows.length) return rows;
  } catch (e) { /* no CSV present */ }
  return [{ username: USERNAME, password: PASSWORD }];
});

// The account this VU should use. An explicit single user (-e MM_USERNAME, or
// config.json) wins and is resolved live per VU (so config.json reliably takes
// effect); otherwise spread VUs across the CSV pool. NOTE the MM_ prefix: on
// Windows, USERNAME is a built-in OS env var that k6 inherits and would shadow config.
export function currentUser() {
  const u = __ENV.MM_USERNAME || CONFIG.username;
  if (u) return { username: u, password: __ENV.MM_PASSWORD || CONFIG.password || '' };
  return USERS[(exec.vu.idInTest - 1) % USERS.length];
}

// ---------------------------------------------------------------------------
// Shared metrics (per-step latency + functional error rate)
// ---------------------------------------------------------------------------
export const loginTrend     = new Trend('step_login_duration', true);
// Login is two very different server costs; split them so a run shows WHICH one is
// slow. auth = the credential POST (authentication); render = the post-login
// MMV2Content.aspx GET (content-shell + last-active module render). On the dev env
// the ~25s login is dominated by one of these — these trends say which.
export const loginAuthTrend   = new Trend('step_login_auth_duration', true);
export const loginRenderTrend = new Trend('step_login_render_duration', true);
export const landingTrend   = new Trend('step_landing_duration', true);
export const navigateTrend  = new Trend('step_navigate_duration', true);
export const dashboardTrend = new Trend('step_mypage_tab_duration', true);
export const logoutTrend    = new Trend('step_logout_duration', true);
export const widgetTrend    = new Trend('step_widget_drilldown_duration', true); // dashboard widget -> grid
export const recordModalTrend = new Trend('step_open_record_duration', true);    // open a grid record -> modal popup
export const treeTrend      = new Trend('step_tree_load_duration', true);        // open a dual-tree view (e.g. org trees)
export const filterTrend    = new Trend('step_filter_duration', true);           // apply/clear a location or data filter (grid reload)
export const errorRate      = new Rate('business_errors');
// Counts calls to endpoints with KNOWN, reproducible server-side failures that a load
// script cannot drive headlessly (documented + excluded from the failure SLA so the
// report reflects the working system, not these). Surfaced in handleSummary.
//   * IsShortcut            -> HTTP 500 (server NullReferenceException, MainManager bug)
//   * RefreshMainManFilter  -> HTTP 400 (needs server-side filter session state)
//   * RefreshDataFilter     -> HTTP 400 (same)
//   * EmptyDataFilter       -> HTTP 400 (same)
// Verified live on bygst 2026-06-21 (browser-vs-k6 request diff: byte-identical requests
// succeed in a real browser, 400/500 from k6). These are NOT capacity findings.
export const knownServerErrors = new Counter('known_server_errors');

// Per-endpoint breakdown so the report shows ONLY the known issues that ACTUALLY
// fired this run (with real counts) instead of a hardcoded list. An endpoint that
// has been fixed on a tenant (e.g. IsShortcut on kommunerelease v20.25) records 0
// occurrences and is omitted from the table — no more phantom rows for fixed bugs.
// `status`/`nature` are descriptive; the row only renders when count > 0.
export const KNOWN_ISSUE_META = {
  IsShortcut:           { metric: 'known_issue_isshortcut',           endpoint: 'restapi/Internal/IsShortcut',         status: 500, nature: 'MainManager server bug — NullReferenceException in InternalController.IsShortcut. <b>Report to dev team.</b>' },
  RefreshMainManFilter: { metric: 'known_issue_refreshmainmanfilter', endpoint: 'MMLayout.asmx/RefreshMainManFilter', status: 400, nature: 'Location (Site) filter apply — server rejects the headless call (needs filter session state the browser establishes). Verified live: the byte-identical payload returns 200 in a real browser.' },
  RefreshDataFilter:    { metric: 'known_issue_refreshdatafilter',    endpoint: 'MMLayout.asmx/RefreshDataFilter',    status: 400, nature: 'Data (Municipality) filter apply — same root cause as RefreshMainManFilter.' },
  EmptyDataFilter:      { metric: 'known_issue_emptydatafilter',      endpoint: 'MMLayout.asmx/EmptyDataFilter',      status: 400, nature: 'Clear filter — same root cause.' },
};
const _knownIssueCounters = {};
Object.keys(KNOWN_ISSUE_META).forEach((k) => { _knownIssueCounters[k] = new Counter(KNOWN_ISSUE_META[k].metric); });

// OBSERVED-status counters (added 2026-08-11). The catalogue above records each issue's
// DOCUMENTED status, but under load this environment sheds requests with HTTP 503 on
// EVERY endpoint — so a 503 was being counted and then rendered as "500 — NullReference-
// Exception, report to dev team", which is wrong and alarming. These per-status counters
// let the report show what actually happened instead of what we expected.
const OBSERVED_STATUSES = [400, 500, 503];
const _knownIssueByStatus = {};
Object.keys(KNOWN_ISSUE_META).forEach((k) => {
  _knownIssueByStatus[k] = {};
  OBSERVED_STATUSES.forEach((s) => {
    _knownIssueByStatus[k][s] = new Counter(`${KNOWN_ISSUE_META[k].metric}_${s}`);
  });
  _knownIssueByStatus[k].other = new Counter(`${KNOWN_ISSUE_META[k].metric}_other`);
});

// ---------------------------------------------------------------------------
// Module catalogue for GRID modules (used by openModule, for scenarios 2-6).
// "My page" is a Dashboard, not a grid — it uses openMyPage/openMyPageTab instead.
//
// PORTABILITY: prefer discoverModule(process, step, data) (below) to resolve a
// module's tenant-specific ids from the LIVE menu at runtime — that's what lets
// one script run against any customer with no hand-captured numbers. This static
// map stays as a validated fallback/example (and for offline reference). The ids
// here are KOMMUNE-specific; on another tenant either use discoverModule or
// re-capture (see README "Per-customer capture").
// ---------------------------------------------------------------------------
export const MODULES = {
  // Validated live (2026-06-16): the Pictures grid under My page -> My shortcuts.
  // Equivalent to: discoverModule('MyPage', 'Shortcuts', 'Picture').
  Pictures: { processTag: 'MyPage', processStepTag: 'Shortcuts', dataTag: 'Picture', dataCaption: 'Picture', dataPath: 'Picture$1$0', menuItemId: 1261, menuItemType: 7 },
  // Validated live (2026-06-17): the Work order grid (Helpdesk > Request), reached by
  // drilling into the "Unfinished work orders on my organisation" My Page widget.
  // Equivalent to: discoverModule('Helpdesk', 'Request', 'Request').
  WorkOrders: { processTag: 'Helpdesk', processStepTag: 'Request', dataTag: 'Request', dataCaption: 'Work order', dataPath: 'Request$1$0', menuItemId: 1143, menuItemType: 1 },
  // Validated live on bygst (2026-06-17): the Incidents grid under Helpdesk >
  // Incidents overview > Incidents. menuItemId is bygst-specific — prefer
  // discoverModule('Helpdesk','Incidents','Incident') for other tenants.
  Incidents: { processTag: 'Helpdesk', processStepTag: 'Incidents', dataTag: 'Incident', dataCaption: 'Incident', dataPath: 'Incident$1$0', menuItemId: 142, menuItemType: 1, pageSize: 10 },
  // Validated live on bygst (2026-06-17): Building archive grids.
  // childKeys: the sub-entity tabs the record modal counts via GetChildCount (captured live).
  Sites:     { processTag: 'BuildingArchive', processStepTag: 'GroundRegistration',        dataTag: 'Ground',   dataCaption: 'Site',     dataPath: 'Ground$1$0',   menuItemId: 540, menuItemType: 1, pageSize: 10,
               childKeys: ['MainGroupData', 'RealProperty', 'Building', 'Picture', 'Document', 'Drawing', 'MainManDocument', 'Service', 'Task', 'Request', 'Incident', 'MaintenanceIncident'] },
  // mainManFilterTag: the DataTag the browser sends on RefreshMainManFilter for the top
  // Portfolio/Site bar. Captured live on bygst 2026-08-11: on the Buildings grid it is
  // 'Ground' (NOT the grid's own tag, and NOT the 'PropertyItem' the O&M Work-order grid
  // sends). Defaults to 'PropertyItem' when unset, preserving the scenario-6 capture.
  Buildings: { processTag: 'BuildingArchive', processStepTag: 'RegisterLocationStructure', dataTag: 'Building', dataCaption: 'Building', dataPath: 'Building$1$0', menuItemId: 8,   menuItemType: 1, pageSize: 10, mainManFilterTag: 'Ground',
               childKeys: ['BuildingFloor', 'BuildingSpace', 'Location', 'PropertyValuationBuilding', 'PropertyValuationBuildingOnBuilding', 'MainManDocument', 'Task', 'Incident', 'EnergySavingPotential'] },
  // Validated live on bygst (2026-06-17): the Work orders grid under Operation and
  // maintenance > Work orders overview > Work orders (work order = "Request").
  WorkOrdersOM: { processTag: 'OperationAndMaintenance', processStepTag: 'Requests', dataTag: 'Request', dataCaption: 'Work order', dataPath: 'Request$1$0', menuItemId: 131, menuItemType: 1, pageSize: 10 },
  // Validated live on bygst (2026-06-17): the dual-tree "Build organisation trees"
  // view under Human resources > Organisations overview. It loads TWO jstrees
  // (left = orgs/companies, right = persons) via restapi/Graphical/Tree — use
  // openTree(), not openModule(). menuItemId is bygst-specific.
  OrganisationTree: { processTag: 'HumanResources', processStepTag: 'Organisation', dataTag: 'OrganisationTree', dataCaption: 'Build organisation tree', dataPath: 'OrganisationTree$1$0', menuItemId: 686, menuItemType: 1, leftTreeId: 'MMLeftTree-OrganisationTree', rightTreeId: 'MMRightTree-BuildPersonTree' },
  // Captured top-level process tags (2026-06-17): MyPage, BuildingArchive,
  // HumanResources, DocumentManagement, SpaceManagement, AssetManagement,
  // PropertyManagement, FinanceManagement, ConditionAssessment, ProjectManagement,
  // DigitalDelivery, OperationAndMaintenance, Helpdesk, CleaningManagement,
  // EnergyManagement, FireSafetyManagement, EnvironmentalManagement,
  // HealthAndSafetyManagement, UniversalDesign, CulturalValueManagement,
  // AccessManagement, SystemConfiguration. Drill into steps/grids via discoverModule.
};

// ---------------------------------------------------------------------------
// Thresholds = the SLA the run is judged against. These are TARGETS, not a
// description of the current (slow dev) environment — set them to what's
// acceptable and let the run show whether the system meets them. Every value is
// env-overridable so each customer/engagement plugs in its own agreed SLA with
// no code change (e.g. -e SLA_MYPAGE_P95=3000).
//
// Defaults are reasonable web-app targets. NOTE: the shared dev env currently
// BREACHES the login target (~22s vs 10s) — that's a real finding, not a test bug.
// ---------------------------------------------------------------------------
function p95(envKey, defMs) { return [`p(95)<${parseInt(__ENV[envKey] || defMs, 10)}`]; }

export function defaultThresholds() {
  const maxFail = parseFloat(__ENV.MAX_FAIL_RATE || '0.01');
  return {
    http_req_failed:          [`rate<${maxFail}`],
    business_errors:          [`rate<${maxFail}`],
    http_req_duration:        p95('SLA_HTTP_P95',    3000),
    step_login_duration:      p95('SLA_LOGIN_P95',  10000), // auth is heavier; generous target
    step_landing_duration:    p95('SLA_LANDING_P95', 5000),
    step_navigate_duration:   p95('SLA_NAV_P95',     5000),
    step_mypage_tab_duration: p95('SLA_MYPAGE_P95',  5000),
    step_widget_drilldown_duration: p95('SLA_WIDGET_P95', 5000), // widget -> Work order grid
    step_open_record_duration: p95('SLA_RECORD_P95',  5000), // open a record -> modal popup
    step_tree_load_duration:  p95('SLA_TREE_P95',     5000), // dual-tree view load
    step_filter_duration:     p95('SLA_FILTER_P95',   5000), // location/data filter apply or clear
    step_logout_duration:     p95('SLA_LOGOUT_P95',  2000),
  };
}

// Default load profile: flat run when -e VUS is set, otherwise a staged ramp.
export function defaultOptions(extraThresholds = {}) {
  const thresholds = Object.assign(defaultThresholds(), extraThresholds);
  // discardResponseBodies caps memory at high VU (GetMMList bodies are large). We
  // opt back in with responseType:'text' only on the 2 responses we parse.
  // DEBUG keeps bodies so tap() can log the server's actual error text on a failure.
  const base = { discardResponseBodies: __ENV.DEBUG === 'true' ? false : true, thresholds };
  return __ENV.VUS
    ? Object.assign(base, { vus: parseInt(__ENV.VUS, 10), duration: __ENV.DURATION || '1m' })
    : Object.assign(base, {
        stages: [
          { duration: '30s', target: 5 },
          { duration: '1m',  target: 5 },
          { duration: '1m',  target: 15 },
          { duration: '30s', target: 0 },
        ],
      });
}

// ===========================================================================
// CAPACITY RAMP (open model, STEPPED arrival rate) — find the knee
//   Steps the arrival rate up in stages so you see the latency/error CURVE, not
//   just a single pass/fail. Uses ramping-arrival-rate: throughput is held per
//   stage regardless of response time (a closed VU model would just back off and
//   hide the problem). The VU pool is sized by Little's law from the MEASURED
//   iteration duration, so the generator never starves the target rate.
//
//   Measured 1-VU baseline (2026-06-17): iteration ~39s, login ~25s, of which the
//   credential POST (step_login_auth_duration) alone is ~22s. Authentication is
//   the dominant cost and the metric most likely to break super-linearly under
//   load — WATCH step_login_auth_duration p95 across stages; where it runs away
//   is your capacity ceiling.
//
//   Tunables (all -e overridable):
//     PEAK_RATE      iterations/MIN at the top stage          (default 60 = 1/s)
//     STEP_TIME      hold time per stage                       (default 3m)
//     ITER_EST_S     measured iteration seconds (Little's law) (default 40)
//     RAMP_HEADROOM  maxVUs multiplier over steady-state need  (default 3 — auth
//                    latency, hence iteration duration, GROWS under load)
//
//   Stages climb 1/12 -> 1/6 -> 1/4 -> 1/2 -> 1x PEAK_RATE. Rates are per MINUTE
//   (timeUnit 1m) so low steps stay integer (e.g. PEAK 60 -> 5,10,15,30,60 /min).
//   NOTE: the top stages WILL stress a shared dev box — run it inside an agreed
//   window with sign-off, and stop early once the knee is visible.
// ===========================================================================
export function rampOptions(execName, extraThresholds = {}) {
  const peak     = parseInt(__ENV.PEAK_RATE || '60', 10);   // iters/min at top
  const stepTime = __ENV.STEP_TIME || '3m';
  const iterEstS = parseInt(__ENV.ITER_EST_S || '40', 10);  // measured iteration secs
  const headroom = parseFloat(__ENV.RAMP_HEADROOM || '3');

  const frac = (f) => Math.max(1, Math.round(peak * f));     // iters/min at a fraction of peak
  const stages = [
    { target: frac(1 / 12), duration: stepTime },
    { target: frac(1 / 6),  duration: stepTime },
    { target: frac(1 / 4),  duration: stepTime },
    { target: frac(1 / 2),  duration: stepTime },
    { target: frac(1),      duration: stepTime },
    { target: 0,            duration: '30s' },               // ramp-down
  ];

  // Little's law: concurrency = arrival_rate(/s) * iteration_duration(s).
  // preAllocate the steady-state need at PEAK; maxVUs adds headroom because auth
  // latency (and thus iteration duration) grows as load rises.
  const peakPerSec = peak / 60;
  const steadyVUs  = Math.ceil(peakPerSec * iterEstS);

  // Safety on a SHARED env: self-abort the ramp once functional errors appear, so
  // we stop hammering a system that's already breaking AND the run terminates
  // cleanly AT the capacity ceiling. delayAbortEval skips the warm-up so a single
  // transient early error doesn't kill the run. -e ABORT_DELAY to tune.
  const maxFail = parseFloat(__ENV.MAX_FAIL_RATE || '0.01');
  const thresholds = Object.assign(defaultThresholds(), extraThresholds);
  thresholds.business_errors = [
    { threshold: `rate<${maxFail}`, abortOnFail: true, delayAbortEval: __ENV.ABORT_DELAY || '1m' },
  ];

  return {
    discardResponseBodies: true,
    scenarios: {
      capacity_ramp: {
        executor: 'ramping-arrival-rate',
        exec: execName,
        startRate: frac(1 / 12),
        timeUnit: '1m',
        stages,
        preAllocatedVUs: Math.max(20, steadyVUs),
        maxVUs: Math.max(50, Math.ceil(steadyVUs * headroom)),
        tags: { scenario: execName },
      },
    },
    thresholds,
  };
}

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------
export function ajaxJson() {
  return { headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': `${APP}/MMV2Content.aspx`,
  } };
}
export function ajaxForm() {
  return { headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': `${APP}/MMV2Content.aspx`,
  } };
}
// Bare GET headers — NO Content-Type, mirroring the real client (jQuery omits
// Content-Type on a body-less GET). NOTE: this does NOT fix the IsShortcut 500 — that
// is a server-side NullReferenceException in MainmanagerWeb.InternalController.IsShortcut
// triggered by session state k6 can't reproduce headlessly (browser-vs-k6 diff,
// bygst 2026-06-21). Kept only so k6 matches the real client byte-for-byte. See the
// KNOWN SERVER-SIDE ISSUES note in handleSummary. Use for body-less GETs.
export function ajaxGet() {
  return { headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': `${APP}/MMV2Content.aspx`,
  } };
}

// 32-char hex id — the client "UniqueString" tying a grid's header request to its data request.
export function uniqueString() {
  let s = '';
  for (let i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
  return s;
}

function extractField(html, name) {
  const m = new RegExp(`id="${name}"[^>]*value="([^"]*)"`).exec(html);
  return m ? m[1] : '';
}

// ajaxJson() variant that keeps the response body (it's discarded globally) so we
// can parse + error-check it. Use only where the body is actually needed.
function ajaxJsonText() { return Object.assign({ responseType: 'text' }, ajaxJson()); }

// #7: MainManager .asmx/restapi endpoints can return HTTP 200 with a .NET error
// payload (status-only checks miss these). Flags common server-error signatures.
// Returns true when the body is discarded (can't inspect) — status is checked separately.
function bodyOk(res) {
  const b = res && res.body;
  if (!b || typeof b !== 'string') return true;
  return b.indexOf('"ExceptionType"') === -1
      && b.indexOf('"StackTrace"') === -1
      && b.indexOf('StackTraceString') === -1
      && b.indexOf('Server Error in') === -1;
}

// Thin http wrappers: when -e DEBUG=true, log any non-2xx/3xx response (method, url,
// status) so we can see exactly which call failed. Zero overhead when DEBUG is off.
const DEBUG = __ENV.DEBUG === 'true';
const SLOW_MS = parseInt(__ENV.SLOW_MS || '3000', 10);
function tap(res) {
  if (DEBUG) {
    if (res.status < 200 || res.status >= 400) {
      const body = (typeof res.body === 'string') ? res.body.replace(/\s+/g, ' ').slice(0, 300) : '';
      console.error(`[HTTP ${res.status}] ${res.request.method} ${res.request.url}${body ? ' :: ' + body : ''}`);
    } else if (res.timings.duration > SLOW_MS)
      console.error(`[SLOW ${Math.round(res.timings.duration)}ms] ${res.request.method} ${res.request.url}`);
  }
  return res;
}
function GET(url, params)        { return tap(http.get(url, params)); }
function POST(url, body, params) { return tap(http.post(url, body, params)); }

// --- KNOWN SERVER-SIDE ISSUES (Option A) -----------------------------------
// These endpoints fail server-side in a way k6 can't avoid (see knownServerErrors).
// A per-request responseCallback marks their known status code as "expected" so it does
// NOT inflate http_req_failed — the SLA then measures the operations that actually work.
// expected:true tag keeps them filterable. knownIssue() records the occurrence + logs it.
const EXPECT_OK_OR_500 = http.expectedStatuses({ min: 200, max: 399 }, 500); // IsShortcut
const EXPECT_OK_OR_400 = http.expectedStatuses({ min: 200, max: 399 }, 400); // filter mutations
function withExpected(params, cb) {
  return Object.assign({}, params, { responseCallback: cb, tags: Object.assign({ expected: 'true' }, (params && params.tags) || {}) });
}
function knownIssue(res, label) {
  if (res.status < 200 || res.status >= 400) {
    knownServerErrors.add(1, { endpoint: label, status: String(res.status) });
    if (_knownIssueCounters[label]) _knownIssueCounters[label].add(1);
    if (_knownIssueByStatus[label]) {
      const bucket = _knownIssueByStatus[label][res.status] || _knownIssueByStatus[label].other;
      bucket.add(1);
    }
    if (DEBUG) console.warn(`[KNOWN ISSUE] ${label} -> HTTP ${res.status} (documented; excluded from SLA)`);
  }
  return res;
}
function BATCH(reqs) {
  const rs = http.batch(reqs);
  if (DEBUG) rs.forEach((r) => {
    if (r.status < 200 || r.status >= 400) console.error(`[HTTP ${r.status}] ${r.request.method} ${r.request.url}`);
  });
  return rs;
}

// ===========================================================================
// REUSABLE STEP 1: LOGIN — ASP.NET WebForms (GET MMV2Login.aspx for VIEWSTATE ->
//   POST credentials -> follow redirect to MMV2Content.aspx). The auth POST and the
//   post-login content render are measured as separate trends.
// ===========================================================================
export function login(user) {
  user = user || currentUser();
  let success = false;
  group('1. Login', function () {
    const t0 = Date.now();

    const page = GET(`${APP}/MMV2Login.aspx`, { responseType: 'text' }); // need body for VIEWSTATE
    check(page, { 'login page 200': (r) => r.status === 200 });

    const viewstate = extractField(page.body, '__VIEWSTATE');
    const vsgen     = extractField(page.body, '__VIEWSTATEGENERATOR');
    const eventval  = extractField(page.body, '__EVENTVALIDATION');
    if (!viewstate || !user.password) { errorRate.add(1); loginTrend.add(Date.now() - t0); return; }

    const tAuth = Date.now();
    const res = POST(`${APP}/MMV2Login.aspx`, {
      '__EVENTTARGET': '', '__EVENTARGUMENT': '',
      '__VIEWSTATE': viewstate, '__VIEWSTATEGENERATOR': vsgen, '__EVENTVALIDATION': eventval,
      'lgnUserLogin$UserName': user.username,
      'lgnUserLogin$Password': user.password,
      'lgnUserLogin$Login': 'Login',
    }, { redirects: 0 });
    loginAuthTrend.add(Date.now() - tAuth);   // authentication cost alone

    let landing = res;
    if (res.status >= 300 && res.status < 400 && res.headers['Location']) {
      const loc = res.headers['Location'];
      const url = loc.indexOf('http') === 0 ? loc
                : loc.indexOf('/') === 0 ? `${BASE_URL}${loc}` : `${APP}/${loc}`;
      const tRender = Date.now();
      landing = GET(url);
      loginRenderTrend.add(Date.now() - tRender);   // post-login render cost alone
    }

    success = check(landing, {
      'logged in (on Content page)': (r) => r.url.includes('MMV2Content.aspx'),
      'login not bounced back': (r) => !r.url.includes('MMV2Login.aspx'),
    });
    if (!success) { errorRate.add(1); loginTrend.add(Date.now() - t0); return; }

    // Layout XHRs the SPA fires once the content shell loads.
    POST(`${APP}/services/MMLayoutReadOnly.asmx/BuildMainMenu`, '{}', ajaxJson());
    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetUnreadCount`, '{}', ajaxJson());

    errorRate.add(false);   // login succeeded — record the success so business_errors is a real rate
    loginTrend.add(Date.now() - t0);
  });
  return success;
}

// ===========================================================================
// POST-LOGIN LANDING LOAD
//   After login the app auto-loads the user's last-active module (a full grid
//   render) BEFORE any navigation. That module varies per user/session, so it's
//   config-driven: set LANDING_MODULE to a MODULES key (default: the validated
//   Pictures grid). Set LANDING_MODULE=none to skip it. Recorded as its own metric.
// ===========================================================================
const LANDING = (__ENV.LANDING_MODULE === 'none') ? null
              : (MODULES[__ENV.LANDING_MODULE || 'Pictures'] || null);
export function loadLandingModule() {
  if (!LANDING) return true;
  return openModule(LANDING, 'Landing (post-login module)', landingTrend);
}

// ===========================================================================
// AUTH ONCE PER VU
//   Logs in + loads the landing module ONCE per VU, then returns true on every
//   later iteration without re-authenticating. Login cost is paid per session,
//   not per action (valuable given the ~22s auth on this env).
//   `_sessionReady` is module-scoped => one copy PER VU in k6, exactly what we want.
//
//   USE FOR GRID-BASED SCENARIOS ONLY. The My Page dashboard (BuildMyPage) returns
//   an empty dashboard when reloaded later in a long-lived session, so dashboard
//   scenarios must use the JOURNEY model (login per iteration) instead. Grid loads
//   (GetMMList, fresh UniqueString each call) are repeatable and work fine here.
// ===========================================================================
let _sessionReady = false;
export function ensureSession() {
  if (_sessionReady) return true;
  if (!login()) return false;        // login() records its own step_login_duration
  loadLandingModule();               // records step_landing_duration
  _sessionReady = true;
  return true;
}

// ===========================================================================
// REUSABLE STEP 2: OPEN A GRID MODULE FROM THE NAVIGATION MENU (and load its grid)
//   Pass a descriptor from MODULES, e.g. openModule(MODULES.Pictures).
//   `groupName` lets a scenario label the step (defaults to the module name).
//   opts.snapshotId: drill in from a My Page widget (see scenario 1).
//   opts.keepList:  keep the GetMMList body and RETURN { ok, us, listText } instead
//                   of a boolean — so a scenario can read a record id from the grid
//                   (e.g. to then open a record modal). See scenario 5.
// ===========================================================================
export function openModule(mod, groupName, trend, opts) {
  opts = opts || {};
  let ok = false, us = '', listText = '';
  group(groupName || `Open ${mod.processTag}`, function () {
    const t0 = Date.now();
    us = uniqueString();
    const j = ajaxJson();

    // Drill-down from a My Page dashboard widget: tell the server which saved
    // snapshot was clicked BEFORE loading its grid (captured live 2026-06-17).
    if (opts.snapshotId) {
      POST(`${APP}/services/MMLayoutReadOnly.asmx/SelectSnapshotFromMyPage`,
        JSON.stringify({ SnapshotID: opts.snapshotId }), j);
    }

    // Menu resolution
    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetMenuItemSteps`,
      JSON.stringify({ Tag: mod.processTag }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems`,
      JSON.stringify({ Parent: mod.processTag, Tag: mod.processStepTag }), j);
    // Persist the ACTIVE navigation state. These are NOT incidental (the old comment
    // here claimed they were). Captured live on bygst 2026-08-11: the browser fires
    // exactly these three between GetMenuItemProcessItems and InitMainLayout, and they
    // are what tells the server which grid is active. RefreshMainManFilter /
    // RefreshDataFilter are SESSION-scoped — they apply to that active data state — so
    // without these the filter calls return 200 but filter nothing, and the grid
    // reloads unfiltered (silently, unless you assert on row counts via -e VERIFY).
    saveToggle('ActiveDataStateV2', 'ActiveNavigationItem', mod.processTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStep${mod.processTag}`, mod.processStepTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStepItem${mod.processTag}.${mod.processStepTag}`, mod.dataTag);

    // Layout init
    POST(`${APP}/services/MMLayout.asmx/InitMainLayout`, JSON.stringify({
      UniqueString: '', MenuItemKey: mod.dataTag, SummaryID: 0,
      MenuItemID: mod.menuItemId, MenuItemTypeID: mod.menuItemType,
      ProcessTag: mod.processTag, ProcessStepTag: mod.processStepTag, SnapshotID: 0,
    }), j);

    knownIssue(GET(`${APP}/restapi/Internal/IsShortcut?tag=${mod.dataTag}&menuitemid=${mod.menuItemId}`, withExpected(ajaxGet(), EXPECT_OK_OR_500)), 'IsShortcut');
    // BOTH filter controls, in the browser's order (captured live on bygst 2026-08-11):
    //   type '3' = the top MainManFilter bar (Portfolio/Site/Object dropdowns)
    //   type '2' = the right-hand data-filter panel (Municipality/City/...)
    // k6 previously loaded only type '2'. Without type '3' the MainManFilter is never
    // instantiated server-side for the active layout, so RefreshMainManFilter is
    // accepted (200) but binds to nothing and the grid reloads UNFILTERED. Proven by
    // replaying k6's exact RefreshMainManFilter payload inside a real browser session:
    // it worked there (3 -> 2549 rows), so the payload was never the problem.
    POST(`${APP}/services/MMLayoutReadOnly.asmx/LoadMMFilterControl`,
      JSON.stringify({ tag: mod.dataTag, type: '3' }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/LoadMMFilterControl`,
      JSON.stringify({ tag: mod.dataTag, type: '2' }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/BuildLayout`, buildLayoutBody(mod, us, opts.snapshotId), j);

    // Grid: headers, then data (the heaviest call)
    const headers = GET(
      `${APP}/restapi/List/GetMMListHeaders?DataPath=${encodeURIComponent(mod.dataPath)}` +
      `&UniqueString=${us}&Gantt=False&PopupSQLListIndex=0&_=${Date.now()}`, j);
    const listParams = (opts.keepList || VERIFY) ? Object.assign({ responseType: 'text' }, ajaxForm()) : ajaxForm();
    const list = POST(`${APP}/restapi/List/GetMMList`, getMMListBody(mod, us, opts.search), listParams);
    if (opts.keepList) listText = (typeof list.body === 'string') ? list.body : '';
    verifyRows(`openModule(${mod.dataTag})`, list);

    ok = check(null, {
      [`${mod.processTag} headers loaded`]: () => headers.status === 200,
      [`${mod.processTag} grid loaded`]:    () => list.status === 200,
    });
    errorRate.add(!ok);   // record EVERY op (success=false/failure=true) so the rate is a real fraction, not 0%-or-100%
    (trend || navigateTrend).add(Date.now() - t0);
  });
  return opts.keepList ? { ok: ok, us: us, listText: listText } : ok;
}

// ===========================================================================
// REUSABLE STEP: OPEN A GRID RECORD -> MODAL POPUP (LoadMMModalControl)
//   Models clicking a row's "open" button, which loads the record's detail form
//   in a modal. `id` is the record's primary key (parse it from a keepList grid
//   load, e.g. /Incident\$1\$(\d+)/). `us` is the grid's UniqueString.
//   Closing the modal is CLIENT-SIDE (no HTTP — validated live 2026-06-17), so a
//   scenario models "Close Window" as think time, not a request.
//   Captured live on bygst: POST MMLayout.asmx/LoadMMModalControl.
// ===========================================================================
export function openRecordModal(mod, id, us, groupName, trend) {
  let ok = false;
  group(groupName || `Open ${mod.dataTag} record`, function () {
    const t0 = Date.now();
    const datapath = `${mod.dataTag}$1$${id}`;
    const uniq = us || uniqueString();   // grid modals reuse the grid us; tree modals get a fresh one
    const built = POST(`${APP}/services/MMLayout.asmx/LoadMMModalControl`, JSON.stringify({
      tag: mod.dataTag, datapath: datapath, id: String(id), uniquestring: uniq,
      viewkey: 'UseDefaultViewKey', extraparameters: '', norestore: '', modal: '1',
      contenttype: '7', datatext: `Open ${mod.dataCaption || mod.dataTag}`,
      idselection: [], templateid: 0, savebuttonvalue: 0, editMode: 1, UserRoleID: 0, PopupSQLListIndex: 0,
    }), ajaxJsonText());
    // The three follow-up calls the real modal fires after LoadMMModalControl
    // (captured live on bygst 2026-08-11). k6 previously sent only LoadMMModalControl,
    // so record-opens were materially lighter than the UI. ChildKeys are per-module
    // (mod.childKeys); the graphical pair is fired for every record type.
    if (mod.childKeys && mod.childKeys.length) {
      POST(`${APP}/services/MMLayoutReadOnly.asmx/GetChildCount`, JSON.stringify({
        UniqueString: uniq, DataPath: datapath, ChildKeys: mod.childKeys,
      }), ajaxJson());
    }
    POST(`${APP}/services/MMLayoutReadOnly.asmx/BuildGraphicalModal`, JSON.stringify({
      selected: 'gis', UniqueString: uniq, DataPath: datapath,
      ActionKey: '', ContainerLocation: 1, SaveSelectedState: false,
    }), ajaxJson());
    GET(`${APP}/restapi/Graphical/GetLayerPoints?Tag=&UniqueString=&TypeID=1` +
        `&Key=${String(mod.dataTag).toLowerCase()}&MainID=0&AppUserName=&AppPassword=` +
        `&Districts=&CheckwordID=&CheckwordItems=&Grades=&OrganisationID=&EmployeeID=`, ajaxGet());

    if (VERIFY) {
      const b = (built && typeof built.body === 'string') ? built.body : '';
      console.log(`[VERIFY] vu=${__VU} iter=${__ITER} openRecordModal(${datapath}) status=${built && built.status} bodyLen=${b.length}`);
    }
    ok = check(built, {
      'modal loaded (200)': (r) => r.status === 200,
      'modal no server error': (r) => bodyOk(r),
    });
    errorRate.add(!ok);   // record EVERY op (success=false/failure=true) so the rate is a real fraction, not 0%-or-100%
    (trend || recordModalTrend).add(Date.now() - t0);
  });
  return ok;
}

// ===========================================================================
// VERIFICATION MODE (-e VERIFY=true) — inert unless the flag is set.
//   Makes the grid-reload inside each filter step keep its body so we can log the
//   real row counts, proving a filter actually CHANGED the result set rather than
//   just returning 200. Use for step-by-step scenario validation, never for load
//   runs (keeping bodies costs memory at high VU counts).
// ===========================================================================
export const VERIFY = !!__ENV.VERIFY;
function verifyListParams(base) {
  return VERIFY ? Object.assign({}, base, { responseType: 'text' }) : base;
}
function verifyRows(label, res) {
  if (!VERIFY) return;
  const b = (res && typeof res.body === 'string') ? res.body : '';
  const tot = (b.match(/"recordsTotal":(\d+)/) || [])[1];
  const flt = (b.match(/"recordsFiltered":(\d+)/) || [])[1];
  console.log(`[VERIFY] vu=${__VU} iter=${__ITER} ${label} status=${res && res.status} recordsTotal=${tot} recordsFiltered=${flt}`);
}

// ===========================================================================
// REUSABLE STEP: LOCATION FILTER (the "Portfolio / Site / Object" dropdowns)
//   Applies a location filter via RefreshMainManFilter (sets it server-side) then
//   reloads the grid. groundId = the Site/Ground id (0 = "Show all sites").
//   The select2 option-load (checksummed ComboboxData) is UI-only and skipped —
//   a load test applies the filter directly. Captured live on bygst 2026-06-17.
// ===========================================================================
export function applyLocationFilter(mod, groundId, us, groupName, trend) {
  let ok = false;
  group(groupName || `Location filter ${mod.dataTag}`, function () {
    const t0 = Date.now();
    // DataTag is MODULE-SPECIFIC, not a constant. Captured live on bygst 2026-08-11:
    // the Buildings grid sends 'Ground'; the O&M Work-order grid sends 'PropertyItem'.
    // Sending the wrong tag is accepted with a 200 but the filter is then NOT applied —
    // the grid reloads unfiltered, which is silently invisible unless you assert on the
    // row count (see -e VERIFY). Set mod.mainManFilterTag per module; default below
    // preserves the scenario-6 capture.
    // NOTE: the earlier "these calls always 400 from k6" comment was wrong on both
    // counts — they return 200 under the journey model, and they were never
    // byte-identical to the browser's (wrong DataTag, wrong GroundID). Kept behind
    // knownIssue()/EXPECT_OK_OR_400 so a genuine 400 is still tolerated, not hidden.
    knownIssue(POST(`${APP}/services/MMLayout.asmx/RefreshMainManFilter`, JSON.stringify({
      DataTag: mod.mainManFilterTag || 'PropertyItem',
      ControlIDChanged: 'MainManFilter_TFGroundID',
      Value: ['MainManFilter_TFMainGroupID#0', `MainManFilter_TFGroundID#${groundId}`, 'MainManFilter_TFMainID#0'],
    }), withExpected(ajaxJson(), EXPECT_OK_OR_400)), 'RefreshMainManFilter');
    const list = POST(`${APP}/restapi/List/GetMMList`, getMMListBody(mod, us), verifyListParams(ajaxForm()));
    verifyRows(`locationFilter(groundId=${groundId})`, list);
    ok = check(list, { [`${mod.dataTag} grid reloaded after location filter`]: (r) => r.status === 200 });
    errorRate.add(!ok);   // record EVERY op (success=false/failure=true) so the rate is a real fraction, not 0%-or-100%
    (trend || filterTrend).add(Date.now() - t0);
  });
  return ok;
}

// ===========================================================================
// RESOLVE A SITE (Ground) ID BY NAME — so scenarios filter by site NAME (from
//   config.json) instead of a hardcoded id. Loads the Sites (Ground) grid with a
//   server-side search for the name and returns the first matching Ground id.
//   Cached per VU (one lookup per name). Reproducible — uses the grid search, NOT
//   the checksum-protected filter ComboboxData. Returns null if not found.
// ===========================================================================
const _resolvedGroundIds = {};
export function resolveGroundId(name) {
  if (!name) return null;
  if (_resolvedGroundIds[name] !== undefined) return _resolvedGroundIds[name];
  let id = null;
  const r = openModule(MODULES.Sites, `Resolve site '${name}'`, navigateTrend, { keepList: true, search: name });
  if (r && r.ok) {
    const m = (r.listText || '').match(/Ground\$1\$(\d+)/);
    if (m) id = m[1];
  }
  _resolvedGroundIds[name] = id;
  return id;
}

// ===========================================================================
// RESOLVE A DATA-FILTER OPTION ID BY NAME (e.g. Municipality "Albertslund" -> 14)
//   so scenarios set a "Filter" panel dropdown by NAME (from config.json) instead
//   of a hardcoded id. These dropdowns load their options from the CHECKSUM-PROTECTED
//   restapi/List/ComboboxData endpoint — but the checksum is SERVER-ISSUED and
//   embedded in the LoadMMFilterControl HTML (in each select2's ajax `data:` block),
//   so it IS reproducible: parse the control's {DataPath, UniqueString, checksum}
//   from that HTML, then call ComboboxData with q=<name> (the server filters by name,
//   verified live — so any option resolves regardless of pagination).
//
//   This is also MORE realistic than skipping it: a real user opening the dropdown
//   triggers exactly this LoadMMFilterControl(+ComboboxData) pair.
//
//   `controlToken` = the field token inside the DataPath, e.g. 'MunicipalityID'
//   (the ComboboxData DataPath is `<dataTag>$1$0|<controlToken>$7$0`). `opts.type`
//   = the filter control type (default '2' = the data filter). Cached per VU.
//   Returns null if not found (caller can fall back to an -e id). Captured + verified
//   live on bygst 2026-06-18.
// ===========================================================================
const _resolvedFilterIds = {};
function reEscape(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
export function resolveDataFilterId(mod, controlToken, name, opts) {
  opts = opts || {};
  if (!name) return null;
  const ck = `${mod.dataTag}:${controlToken}:${name}`;
  if (_resolvedFilterIds[ck] !== undefined) return _resolvedFilterIds[ck];
  let id = null;
  group(opts.groupName || `Resolve ${controlToken} '${name}'`, function () {
    const t0 = Date.now();
    // 1) The data-filter control HTML embeds each dropdown's server-issued checksum.
    const fc = POST(`${APP}/services/MMLayoutReadOnly.asmx/LoadMMFilterControl`,
      JSON.stringify({ tag: mod.dataTag, type: opts.type || '2' }), ajaxJsonText());
    let html = '';
    try { html = fc.json('d') || ''; } catch (e) { html = (typeof fc.body === 'string') ? fc.body : ''; }

    // 2) Pull this control's select2 ajax config: DataPath, UniqueString, checksum
    //    (they appear in that order inside the block; p:/q: lines sit between us & checksum).
    const re = new RegExp("DataPath:\\s*'([^']*" + reEscape(controlToken) +
      "[^']*)'\\s*,\\s*UniqueString:\\s*'([^']*)'[\\s\\S]{0,240}?checksum:\\s*'([^']*)'");
    const mm = re.exec(html);
    if (!mm && DEBUG) {
      // The control token wasn't found in the filter HTML — dump the DataPath field
      // tokens that ARE present so we can see what this tenant calls the field.
      const tokens = (html.match(/DataPath:\s*'([^']+)'/g) || []).map((s) => s.replace(/DataPath:\s*'|'/g, ''));
      console.log(`[RESOLVE NO-TOKEN] '${controlToken}' not in filter HTML (len ${html.length}). DataPaths present: ${JSON.stringify(tokens)}`);
    }
    if (mm) {
      const dataPath = mm[1], us = mm[2], checksum = mm[3];
      // 3) Reproduce the dropdown's ComboboxData call, searching by name (q).
      const url = `${APP}/restapi/List/ComboboxData?DataPath=${encodeURIComponent(dataPath)}` +
        `&UniqueString=${us}&p=1&q=${encodeURIComponent(name)}&checksum=${encodeURIComponent(checksum)}`;
      const cb = GET(url, ajaxJsonText());
      try {
        const arr = cb.json('data') || [];
        const want = String(name).toLowerCase().trim();
        const hit = arr.find((o) => o && o.Name && o.Name.toLowerCase().trim() === want);
        if (hit) id = hit.ID;
        if (id === null && DEBUG) {
          const cand = arr.slice(0, 30).map((o) => o && o.Name).filter(Boolean);
          console.log(`[RESOLVE MISS] ${controlToken} '${name}' not in ${arr.length} candidates: ${JSON.stringify(cand)}`);
        }
      } catch (e) { if (DEBUG) console.log(`[RESOLVE ERR] ${controlToken} '${name}': ${e}`); }
    }
    check(null, { [`resolved ${controlToken} '${name}'`]: () => id !== null });
    errorRate.add(id === null);   // resolution failure = a business error; success recorded too
    (opts.trend || navigateTrend).add(Date.now() - t0);
  });
  _resolvedFilterIds[ck] = id;
  return id;
}

// ===========================================================================
// REUSABLE STEP: DATA FILTER (the "Filter" panel — Municipality, City, …)
//   applyDataFilter: RefreshDataFilter (set the data filter) + grid reload.
//   clearDataFilter: EmptyDataFilter + grid reload.
//   `values` is the full DataFilter_TF* array for that grid (grid-specific — the
//   scenario supplies it, with the chosen control set, e.g. ...MunicipalityID#14).
//   `controlIdChanged` = the control the user changed (e.g. DataFilter_TFMunicipalityID).
//   Captured live on bygst 2026-06-17.
// ===========================================================================
export function applyDataFilter(mod, controlIdChanged, values, us, groupName, trend) {
  let ok = false;
  group(groupName || `Data filter ${mod.dataTag}`, function () {
    const t0 = Date.now();
    knownIssue(POST(`${APP}/services/MMLayout.asmx/RefreshDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, ControlIDChanged: controlIdChanged, Value: values, TemplateID: 0,
    }), withExpected(ajaxJson(), EXPECT_OK_OR_400)), 'RefreshDataFilter');
    const list = POST(`${APP}/restapi/List/GetMMList`, getMMListBody(mod, us), verifyListParams(ajaxForm()));
    verifyRows(`dataFilter(${controlIdChanged})`, list);
    ok = check(list, { [`${mod.dataTag} grid reloaded after data filter`]: (r) => r.status === 200 });
    errorRate.add(!ok);   // record EVERY op (success=false/failure=true) so the rate is a real fraction, not 0%-or-100%
    (trend || filterTrend).add(Date.now() - t0);
  });
  return ok;
}

// Persist a UI setting/state via saveToggleValue (e.g. "Pin filter" -> FilterPinned).
// Captured live on bygst 2026-06-17: pinning the filter POSTs {MySection:'UserSettings',
// MyKey:'FilterPinned', Value:'1'}.
export function saveToggle(section, key, value) {
  return POST(`${APP}/services/MMLayoutReadOnly.asmx/saveToggleValue`,
    JSON.stringify({ MySection: section, MyKey: key, Value: String(value) }), ajaxJson());
}

export function clearDataFilter(mod, values, us, groupName, trend) {
  let ok = false;
  group(groupName || `Clear data filter ${mod.dataTag}`, function () {
    const t0 = Date.now();
    knownIssue(POST(`${APP}/services/MMLayout.asmx/EmptyDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, Value: values,
    }), withExpected(ajaxJson(), EXPECT_OK_OR_400)), 'EmptyDataFilter');
    const list = POST(`${APP}/restapi/List/GetMMList`, getMMListBody(mod, us), verifyListParams(ajaxForm()));
    verifyRows('clearDataFilter', list);
    ok = check(list, { [`${mod.dataTag} grid reloaded after filter clear`]: (r) => r.status === 200 });
    errorRate.add(!ok);   // record EVERY op (success=false/failure=true) so the rate is a real fraction, not 0%-or-100%
    (trend || filterTrend).add(Date.now() - t0);
  });
  return ok;
}

// ===========================================================================
// REUSABLE STEP: OPEN A DUAL-TREE VIEW (e.g. HR "Build organisation trees")
//   Same menu/layout resolution as openModule, but the data is loaded as TWO
//   jstrees via restapi/Graphical/Tree (left + right) instead of a grid.
//   Returns { ok, us, leftText, rightText } so a scenario can read a record id
//   from a tree node (each node's a_attr.serverid is the record's id — parse with
//   /"serverid":"(\d+)"/). Captured live on bygst 2026-06-17.
//   mod needs: processTag, processStepTag, dataTag, dataPath, menuItemId,
//   menuItemType, leftTreeId, rightTreeId (see MODULES.OrganisationTree).
// ===========================================================================
export function openTree(mod, groupName, trend) {
  let ok = false, us = '', leftText = '', rightText = '';
  group(groupName || `Open ${mod.dataTag} tree`, function () {
    const t0 = Date.now();
    us = uniqueString();
    const j = ajaxJson();

    // Menu + layout resolution (same as a grid module).
    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetMenuItemSteps`,
      JSON.stringify({ Tag: mod.processTag }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems`,
      JSON.stringify({ Parent: mod.processTag, Tag: mod.processStepTag }), j);
    POST(`${APP}/services/MMLayout.asmx/InitMainLayout`, JSON.stringify({
      UniqueString: '', MenuItemKey: mod.dataTag, SummaryID: 0,
      MenuItemID: mod.menuItemId, MenuItemTypeID: mod.menuItemType,
      ProcessTag: mod.processTag, ProcessStepTag: mod.processStepTag, SnapshotID: 0,
    }), j);
    knownIssue(GET(`${APP}/restapi/Internal/IsShortcut?tag=${mod.dataTag}&menuitemid=${mod.menuItemId}`, withExpected(ajaxGet(), EXPECT_OK_OR_500)), 'IsShortcut');
    POST(`${APP}/services/MMLayoutReadOnly.asmx/BuildLayout`, buildLayoutBody(mod, us), j);

    // The two trees (left + right). Kept as text so a scenario can read node ids.
    const tp = Object.assign({ responseType: 'text' }, ajaxJson());
    const dp = encodeURIComponent(mod.dataPath);
    const left = GET(
      `${APP}/restapi/Graphical/Tree?parent=%23&datapath=${dp}&uniquestring=${us}&child=false&treeid=${mod.leftTreeId}`, tp);
    const right = GET(
      `${APP}/restapi/Graphical/Tree?parent=%23&datapath=${dp}&uniquestring=${us}&child=true&treeid=${mod.rightTreeId}`, tp);
    leftText  = (typeof left.body === 'string')  ? left.body  : '';
    rightText = (typeof right.body === 'string') ? right.body : '';

    ok = check(null, {
      [`${mod.dataTag} left tree loaded`]:  () => left.status === 200,
      [`${mod.dataTag} right tree loaded`]: () => right.status === 200,
    });
    errorRate.add(!ok);   // record EVERY op (success=false/failure=true) so the rate is a real fraction, not 0%-or-100%
    (trend || treeTrend).add(Date.now() - t0);
  });
  return { ok: ok, us: us, leftText: leftText, rightText: rightText };
}

function buildLayoutBody(mod, us, snapshotId) {
  return JSON.stringify({
    MMMainLayoutContainer: {
      __type: 'Iceconsult.MainTools.MMMainLayoutContainer',
      GraphicalNavigation: { Visible: false, GISActive: false, BIMActive: false, SVGActive: false, BaseInfoActive: false, SupportsGraphical: true },
      DataSummary: { SummaryMenuItems: null, Active: true, SelectedSummaryKey: '', ListModeMenuItems: null, ActiveListModeKey: null, ActiveListViewNavigationKey: 1 },
      LocationFilter: { FilterMenuItems: null, Active: true, ReloadFilter: false, ActiveFilterKey: '' },
      DataFilter: { FilterMenuItems: null, Active: true, FilterEmpty: true, ActiveFilterKey: null, FilterSupportsMainMan: true },
      ActiveDataCaption: mod.dataCaption,
      ActiveDataTag: mod.dataTag,
      ActiveProcessStepTag: mod.processStepTag,
      ActiveProcessTag: mod.processTag,
      DataPath: mod.dataPath,
      UniqueString: us,
      ViewKey: 'UseDefaultViewKey',
      MenuItemType: mod.menuItemType,
      MainSummaryID: 0,
      MMMenuItemID: mod.menuItemId,
      ShowCalendar: false, ShowGantt: false, ShowCardLayout: false,
      FromSnapShot: !!snapshotId, ActiveSnapshotID: snapshotId || 0, ActiveSnapshotName: mod.snapshotName || '',
      ShowSnapshotButton: true, CustomMainModuleID: 0, ErrorMessage: null, FilterPinned: false,
    },
  });
}

// Grid page size MUST match what the real UI requests for that grid (it varies per
// module — captured live: Incidents=10, Work orders/Pictures=100). Using the wrong
// size mis-states the grid-load cost, so it's per-module (mod.pageSize) with a 100
// default and an -e GRID_PAGE global override.
function getMMListBody(mod, us, search) {
  const len = parseInt(__ENV.GRID_PAGE || mod.pageSize || 100, 10);
  return `draw=1&start=0&length=${len}&search%5Bvalue%5D=${encodeURIComponent(search || '')}&search%5Bregex%5D=false` +
         `&DataPath=${encodeURIComponent(mod.dataPath)}&UniqueString=${us}` +
         `&Gantt=False&PopupSQLListIndex=0&GroupBy=&ExtraParams=&IsSublist=False`;
}

// ===========================================================================
// MODULE DISCOVERY — resolve a grid descriptor from the LIVE menu, so the per-
//   tenant magic numbers (menuItemId, menuItemType) are NEVER hardcoded. This is
//   what makes one script work against any customer without hand-captured ids.
//
//   Response shapes confirmed live (2026-06-17), identical for both endpoints:
//     GetMenuItemSteps        {Tag:<process>}              -> d.Items[]  (the steps)
//     GetMenuItemProcessItems {Parent:<process>,Tag:<step>}-> d.Items[]  (the grids)
//   Each node carries: Key (=dataTag), ID (=menuItemId), Type (=menuItemType),
//   EnglishCaption/Caption. dataPath is NOT returned by the menu — it follows the
//   `<dataTag>$1$0` convention (validated for Pictures); override via opts.dataPath
//   if a capture proves a module differs (see README "Per-customer capture").
//
//   Usage (after login; results cached per VU, so it costs 2 menu calls ONCE):
//     const wo = discoverModule('OperationAndMaintenance', 'WorkOrders', 'WorkOrder');
//     if (wo) openModule(wo, 'Work Orders');
//   Identifiers match Key first, then EnglishCaption/Caption (case-insensitive),
//   so you can pass either the stable tag or the visible English label.
// ===========================================================================
const _menuCache = {};   // module-scoped => one cache PER VU (k6), exactly right

function menuItems(method, body) {
  const res = POST(`${APP}/services/MMLayoutReadOnly.asmx/${method}`, JSON.stringify(body), ajaxJsonText());
  try { const d = res.json('d'); return (d && d.Items) || []; } catch (e) { return []; }
}
function matchNode(items, id) {
  const want = String(id).toLowerCase();
  return items.find((it) =>
    (it.Key && it.Key.toLowerCase() === want) ||
    (it.EnglishCaption && it.EnglishCaption.toLowerCase() === want) ||
    (it.Caption && it.Caption.toLowerCase() === want)) || null;
}

export function discoverModule(processId, stepId, dataId, opts) {
  opts = opts || {};
  const ckStep = `steps:${processId}`;
  if (!_menuCache[ckStep]) _menuCache[ckStep] = menuItems('GetMenuItemSteps', { Tag: processId });
  const step = matchNode(_menuCache[ckStep], stepId);
  if (!step) { if (DEBUG) console.error(`[discoverModule] step '${stepId}' not under process '${processId}'`); return null; }

  const ckItems = `items:${processId}:${step.Key}`;
  if (!_menuCache[ckItems]) _menuCache[ckItems] = menuItems('GetMenuItemProcessItems', { Parent: processId, Tag: step.Key });
  const data = matchNode(_menuCache[ckItems], dataId);
  if (!data) { if (DEBUG) console.error(`[discoverModule] data '${dataId}' not under '${processId}/${step.Key}'`); return null; }

  return {
    processTag:     processId,
    processStepTag: step.Key,
    dataTag:        data.Key,
    dataCaption:    opts.dataCaption || data.EnglishCaption || data.Caption || data.Key,
    dataPath:       opts.dataPath || `${data.Key}$1$0`,   // `<dataTag>$1$0` convention; override if needed
    menuItemId:     data.ID,
    menuItemType:   data.Type,
  };
}

// ===========================================================================
// REUSABLE STEP: NAVIGATION MENU -> SELECT THE "MY PAGE" MODULE (Dashboard)
//   Models "click Navigation menu, then select My Page". The menu-open click
//   itself is CLIENT-SIDE (fires no HTTP — validated), so this is just the
//   module switch: GetMenuItemSteps -> InitMainLayout -> dashboard load.
//   Verified to be identical whether switching FROM another module (e.g. OMBudget)
//   or reloading when My Page is already active — InitMainLayout sets the new
//   module server-side regardless of the previous one.
// ===========================================================================
export function openMyPage(groupName) {
  let ok = false;
  group(groupName || 'Open My Page module', function () {
    const t0 = Date.now();
    const j = ajaxJson();

    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetMenuItemSteps`,
      JSON.stringify({ Tag: 'MyPage' }), j);

    // Persist the ACTIVE navigation state server-side. NOT incidental: BuildMyPage
    // only returns the dashboard widgets when MyPage / MainSummary-<id> is the
    // active nav item+step. Omitting these makes REPEAT navigations return an empty
    // dashboard (0 widgets) and IsShortcut 500. Bodies captured live 2026-06-16.
    const sum = `MainSummary-${MYPAGE_SUMMARY_ID}`;
    POST(`${APP}/services/MMLayoutReadOnly.asmx/saveToggleValue`,
      JSON.stringify({ MySection: 'ActiveDataStateV2', MyKey: 'ActiveNavigationItem', Value: 'MyPage' }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/saveToggleValue`,
      JSON.stringify({ MySection: 'ActiveDataStateV2', MyKey: 'ActiveNavigationStepMyPage', Value: sum }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/saveToggleValue`,
      JSON.stringify({ MySection: 'ActiveDataStateV2', MyKey: `ActiveNavigationStepItemMyPage.${sum}`, Value: sum }), j);

    POST(`${APP}/services/MMLayout.asmx/InitMainLayout`, JSON.stringify({
      UniqueString: '', MenuItemKey: sum, SummaryID: MYPAGE_SUMMARY_ID,
      MenuItemID: 0, MenuItemTypeID: 2, ProcessTag: 'MyPage',
      ProcessStepTag: sum, SnapshotID: 0,
    }), j);

    ok = loadMyPageDashboard();
    navigateTrend.add(Date.now() - t0);
  });
  return ok;
}

// ===========================================================================
// REUSABLE STEP: CLICK THE "MY PAGE" TAB
//   Reloads the dashboard counter widgets (no menu resolution).
// ===========================================================================
export function openMyPageTab(groupName) {
  let ok = false;
  group(groupName || 'My page tab', function () {
    const t0 = Date.now();
    ok = loadMyPageDashboard();
    dashboardTrend.add(Date.now() - t0);
  });
  return ok;
}

// Core dashboard load shared by both My Page steps:
//   IsShortcut -> BuildMyPage (returns the widget list as HTML) -> InitPortalAggregate per widget.
// Widget keys are PARSED from the BuildMyPage response, so this adapts to whatever
// dashboard the target customer has configured (stays reusable, no hardcoded keys).
function loadMyPageDashboard() {
  const j = ajaxJson();
  knownIssue(GET(`${APP}/restapi/Internal/IsShortcut?tag=DashboardHelper&menuitemid=0`, withExpected(ajaxGet(), EXPECT_OK_OR_500)), 'IsShortcut');

  const built = POST(`${APP}/services/MMLayoutReadOnly.asmx/BuildMyPage`,
    JSON.stringify({ MainSummaryID: MYPAGE_SUMMARY_ID, FilterValues: '' }), ajaxJsonText());
  let ok = check(built, {
    'BuildMyPage 200': (r) => r.status === 200,
    'BuildMyPage no server error': (r) => bodyOk(r),   // #7: catch 200-with-error-payload
  });

  // Each widget renders a script call: initPortalAggregate('PortalAggregateInfoXXXX', 'Snapshot-XXXX', 883, ...)
  const html = built.json('d') || '';
  const re = /initPortalAggregate\([^,]+,\s*'([^']+)'\s*,\s*(\d+)/g;
  const widgets = [];
  let m;
  while ((m = re.exec(html)) !== null) widgets.push({ key: m[1], moduleId: parseInt(m[2], 10) });

  // Fetch each counter widget. A real browser fires these CONCURRENTLY, so we
  // batch them (parallel) rather than looping serially — both more realistic and
  // the correct concurrent server load for a dashboard fan-out.
  ok = check(widgets, { 'dashboard has widgets': (w) => w.length > 0 }) && ok;
  if (widgets.length) {
    const reqs = widgets.map((w) => ({
      method: 'POST',
      url: `${APP}/services/MMLayoutReadonly.asmx/InitPortalAggregate`,
      body: JSON.stringify({ PortalKey: w.key, MainModuleID: w.moduleId, ExcludeLocation: false }),
      params: j,
    }));
    const responses = BATCH(reqs);
    const allOk = responses.every((r) => r.status === 200);
    ok = check(null, { 'all dashboard widgets loaded (200)': () => allOk }) && ok;
  }

  errorRate.add(!ok);   // record EVERY op (success=false/failure=true) so the rate is a real fraction
  return ok;
}

// ===========================================================================
// REUSABLE STEP: LOGOUT
// ===========================================================================
export function logout() {
  let ok = false;
  group('Logout', function () {
    const t0 = Date.now();
    const res = GET(`${APP}/MMV2Logout.aspx`);
    ok = check(res, { 'logged out (back on login)': (r) => r.url.includes('MMV2Login.aspx') || r.status === 200 });
    errorRate.add(!ok);   // record EVERY op (success=false/failure=true) so the rate is a real fraction, not 0%-or-100%
    logoutTrend.add(Date.now() - t0);
  });
  return ok;
}

// ===========================================================================
// REPORTING — handleSummary() auto-writes a JSON + a self-contained HTML report
//   at the end of every run (re-export it from each entry script). Paths are
//   under PerformanceTests/ (gitignored). Override the name with -e REPORT_PREFIX.
// ===========================================================================
const REPORT_PREFIX = __ENV.REPORT_PREFIX || 'PerformanceTests/summary';

// Local run timestamp, e.g. 20260621-211530, for unique per-run report filenames.
function reportStamp() {
  const d = new Date();
  const z = (n) => (n < 10 ? '0' + n : '' + n);
  return '' + d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) +
         '-' + z(d.getHours()) + z(d.getMinutes()) + z(d.getSeconds());
}

// Writes a UNIQUE, timestamped report every run (never overwritten) so history is kept,
// PLUS a stable "<prefix>-latest.*" copy for convenience. Set -e REPORT_PREFIX to change
// the base path/name; set -e REPORT_TIMESTAMP=false to write only the stable name.
export function handleSummary(data) {
  const html = buildHtml(data);
  const json = JSON.stringify(data, null, 2);
  const out = { stdout: textSummary(data, { indent: ' ', enableColors: true }) };
  if (__ENV.REPORT_DIR) {
    // Per-run folder mode (-e REPORT_DIR=path/to/run-NNN_stamp): the folder name IS the
    // run identifier, so the files inside get clean, fixed names. The runner script
    // creates the folder and points the k6 dashboard export at the same place.
    const dir = __ENV.REPORT_DIR.replace(/[\/\\]+$/, '');
    out[`${dir}/summary.html`] = html;
    out[`${dir}/summary.json`] = json;
  } else if (__ENV.REPORT_TIMESTAMP === 'false') {
    out[`${REPORT_PREFIX}.html`] = html;
    out[`${REPORT_PREFIX}.json`] = json;
  } else {
    const ts = reportStamp();
    out[`${REPORT_PREFIX}-${ts}.html`] = html;   // archived — unique per run
    out[`${REPORT_PREFIX}-${ts}.json`] = json;
    out[`${REPORT_PREFIX}-latest.html`] = html;  // convenience pointer to the newest
    out[`${REPORT_PREFIX}-latest.json`] = json;
  }
  return out;
}

function fmt(v) {
  if (v === undefined || v === null) return '-';
  return v >= 1000 ? (v / 1000).toFixed(2) + ' s' : Math.round(v) + ' ms';
}
function collectChecks(grp, acc) {
  (grp.checks || []).forEach((c) => acc.push(c));
  (grp.groups || []).forEach((g) => collectChecks(g, acc));
  return acc;
}
function buildHtml(data) {
  const m = data.metrics || {};
  const checks = collectChecks(data.root_group || {}, []);
  const cPass = checks.reduce((a, c) => a + c.passes, 0);
  const cFail = checks.reduce((a, c) => a + c.fails, 0);

  // Thresholds (SLA pass/fail)
  const thr = [];
  Object.keys(m).forEach((n) => {
    const t = m[n].thresholds;
    if (t) Object.keys(t).forEach((cond) => thr.push({ n, cond, ok: t[cond].ok !== false }));
  });
  const thrRows = thr.map((r) =>
    `<tr><td>${r.n}</td><td>${r.cond}</td><td class="${r.ok ? 'pass' : 'fail'}">${r.ok ? 'PASS' : 'FAIL'}</td></tr>`).join('');

  // Per-step + key latency trends
  const trendNames = Object.keys(m).filter((n) => m[n].type === 'trend');
  const trendRows = trendNames.map((n) => {
    const v = m[n].values || {};
    return `<tr><td>${n}</td><td>${fmt(v.avg)}</td><td>${fmt(v.med)}</td><td>${fmt(v['p(95)'])}</td><td>${fmt(v.max)}</td></tr>`;
  }).join('');

  const reqs = (m.http_reqs && m.http_reqs.values) || {};
  const failRate = (m.http_req_failed && m.http_req_failed.values && m.http_req_failed.values.rate) || 0;
  const bizRate = (m.business_errors && m.business_errors.values && m.business_errors.values.rate) || 0;
  const knownCount = (m.known_server_errors && m.known_server_errors.values && m.known_server_errors.values.count) || 0;
  // Data-driven: only list endpoints that ACTUALLY fired this run. Endpoints in the
  // catalogue that recorded 0 occurrences (e.g. a fixed IsShortcut) are reported as
  // "not observed (clean)" instead of being shown as an active issue.
  const issueRows = [], cleanLabels = [];
  Object.keys(KNOWN_ISSUE_META).forEach((k) => {
    const meta = KNOWN_ISSUE_META[k];
    const cnt = (m[meta.metric] && m[meta.metric].values && m[meta.metric].values.count) || 0;
    if (cnt > 0) {
      // Render the OBSERVED status codes, not the catalogue's documented one. If the
      // documented status never actually occurred, suppress the catalogue's diagnosis
      // (it describes a different failure) and say so plainly.
      const seen = [];
      OBSERVED_STATUSES.concat(['other']).forEach((s) => {
        const c = (m[`${meta.metric}_${s}`] && m[`${meta.metric}_${s}`].values.count) || 0;
        if (c > 0) seen.push({ status: s, count: c });
      });
      const statusCell = seen.length
        ? seen.map((s) => `${s.status} &times;${s.count}`).join('<br>')
        : `<span style="color:#888">not recorded</span>`;
      const sawDocumented = seen.some((s) => String(s.status) === String(meta.status));
      // Only surface the documented diagnosis when the observed status actually matches
      // it. Otherwise state plainly what happened — no speculation, no stale verdict.
      let nature;
      if (!seen.length) {
        nature = `<span style="color:#888">Response codes were not captured for this run — cause unconfirmed.</span>`;
      } else if (!sawDocumented) {
        nature = seen.every((s) => String(s.status) === '503')
          ? `Service Unavailable — the environment rejecting requests under load. Seen across multiple endpoints this run.`
          : `Observed ${seen.map((s) => `HTTP ${s.status}`).join(' / ')}.`;
      } else {
        nature = meta.nature;
      }
      issueRows.push(`<tr><td>${meta.endpoint}</td><td class="fail">${statusCell}</td><td>${cnt}</td><td>${nature}</td></tr>`);
    } else {
      cleanLabels.push(meta.endpoint);
    }
  });
  const issueTable = issueRows.length
    ? `<table><tr><th>Endpoint</th><th>Status</th><th>Occurrences</th><th>Nature</th></tr>${issueRows.join('')}</table>`
    : `<p class="pass" style="font-size:13px">No server errors recorded this run.</p>`;
  const cleanNote = cleanLabels.length
    ? `<p style="font-size:12px;color:#15803d;margin:8px 0 0">Zero failures recorded this run on: ${cleanLabels.join(', ')}.</p>`
    : '';
  const knownSection = `
<h2>Server errors observed (excluded from the http-failed SLA)</h2>
<p style="font-size:12px;color:#515b72;margin:6px 0 10px">
 Endpoints that returned an error this run. These requests are held out of the <i>http failed</i> figure above so it
 reflects the operations that work — they are listed here so nothing is hidden. Counts and status codes are measured
 from this run. <b>Total: ${knownCount}.</b>
</p>
${issueTable}
${cleanNote}`;

  return `<!doctype html><html><head><meta charset="utf-8"><title>K6 Performance Report</title>
<style>
 body{font-family:Segoe UI,Arial,sans-serif;margin:24px;color:#222;background:#f7f8fb}
 h1{font-size:20px} h2{font-size:15px;margin-top:28px;color:#515b72}
 .cards{display:flex;gap:14px;flex-wrap:wrap;margin:14px 0}
 .card{background:#fff;border-radius:10px;padding:14px 18px;box-shadow:0 1px 4px rgba(0,0,0,.08);min-width:130px}
 .card .n{font-size:22px;font-weight:700} .card .l{color:#888;font-size:12px}
 table{border-collapse:collapse;width:100%;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.06)}
 th,td{padding:8px 12px;text-align:left;border-bottom:1px solid #eee;font-size:13px}
 th{background:#515b72;color:#fff}
 .pass{color:#15803d;font-weight:700} .fail{color:#b91c1c;font-weight:700}
</style></head><body>
<h1>K6 Performance Report</h1>
<div class="cards">
 <div class="card"><div class="n ${cFail === 0 ? 'pass' : 'fail'}">${cPass}/${cPass + cFail}</div><div class="l">checks passed</div></div>
 <div class="card"><div class="n">${reqs.count || 0}</div><div class="l">total requests</div></div>
 <div class="card"><div class="n ${failRate < 0.01 ? 'pass' : 'fail'}">${(failRate * 100).toFixed(2)}%</div><div class="l">http failed</div></div>
 <div class="card"><div class="n ${bizRate < 0.01 ? 'pass' : 'fail'}">${(bizRate * 100).toFixed(2)}%</div><div class="l">business errors</div></div>
 <div class="card"><div class="n">${knownCount}</div><div class="l">known server issues</div></div>
</div>
<h2>SLA thresholds</h2>
<table><tr><th>Metric</th><th>Condition</th><th>Result</th></tr>${thrRows || '<tr><td colspan=3>none</td></tr>'}</table>
${knownSection}
<h2>Latency by step</h2>
<table><tr><th>Step / metric</th><th>avg</th><th>median</th><th>p95</th><th>max</th></tr>${trendRows}</table>
<p style="color:#999;font-size:11px;margin-top:24px">Generated by lib/mainmanager.js handleSummary(). Thresholds are the agreed SLA, not a description of the test environment.</p>
</body></html>`;
}

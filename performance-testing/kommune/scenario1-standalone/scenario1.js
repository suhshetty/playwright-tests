/* ===========================================================================
 * KOMMUNE — SCENARIO 1
 * ===========================================================================
 * Manual test steps (Zephyr):
 *   1. Login    Enter your username and password, click Login
 *   2. My page  Select module My page
 *   3.          Click the "Unfinished work orders on my organisation"
 *   4.          Go back - select module My page
 *   5. Logout   Click logout
 *
 * Self-contained: this file needs nothing else in the repository.
 *
 *   bash run.sh
 *
 * ---------------------------------------------------------------------------
 * CAPTURED LIVE ON kommune.mainmanager.is (v20.26.1) — 13 Oct 2026
 * ---------------------------------------------------------------------------
 * Every endpoint, id and payload below was recorded in a real browser session by
 * hooking XMLHttpRequest and performing each step by hand, one at a time. Nothing
 * is guessed, and nothing was copied from another scenario without re-observing it.
 * capture/CAPTURE.md has the full request lists.
 *
 *   Step 1  44 requests (31 API). Login lands on MMV2Content.aspx, which then
 *           restores the account's LAST-ACTIVE module. See the note on that below.
 *   Step 2  25 requests, every one an API call, no static files:
 *             saveToggleValue -> GetMenuItemSteps{MyPage} -> saveToggleValue x3
 *             -> InitMainLayout{MainSummary-2147483643} -> BuildMyPage
 *             -> InitPortalAggregate x18  (CONCURRENT, one per dashboard widget)
 *   Step 3  14 requests. SelectSnapshotFromMyPage{4270} answers with the target:
 *             Caption "Work orders", Key "Request", Path "Helpdesk.Request.Request"
 *           then InitMainLayout{MenuItemID:1143} -> grid DataPath Request$1$0.
 *           GetMMList returned 469 rows / 588,707 bytes / 1,686 ms at 1 user.
 *   Step 4  25 requests — byte-identical to step 2.
 *   Step 5  Opening the user menu fires 0 requests (client-side).
 *           GET MMV2Logout.aspx -> 302 -> MMV2Login.aspx.
 *
 * ---------------------------------------------------------------------------
 * THINGS THAT LOOK WRONG BUT ARE DELIBERATE
 * ---------------------------------------------------------------------------
 * - The four saveToggleValue calls in steps 2/4 each return 8 bytes of {"d":null}.
 *   They are NOT filler: they tell the server which module/tab/sub-tab is active,
 *   and BuildMyPage returns an EMPTY dashboard on a repeat navigation without them.
 * - GetMenuItemProcessItems is sent TWICE in step 3, 70 ms apart. That is what the
 *   application does. We reproduce the application, we do not fix it.
 * - The dashboard widgets are sent with http.batch(), not a loop. The browser fires
 *   them concurrently; a serial loop would spread the database work over ~18s
 *   instead of hitting the server with it at once, which is the load we care about.
 * - The Checksum on InitPortalAggregate is SERVER-ISSUED and mandatory (HTTP 500
 *   without it). We parse it out of the BuildMyPage response rather than hardcoding,
 *   so this adapts to whatever dashboard the customer has configured.
 * - Login is repeated every iteration. k6 clears the VU cookie jar between
 *   iterations, so a login-once script sends later requests with NO session cookie
 *   and this server answers those 200 with empty data — silently.
 *
 * ---------------------------------------------------------------------------
 * KNOWN SIMPLIFICATION — stated so nobody discovers it later
 * ---------------------------------------------------------------------------
 * After login the app restores the module the account last viewed, which is a full
 * extra module load the script does NOT replay. We skip it because it depends on
 * what somebody last clicked, which would make runs non-reproducible. The effect:
 * this script UNDERSTATES the server cost of a login by about one module load.
 * =========================================================================== */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

/* ===========================================================================
 * 1. CONFIGURATION
 * ======================================================================== */

const BASE_URL = __ENV.BASE_URL || 'https://kommune.mainmanager.is';
const APP      = `${BASE_URL}/mmv2`;

// NOTE the MM_ prefix. On Windows, USERNAME is a built-in OS environment variable
// that k6 inherits into __ENV, and it would silently shadow whatever you pass.
const USERNAME = __ENV.MM_USERNAME || '';
const PASSWORD = __ENV.MM_PASSWORD || '';
if (!USERNAME || !PASSWORD) {
  throw new Error('Missing credentials. Pass -e MM_USERNAME=<user> -e MM_PASSWORD=<password>, ' +
                  'or run via run.sh which reads them from config.json.');
}

// "My page" dashboard id. 2147483643 = int.MaxValue - 4, a product sentinel meaning
// "the My Page dashboard". Same on every tenant so far, but confirm on a new one.
const MYPAGE_SUMMARY_ID = parseInt(__ENV.MYPAGE_SUMMARY_ID || '2147483643', 10);

// The "Unfinished work orders on my organisation" widget. Per-tenant DATA — this is
// somebody's saved view — so ALWAYS re-capture on a different environment.
const WIDGET_SNAPSHOT_ID = parseInt(__ENV.WIDGET_SNAPSHOT_ID || '4270', 10);

// The Work order grid the widget opens. Read off InitMainLayout in the browser.
// Note it lives under Helpdesk, not Operation and maintenance.
const WORKORDERS = {
  processTag:     'Helpdesk',
  processStepTag: 'Request',
  dataTag:        'Request',
  dataCaption:    'Work order',
  dataPath:       'Request$1$0',
  menuItemId:     parseInt(__ENV.MENUITEM_WORKORDERS || '1143', 10),
  menuItemType:   1,
  pageSize:       100,      // what the real UI asks for on this grid
};

// Gap between iterations, aligned across all scenarios so login rates stay comparable.
const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// -e VERIFY=true prints real row counts. For smoke tests only — keeping response
// bodies costs memory at high VU counts.
const VERIFY = !!__ENV.VERIFY;

/* ===========================================================================
 * 2. LOAD PROFILE AND SLA
 *    -e VUS=n  -> flat run.   No VUS -> the staged ramp below.
 * ======================================================================== */

function p95(envKey, defMs) { return [`p(95)<${parseInt(__ENV[envKey] || defMs, 10)}`]; }
const MAX_FAIL = parseFloat(__ENV.MAX_FAIL_RATE || '0.01');

const thresholds = {
  http_req_failed:       [`rate<${MAX_FAIL}`],
  business_errors:       [`rate<${MAX_FAIL}`],
  http_req_duration:     p95('SLA_HTTP_P95',   3000),
  step1_login:           p95('SLA_LOGIN_P95', 10000),   // auth is heavier; generous
  step2_mypage:          p95('SLA_MYPAGE_P95', 5000),
  step3_workorders:      p95('SLA_WIDGET_P95', 5000),
  step4_mypage_return:   p95('SLA_MYPAGE_P95', 5000),
  step5_logout:          p95('SLA_LOGOUT_P95', 2000),
};

export const options = __ENV.VUS
  ? {
      discardResponseBodies: true,
      thresholds,
      vus: parseInt(__ENV.VUS, 10),
      duration: __ENV.DURATION || '1m',
    }
  : {
      discardResponseBodies: true,
      thresholds,
      // Gradual on purpose: arriving at the target all at once distorts the login
      // measurement and can tip the environment into 503 load-shedding.
      stages: [
        { duration: '1m', target: parseInt(__ENV.TARGET_VUS || '25', 10) },
        { duration: '1m', target: parseInt(__ENV.TARGET_VUS || '25', 10) },
      ],
      gracefulRampDown: '30s',
    };

/* ===========================================================================
 * 3. METRICS — one per manual step, so a report says WHICH step is slow
 * ======================================================================== */

const step1 = new Trend('step1_login', true);
const step2 = new Trend('step2_mypage', true);
const step3 = new Trend('step3_workorders', true);
const step4 = new Trend('step4_mypage_return', true);
const step5 = new Trend('step5_logout', true);

// Login split into its two very different server costs, so a slow login says why.
const loginAuth   = new Trend('login_auth_only', true);     // the credential POST
const loginRender = new Trend('login_render_only', true);   // the post-login page

const errorRate = new Rate('business_errors');

/* ===========================================================================
 * 4. HELPERS
 * ======================================================================== */

const H_JSON = {
  'Content-Type':     'application/json; charset=UTF-8',
  'Accept':           'application/json, text/javascript, */*; q=0.01',
  'X-Requested-With': 'XMLHttpRequest',
  'Referer':          `${APP}/MMV2Content.aspx`,
};
const H_FORM = Object.assign({}, H_JSON, {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
});
// Body-less GETs send no Content-Type, mirroring jQuery.
const H_GET = {
  'Accept':           'application/json, text/javascript, */*; q=0.01',
  'X-Requested-With': 'XMLHttpRequest',
  'Referer':          `${APP}/MMV2Content.aspx`,
};

const json     = () => ({ headers: H_JSON });
const form     = () => ({ headers: H_FORM });
const getHdrs  = () => ({ headers: H_GET });
const jsonText = () => ({ headers: H_JSON, responseType: 'text' });  // keep the body

// -e DEBUG=true logs failures and slow calls. Free when off.
const DEBUG   = __ENV.DEBUG === 'true';
const SLOW_MS = parseInt(__ENV.SLOW_MS || '3000', 10);
function tap(res) {
  if (DEBUG) {
    if (res.status < 200 || res.status >= 400) {
      const b = (typeof res.body === 'string') ? res.body.replace(/\s+/g, ' ').slice(0, 300) : '';
      console.error(`[HTTP ${res.status}] ${res.request.method} ${res.request.url}${b ? ' :: ' + b : ''}`);
    } else if (res.timings.duration > SLOW_MS) {
      console.error(`[SLOW ${Math.round(res.timings.duration)}ms] ${res.request.method} ${res.request.url}`);
    }
  }
  return res;
}
const GET  = (url, p)    => tap(http.get(url, p));
const POST = (url, b, p) => tap(http.post(url, b, p));

const svc  = (name) => `${APP}/services/MMLayoutReadOnly.asmx/${name}`;
const svcW = (name) => `${APP}/services/MMLayout.asmx/${name}`;

// Captured live: {"MySection":"ActiveDataStateV2","MyKey":"...","Value":"..."}
function saveToggle(key, value) {
  return POST(svc('saveToggleValue'),
    JSON.stringify({ MySection: 'ActiveDataStateV2', MyKey: key, Value: String(value) }), json());
}

// Pull a hidden ASP.NET WebForms field out of the login page HTML.
function hiddenField(html, name) {
  const m = new RegExp(`id="${name}"[^>]*value="([^"]*)"`).exec(html);
  return m ? m[1] : '';
}

// .asmx endpoints can answer HTTP 200 carrying a .NET error payload. A status check
// alone misses those entirely.
function noServerError(res) {
  const b = res && res.body;
  if (!b || typeof b !== 'string') return true;
  return b.indexOf('"ExceptionType"') === -1
      && b.indexOf('"StackTrace"') === -1
      && b.indexOf('StackTraceString') === -1
      && b.indexOf('Server Error in') === -1;
}

function logRows(label, res) {
  if (!VERIFY) return;
  const b = (res && typeof res.body === 'string') ? res.body : '';
  const t = (b.match(/"recordsTotal":(\d+)/) || [])[1];
  const f = (b.match(/"recordsFiltered":(\d+)/) || [])[1];
  console.log(`[VERIFY] vu=${__VU} iter=${__ITER} ${label} status=${res && res.status} recordsTotal=${t} recordsFiltered=${f}`);
}

/* ===========================================================================
 * 5. STEP 1 — LOGIN
 *    "Enter your username and password, click Login"
 * ======================================================================== */

function stepLogin() {
  let ok = false;
  group('1. Login', function () {
    const t0 = Date.now();

    // The login page carries three hidden WebForms tokens we must echo back, so we
    // need its body — bodies are discarded globally.
    const page = GET(`${APP}/MMV2Login.aspx`, { responseType: 'text' });
    check(page, { 'login page 200': (r) => r.status === 200 });

    const viewstate = hiddenField(page.body, '__VIEWSTATE');
    if (!viewstate) { errorRate.add(1); step1.add(Date.now() - t0); return; }

    const tAuth = Date.now();
    const res = POST(`${APP}/MMV2Login.aspx`, {
      '__EVENTTARGET': '', '__EVENTARGUMENT': '',
      '__VIEWSTATE':          viewstate,
      '__VIEWSTATEGENERATOR': hiddenField(page.body, '__VIEWSTATEGENERATOR'),
      '__EVENTVALIDATION':    hiddenField(page.body, '__EVENTVALIDATION'),
      'lgnUserLogin$UserName': USERNAME,
      'lgnUserLogin$Password': PASSWORD,
      'lgnUserLogin$Login':    'Login',
    }, { redirects: 0 });        // follow it ourselves, to time the two halves apart
    loginAuth.add(Date.now() - tAuth);

    let landing = res;
    if (res.status >= 300 && res.status < 400 && res.headers['Location']) {
      const loc = res.headers['Location'];
      const url = loc.indexOf('http') === 0 ? loc
                : loc.indexOf('/') === 0    ? `${BASE_URL}${loc}`
                                            : `${APP}/${loc}`;
      const tRender = Date.now();
      landing = GET(url);
      loginRender.add(Date.now() - tRender);
    }

    // Verify by WHERE WE LANDED, not by status code: a rejected login re-renders the
    // login page and also returns 200, so a status check would score it a success.
    ok = check(landing, {
      'logged in (on Content page)': (r) => r.url.includes('MMV2Content.aspx'),
      'login not bounced back':      (r) => !r.url.includes('MMV2Login.aspx'),
    });
    if (!ok) { errorRate.add(1); step1.add(Date.now() - t0); return; }

    // The two shell calls the app fires once the content page loads.
    POST(svc('BuildMainMenu'),  '{}', json());
    POST(svc('GetUnreadCount'), '{}', json());

    errorRate.add(false);
    step1.add(Date.now() - t0);
  });
  return ok;
}

/* ===========================================================================
 * 6. STEPS 2 AND 4 — SELECT MODULE "MY PAGE"
 *    Captured identical both times: 25 calls, all API, no static files.
 * ======================================================================== */

function stepMyPage(label, trend) {
  let ok = false;
  group(label, function () {
    const t0  = Date.now();
    const sum = `MainSummary-${MYPAGE_SUMMARY_ID}`;

    // Exactly the order the browser sent them.
    saveToggle('ActiveNavigationItem', 'MyPage');
    POST(svc('GetMenuItemSteps'), JSON.stringify({ Tag: 'MyPage' }), json());
    saveToggle('ActiveNavigationItem', 'MyPage');
    saveToggle('ActiveNavigationStepMyPage', sum);
    saveToggle(`ActiveNavigationStepItemMyPage.${sum}`, sum);

    POST(svcW('InitMainLayout'), JSON.stringify({
      UniqueString: '', MenuItemKey: sum, SummaryID: MYPAGE_SUMMARY_ID,
      MenuItemID: 0, MenuItemTypeID: 2, ProcessTag: 'MyPage',
      ProcessStepTag: sum, SnapshotID: 0,
    }), json());

    ok = loadDashboard();
    trend.add(Date.now() - t0);
  });
  return ok;
}

// BuildMyPage returns the dashboard as HTML, with one initPortalAggregate(...) call
// per widget. We PARSE the widget keys and checksums out of it rather than
// hardcoding 18 of them, so this still works when the dashboard is reconfigured.
function loadDashboard() {
  const built = POST(svc('BuildMyPage'),
    JSON.stringify({ MainSummaryID: MYPAGE_SUMMARY_ID, FilterValues: '' }), jsonText());

  let ok = check(built, {
    'BuildMyPage 200':             (r) => r.status === 200,
    'BuildMyPage no server error': (r) => noServerError(r),
  });

  // Captured signature:
  //   initPortalAggregate('PortalAggregateInfo4390','Snapshot-4390',883,false,1,'lf6V...=')
  //                        container          key           moduleId excl steps checksum
  // The CHECKSUM is server-issued and mandatory — HTTP 500 without it.
  const html = built.json('d') || '';
  const re = /initPortalAggregate\(\s*'[^']*'\s*,\s*'([^']+)'\s*,\s*(\d+)\s*,\s*(true|false)\s*,\s*\d+\s*,\s*'([^']*)'/g;
  const widgets = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    widgets.push({ key: m[1], moduleId: parseInt(m[2], 10), exclude: m[3] === 'true', checksum: m[4] });
  }
  ok = check(widgets, { 'dashboard returned widgets': (w) => w.length > 0 }) && ok;

  if (widgets.length) {
    // CONCURRENT, like the browser. A serial loop would spread the same database
    // work over ~18 seconds and measure something the application never does.
    const responses = http.batch(widgets.map((w) => ({
      method: 'POST',
      url: `${APP}/services/MMLayoutReadonly.asmx/InitPortalAggregate`,
      body: JSON.stringify({
        PortalKey: w.key, MainModuleID: w.moduleId,
        ExcludeLocation: w.exclude, Checksum: w.checksum,
      }),
      params: json(),
    })));
    const allOk = responses.every((r) => r.status === 200);
    ok = check(null, { 'all dashboard widgets loaded': () => allOk }) && ok;
    if (VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} widgets=${widgets.length} allOk=${allOk}`);
  }

  errorRate.add(!ok);
  return ok;
}

/* ===========================================================================
 * 7. STEP 3 — CLICK "UNFINISHED WORK ORDERS ON MY ORGANISATION"
 *    14 calls. Opens Helpdesk > Work orders, scoped to snapshot 4270.
 * ======================================================================== */

function stepWorkOrders() {
  let rowId = null;
  group('3. Widget -> Work order grid', function () {
    const t0 = Date.now();
    const mod = WORKORDERS;

    // Tell the server which saved view was clicked BEFORE loading the grid. Skip
    // this and you load the unfiltered Work order grid — a different, heavier query.
    // Its reply names the target: Caption "Work orders", Path "Helpdesk.Request.Request".
    POST(svc('SelectSnapshotFromMyPage'), JSON.stringify({ SnapshotID: WIDGET_SNAPSHOT_ID }), json());

    saveToggle('ActiveNavigationItem', mod.processTag);
    POST(svc('GetMenuItemSteps'), JSON.stringify({ Tag: mod.processTag }), json());

    // Sent TWICE by the application, 70 ms apart. Reproduced as observed.
    const procBody = JSON.stringify({ Parent: mod.processTag, Tag: mod.processStepTag });
    POST(svc('GetMenuItemProcessItems'), procBody, json());
    POST(svc('GetMenuItemProcessItems'), procBody, json());

    saveToggle('ActiveNavigationItem', mod.processTag);
    saveToggle(`ActiveNavigationStep${mod.processTag}`, mod.processStepTag);
    saveToggle(`ActiveNavigationStepItem${mod.processTag}.${mod.processStepTag}`, mod.dataTag);

    // The server ISSUES the UniqueString here and the grid is keyed on it. Inventing
    // one is accepted (200) but the server holds no layout against it, so filters
    // bind to nothing and the grid silently reloads unfiltered. Read it back.
    const init = POST(svcW('InitMainLayout'), JSON.stringify({
      UniqueString: '', MenuItemKey: mod.dataTag, SummaryID: 0,
      MenuItemID: mod.menuItemId, MenuItemTypeID: mod.menuItemType,
      ProcessTag: mod.processTag, ProcessStepTag: mod.processStepTag, SnapshotID: 0,
    }), jsonText());

    const um = String(init.body || '').match(/"UniqueString"\s*:\s*"([0-9a-fA-F]{16,40})"/);
    const us = um ? um[1] : '';
    check(null, { 'server issued a UniqueString': () => us !== '' });

    // BOTH filter controls, in the browser's order. type 3 = the top Region/
    // Portfolio/Site bar, type 2 = the right-hand panel. Sending only one leaves the
    // other uninstantiated server-side.
    POST(svc('LoadMMFilterControl'), JSON.stringify({ tag: mod.dataTag, type: '3' }), json());
    POST(svc('LoadMMFilterControl'), JSON.stringify({ tag: mod.dataTag, type: '2' }), json());

    POST(svc('BuildLayout'), JSON.stringify({
      MMMainLayoutContainer: {
        __type: 'Iceconsult.MainTools.MMMainLayoutContainer',
        GraphicalNavigation: { Visible: false, GISActive: false, BIMActive: false, SVGActive: false, BaseInfoActive: false, SupportsGraphical: true },
        DataSummary:    { SummaryMenuItems: null, Active: true, SelectedSummaryKey: '', ListModeMenuItems: null, ActiveListModeKey: null, ActiveListViewNavigationKey: 1 },
        LocationFilter: { FilterMenuItems: null, Active: true, ReloadFilter: false, ActiveFilterKey: '' },
        DataFilter:     { FilterMenuItems: null, Active: true, FilterEmpty: true, ActiveFilterKey: null, FilterSupportsMainMan: true },
        ActiveDataCaption: mod.dataCaption, ActiveDataTag: mod.dataTag,
        ActiveProcessStepTag: mod.processStepTag, ActiveProcessTag: mod.processTag,
        DataPath: mod.dataPath, UniqueString: us, ViewKey: 'UseDefaultViewKey',
        MenuItemType: mod.menuItemType, MainSummaryID: 0, MMMenuItemID: mod.menuItemId,
        ShowCalendar: false, ShowGantt: false, ShowCardLayout: false,
        FromSnapShot: true, ActiveSnapshotID: WIDGET_SNAPSHOT_ID, ActiveSnapshotName: '',
        ShowSnapshotButton: true, CustomMainModuleID: 0, ErrorMessage: null, FilterPinned: false,
      },
    }), json());

    // tags.name collapses this into ONE metric series. Without it every request is
    // its own series (the URL carries a per-call UniqueString + cache-buster), which
    // can blow past k6's 100k series limit and make latency unreadable.
    const headers = GET(
      `${APP}/restapi/List/GetMMListHeaders?DataPath=${encodeURIComponent(mod.dataPath)}` +
      `&UniqueString=${us}&Gantt=False&PopupSQLListIndex=0&_=${Date.now()}`,
      Object.assign({}, getHdrs(), { tags: { name: 'restapi/List/GetMMListHeaders' } }));

    const list = POST(`${APP}/restapi/List/GetMMList`,
      `draw=1&start=0&length=${mod.pageSize}&search%5Bvalue%5D=&search%5Bregex%5D=false` +
      `&DataPath=${encodeURIComponent(mod.dataPath)}&UniqueString=${us}` +
      `&Gantt=False&PopupSQLListIndex=0&GroupBy=&ExtraParams=&IsSublist=False`,
      { headers: H_FORM, responseType: 'text' });

    logRows('work order grid', list);

    // Assert on CONTENT, not status. A 200 with an empty grid is the failure no
    // status check catches, and it is how broken scenarios pass for weeks.
    const idm = (list.body || '').match(new RegExp(mod.dataTag + '\\$1\\$(\\d+)'));
    rowId = idm ? idm[1] : null;

    const ok = check(null, {
      'work order headers loaded':     () => headers.status === 200,
      'work order grid loaded':        () => list.status === 200,
      'work order grid returned rows': () => rowId !== null,
    });
    errorRate.add(!ok);
    if (VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} firstWorkOrderRow=${rowId}`);
    step3.add(Date.now() - t0);
  });
  return rowId;
}

/* ===========================================================================
 * 8. STEP 5 — LOGOUT
 *    Opening the user menu is client-side (0 requests, verified).
 * ======================================================================== */

function stepLogout() {
  let ok = false;
  group('5. Logout', function () {
    const t0 = Date.now();
    const res = GET(`${APP}/MMV2Logout.aspx`);
    ok = check(res, {
      'logged out (back on login page)': (r) => r.url.includes('MMV2Login.aspx') || r.status === 200,
    });
    errorRate.add(!ok);
    step5.add(Date.now() - t0);
  });
  return ok;
}

/* ===========================================================================
 * 9. THE JOURNEY
 * ======================================================================== */

export default function () {
  // Step 1 — the 20-40s backoff is REQUIRED, not tidiness. A failed login ends the
  // iteration in a fraction of a second and k6 starts another immediately, so each
  // VU would retry several times a second and flood a struggling login endpoint into
  // collapse. That self-inflicted failure has reached 65-69% on another tenant.
  if (!stepLogin()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));   // think time

  // Step 2 — Select module My page
  stepMyPage('2. Select module My page', step2);
  sleep(randomIntBetween(1, 3));

  // Step 3 — Click "Unfinished work orders on my organisation"
  stepWorkOrders();
  sleep(randomIntBetween(1, 3));

  // Step 4 — Go back, select module My page
  stepMyPage('4. Go back -> My page', step4);
  sleep(randomIntBetween(1, 3));

  // Step 5 — Click logout
  stepLogout();
  sleep(ITER_DELAY);
}

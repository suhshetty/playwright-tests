/* ===========================================================================
 * SCENARIO 1 — STANDALONE / KT EDITION
 * ===========================================================================
 * Login -> My page -> "Unfinished work orders on my organisation" widget
 *       -> Work order grid -> back to My page -> Logout
 *
 * This ONE file needs no other file. Save it anywhere and run:
 *
 *   k6 run -e BASE_URL=https://kommune.mainmanager.is \
 *          -e MM_USERNAME=<your user> -e MM_PASSWORD=<your password> \
 *          -e VUS=1 -e DURATION=90s -e VERIFY=true \
 *          scenario1-standalone.js
 *
 * NEVER put the password in this file. It is passed with -e so the file stays
 * safe to paste into a document, a ticket or a chat.
 *
 * The production version of this scenario lives in the repository and shares
 * ~1,200 lines of helpers with five other scenarios:
 *     scenario1-mypage-kommune.js  +  lib/mainmanager.js
 * This file inlines only the parts Scenario 1 uses, so it can be read top to
 * bottom in one sitting. Use the repository version for real runs.
 *
 * Every endpoint, id and payload below was captured live in a browser on
 * kommune.mainmanager.is. Nothing here is guessed.
 * =========================================================================== */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

/* ---------------------------------------------------------------------------
 * 1. CONFIGURATION — everything tenant-specific, in one place
 * ------------------------------------------------------------------------ */

const BASE_URL = __ENV.BASE_URL || 'https://kommune.mainmanager.is';
const APP      = `${BASE_URL}/mmv2`;

// NOTE the MM_ prefix. On Windows, USERNAME is a built-in OS environment variable
// that k6 inherits into __ENV — using it would silently pick up your Windows login.
const USERNAME = __ENV.MM_USERNAME || '';
const PASSWORD = __ENV.MM_PASSWORD || '';

if (!USERNAME || !PASSWORD) {
  throw new Error('Pass -e MM_USERNAME=<user> -e MM_PASSWORD=<password>');
}

// The "My page" dashboard tab id. 2147483643 = int.MaxValue - 4, a product sentinel
// meaning "the My Page dashboard". Confirmed in BuildMainMenu. Expected to be the
// same on every tenant, but overridable as a safety valve.
const MYPAGE_SUMMARY_ID = parseInt(__ENV.MYPAGE_SUMMARY_ID || '2147483643', 10);

// The "Unfinished work orders on my organisation" widget = saved snapshot 4270.
// Snapshot ids are per-tenant DATA (somebody's saved view), so always re-capture
// on a new environment.
const WIDGET_SNAPSHOT_ID = parseInt(__ENV.WIDGET_SNAPSHOT_ID || '4270', 10);

// The Work order grid, reached by clicking that widget. Captured live:
// SelectSnapshotFromMyPage(4270) replies Path "Helpdesk.Request.Request",
// and InitMainLayout then carries MenuItemID 1143.
const WORKORDERS = {
  processTag:     'Helpdesk',
  processStepTag: 'Request',
  dataTag:        'Request',
  dataCaption:    'Work order',
  dataPath:       'Request$1$0',
  menuItemId:     parseInt(__ENV.MENUITEM_WORKORDERS || '1143', 10),
  menuItemType:   1,
  pageSize:       100,         // what the real UI requests for this grid
};

// Fixed gap between iterations. Requested by a customer and kept on every scenario
// since, so login rates stay comparable across environments.
const ITER_DELAY = parseInt(__ENV.ITER_DELAY || '10', 10);

// -e VERIFY=true prints the real row counts so you can compare them against the
// browser. Use it for smoke tests, never for load runs (keeping bodies costs memory).
const VERIFY = !!__ENV.VERIFY;

/* ---------------------------------------------------------------------------
 * 2. LOAD PROFILE AND SLA
 *    -e VUS=n gives a flat run; without it, the staged ramp below.
 * ------------------------------------------------------------------------ */

function p95(envKey, defMs) { return [`p(95)<${parseInt(__ENV[envKey] || defMs, 10)}`]; }

const thresholds = {
  http_req_failed:                [`rate<${parseFloat(__ENV.MAX_FAIL_RATE || '0.01')}`],
  business_errors:                [`rate<${parseFloat(__ENV.MAX_FAIL_RATE || '0.01')}`],
  http_req_duration:              p95('SLA_HTTP_P95',    3000),
  step_login_duration:            p95('SLA_LOGIN_P95',  10000),
  step_navigate_duration:         p95('SLA_NAV_P95',     5000),
  step_mypage_tab_duration:       p95('SLA_MYPAGE_P95',  5000),
  step_widget_drilldown_duration: p95('SLA_WIDGET_P95',  5000),
  step_logout_duration:           p95('SLA_LOGOUT_P95',  2000),
};

export const options = __ENV.VUS
  ? {
      discardResponseBodies: true,
      thresholds: thresholds,
      vus: parseInt(__ENV.VUS, 10),
      duration: __ENV.DURATION || '1m',
    }
  : {
      discardResponseBodies: true,
      thresholds: thresholds,
      stages: [
        // Gradual on purpose: arriving at the target all at once distorts the login
        // measurement and can tip the environment into 503 load-shedding.
        { duration: '5m', target: 250 },
        { duration: '5m', target: 250 },
      ],
      gracefulRampDown: '30s',
    };

/* ---------------------------------------------------------------------------
 * 3. METRICS — one trend per step, so the report says WHICH part is slow
 * ------------------------------------------------------------------------ */

const loginTrend       = new Trend('step_login_duration', true);
const loginAuthTrend   = new Trend('step_login_auth_duration', true);    // the credential POST alone
const loginRenderTrend = new Trend('step_login_render_duration', true);  // the post-login page render alone
const navigateTrend    = new Trend('step_navigate_duration', true);
const dashboardTrend   = new Trend('step_mypage_tab_duration', true);
const widgetTrend      = new Trend('step_widget_drilldown_duration', true);
const logoutTrend      = new Trend('step_logout_duration', true);
const errorRate        = new Rate('business_errors');

/* ---------------------------------------------------------------------------
 * 4. LOW-LEVEL HELPERS
 * ------------------------------------------------------------------------ */

// Header sets, matching what the real client sends.
function ajaxJson() {
  return { headers: {
    'Content-Type':     'application/json; charset=UTF-8',
    'Accept':           'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer':          `${APP}/MMV2Content.aspx`,
  } };
}
function ajaxForm() {
  return { headers: {
    'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept':           'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer':          `${APP}/MMV2Content.aspx`,
  } };
}
// Bare GET headers — no Content-Type, mirroring jQuery on a body-less GET.
function ajaxGet() {
  return { headers: {
    'Accept':           'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer':          `${APP}/MMV2Content.aspx`,
  } };
}
// Keep the response body (they are discarded globally) where we need to parse it.
function ajaxJsonText() { return Object.assign({ responseType: 'text' }, ajaxJson()); }

// A 32-char hex id. Used ONLY as a fallback; see the UniqueString note in openModule.
function uniqueString() {
  let s = '';
  for (let i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
  return s;
}

// Pull a hidden ASP.NET WebForms field out of the login page HTML.
function extractField(html, name) {
  const m = new RegExp(`id="${name}"[^>]*value="([^"]*)"`).exec(html);
  return m ? m[1] : '';
}

// These endpoints can return HTTP 200 carrying a .NET error payload. A status-only
// check misses those completely, so look for the signatures.
function bodyOk(res) {
  const b = res && res.body;
  if (!b || typeof b !== 'string') return true;
  return b.indexOf('"ExceptionType"') === -1
      && b.indexOf('"StackTrace"') === -1
      && b.indexOf('StackTraceString') === -1
      && b.indexOf('Server Error in') === -1;
}

// -e DEBUG=true logs any non-2xx/3xx response. Zero overhead when off.
const DEBUG   = __ENV.DEBUG === 'true';
const SLOW_MS = parseInt(__ENV.SLOW_MS || '3000', 10);
function tap(res) {
  if (DEBUG) {
    if (res.status < 200 || res.status >= 400) {
      const body = (typeof res.body === 'string') ? res.body.replace(/\s+/g, ' ').slice(0, 300) : '';
      console.error(`[HTTP ${res.status}] ${res.request.method} ${res.request.url}${body ? ' :: ' + body : ''}`);
    } else if (res.timings.duration > SLOW_MS) {
      console.error(`[SLOW ${Math.round(res.timings.duration)}ms] ${res.request.method} ${res.request.url}`);
    }
  }
  return res;
}
function GET(url, params)        { return tap(http.get(url, params)); }
function POST(url, body, params) { return tap(http.post(url, body, params)); }

// Persist a bit of active-navigation state server-side. Looks trivial, is not —
// see the comment in openModule().
function saveToggle(section, key, value) {
  return POST(`${APP}/services/MMLayoutReadOnly.asmx/saveToggleValue`,
    JSON.stringify({ MySection: section, MyKey: key, Value: String(value) }), ajaxJson());
}

// Print the real row counts under -e VERIFY=true, so you can compare with the browser.
function verifyRows(label, res) {
  if (!VERIFY) return;
  const b   = (res && typeof res.body === 'string') ? res.body : '';
  const tot = (b.match(/"recordsTotal":(\d+)/) || [])[1];
  const flt = (b.match(/"recordsFiltered":(\d+)/) || [])[1];
  console.log(`[VERIFY] vu=${__VU} iter=${__ITER} ${label} status=${res && res.status} recordsTotal=${tot} recordsFiltered=${flt}`);
}

// The layout container the browser echoes back to BuildLayout. Captured live.
function buildLayoutBody(mod, us, snapshotId) {
  return JSON.stringify({
    MMMainLayoutContainer: {
      __type: 'Iceconsult.MainTools.MMMainLayoutContainer',
      GraphicalNavigation: { Visible: false, GISActive: false, BIMActive: false, SVGActive: false, BaseInfoActive: false, SupportsGraphical: true },
      DataSummary: { SummaryMenuItems: null, Active: true, SelectedSummaryKey: '', ListModeMenuItems: null, ActiveListModeKey: null, ActiveListViewNavigationKey: 1 },
      LocationFilter: { FilterMenuItems: null, Active: true, ReloadFilter: false, ActiveFilterKey: '' },
      DataFilter: { FilterMenuItems: null, Active: true, FilterEmpty: true, ActiveFilterKey: null, FilterSupportsMainMan: true },
      ActiveDataCaption:    mod.dataCaption,
      ActiveDataTag:        mod.dataTag,
      ActiveProcessStepTag: mod.processStepTag,
      ActiveProcessTag:     mod.processTag,
      DataPath:             mod.dataPath,
      UniqueString:         us,
      ViewKey:              'UseDefaultViewKey',
      MenuItemType:         mod.menuItemType,
      MainSummaryID:        0,
      MMMenuItemID:         mod.menuItemId,
      ShowCalendar: false, ShowGantt: false, ShowCardLayout: false,
      FromSnapShot: !!snapshotId, ActiveSnapshotID: snapshotId || 0, ActiveSnapshotName: '',
      ShowSnapshotButton: true, CustomMainModuleID: 0, ErrorMessage: null, FilterPinned: false,
    },
  });
}

// The DataTables form payload for the grid query. The page size MUST match what the
// real UI requests for that grid (it varies per module — Work orders is 100).
function getMMListBody(mod, us) {
  const len = parseInt(__ENV.GRID_PAGE || mod.pageSize || 100, 10);
  return `draw=1&start=0&length=${len}&search%5Bvalue%5D=&search%5Bregex%5D=false` +
         `&DataPath=${encodeURIComponent(mod.dataPath)}&UniqueString=${us}` +
         `&Gantt=False&PopupSQLListIndex=0&GroupBy=&ExtraParams=&IsSublist=False`;
}

/* ---------------------------------------------------------------------------
 * 5. STEP 1 — LOGIN
 * ------------------------------------------------------------------------ */

function login() {
  let success = false;
  group('1. Login', function () {
    const t0 = Date.now();

    // Need the body for the hidden WebForms fields, so opt back in to keeping it.
    const page = GET(`${APP}/MMV2Login.aspx`, { responseType: 'text' });
    check(page, { 'login page 200': (r) => r.status === 200 });

    const viewstate = extractField(page.body, '__VIEWSTATE');
    const vsgen     = extractField(page.body, '__VIEWSTATEGENERATOR');
    const eventval  = extractField(page.body, '__EVENTVALIDATION');
    if (!viewstate) { errorRate.add(1); loginTrend.add(Date.now() - t0); return; }

    const tAuth = Date.now();
    const res = POST(`${APP}/MMV2Login.aspx`, {
      '__EVENTTARGET': '', '__EVENTARGUMENT': '',
      '__VIEWSTATE': viewstate, '__VIEWSTATEGENERATOR': vsgen, '__EVENTVALIDATION': eventval,
      'lgnUserLogin$UserName': USERNAME,
      'lgnUserLogin$Password': PASSWORD,
      'lgnUserLogin$Login':    'Login',
    }, { redirects: 0 });          // follow the redirect ourselves, to time it separately
    loginAuthTrend.add(Date.now() - tAuth);

    let landing = res;
    if (res.status >= 300 && res.status < 400 && res.headers['Location']) {
      const loc = res.headers['Location'];
      const url = loc.indexOf('http') === 0 ? loc
                : loc.indexOf('/') === 0 ? `${BASE_URL}${loc}` : `${APP}/${loc}`;
      const tRender = Date.now();
      landing = GET(url);
      loginRenderTrend.add(Date.now() - tRender);
    }

    // Did it work? NOT by status code — a REJECTED login also returns 200, because
    // WebForms simply re-renders the login page. Assert on where we landed.
    success = check(landing, {
      'logged in (on Content page)': (r) => r.url.includes('MMV2Content.aspx'),
      'login not bounced back':      (r) => !r.url.includes('MMV2Login.aspx'),
    });
    if (!success) { errorRate.add(1); loginTrend.add(Date.now() - t0); return; }

    // The two shell calls the app fires once the content page loads.
    POST(`${APP}/services/MMLayoutReadOnly.asmx/BuildMainMenu`,  '{}', ajaxJson());
    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetUnreadCount`, '{}', ajaxJson());

    errorRate.add(false);
    loginTrend.add(Date.now() - t0);
  });
  return success;
}

/* ---------------------------------------------------------------------------
 * 6. STEPS 2 AND 5 — OPEN THE "MY PAGE" MODULE
 * ------------------------------------------------------------------------ */

function openMyPage(groupName) {
  let ok = false;
  group(groupName || 'Open My Page module', function () {
    const t0 = Date.now();
    const j  = ajaxJson();

    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetMenuItemSteps`,
      JSON.stringify({ Tag: 'MyPage' }), j);

    // Persist the ACTIVE navigation state server-side. NOT incidental: BuildMyPage
    // only returns the dashboard widgets when MyPage / MainSummary-<id> is the active
    // nav item + step. Omitting these makes REPEAT navigations return an empty
    // dashboard (0 widgets). Bodies captured live.
    const sum = `MainSummary-${MYPAGE_SUMMARY_ID}`;
    saveToggle('ActiveDataStateV2', 'ActiveNavigationItem', 'MyPage');
    saveToggle('ActiveDataStateV2', `ActiveNavigationStepMyPage`, sum);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStepItemMyPage.${sum}`, sum);

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

/* ---------------------------------------------------------------------------
 * 7. STEP 3 — CLICK THE "MY PAGE" TAB (reload the dashboard widgets)
 * ------------------------------------------------------------------------ */

function openMyPageTab(groupName) {
  let ok = false;
  group(groupName || 'My page tab', function () {
    const t0 = Date.now();
    ok = loadMyPageDashboard();
    dashboardTrend.add(Date.now() - t0);
  });
  return ok;
}

// The dashboard load shared by both My Page steps:
//   BuildMyPage (returns the widget list as HTML) -> InitPortalAggregate per widget.
// Widget keys are PARSED from the BuildMyPage response, so this adapts to whatever
// dashboard the customer has configured. No hardcoded widget keys.
function loadMyPageDashboard() {
  const j = ajaxJson();

  const built = POST(`${APP}/services/MMLayoutReadOnly.asmx/BuildMyPage`,
    JSON.stringify({ MainSummaryID: MYPAGE_SUMMARY_ID, FilterValues: '' }), ajaxJsonText());
  let ok = check(built, {
    'BuildMyPage 200':             (r) => r.status === 200,
    'BuildMyPage no server error': (r) => bodyOk(r),   // catch 200-with-error-payload
  });

  // Each widget renders a script call. Full signature, read off the live page:
  //   initPortalAggregate(containerid, portalkey, mainmoduleid, excludelocation,
  //                       countersteps, checksum)
  //   initPortalAggregate('PortalAggregateInfo4390','Snapshot-4390',883,false,1,'lf6V...=')
  //
  // The CHECKSUM is server-issued and MANDATORY: InitPortalAggregate answers HTTP 500
  // without it. An earlier version of this regex captured only args 2 and 3, so every
  // widget call failed and the dashboard load was measured as an error path for weeks.
  const html = built.json('d') || '';
  const re = /initPortalAggregate\(\s*'[^']*'\s*,\s*'([^']+)'\s*,\s*(\d+)\s*,\s*(true|false)\s*,\s*\d+\s*,\s*'([^']*)'/g;
  const widgets = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    widgets.push({ key: m[1], moduleId: parseInt(m[2], 10), exclude: m[3] === 'true', checksum: m[4] });
  }

  ok = check(widgets, { 'dashboard has widgets': (w) => w.length > 0 }) && ok;

  // A real browser fires these CONCURRENTLY, so batch them rather than looping
  // serially — both more realistic and the correct concurrent server load.
  if (widgets.length) {
    const reqs = widgets.map((w) => ({
      method: 'POST',
      url: `${APP}/services/MMLayoutReadonly.asmx/InitPortalAggregate`,
      body: JSON.stringify({
        PortalKey: w.key, MainModuleID: w.moduleId,
        ExcludeLocation: w.exclude, Checksum: w.checksum,
      }),
      params: j,
    }));
    const responses = http.batch(reqs);
    const allOk = responses.every((r) => r.status === 200);
    ok = check(null, { 'all dashboard widgets loaded (200)': () => allOk }) && ok;
    if (VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} dashboard widgets=${widgets.length} allOk=${allOk}`);
  }

  errorRate.add(!ok);
  return ok;
}

/* ---------------------------------------------------------------------------
 * 8. STEP 4 — CLICK THE WIDGET, LOAD THE WORK ORDER GRID
 * ------------------------------------------------------------------------ */

function openModule(mod, groupName, trend, opts) {
  opts = opts || {};
  let ok = false, us = '', listText = '';
  group(groupName || `Open ${mod.processTag}`, function () {
    const t0 = Date.now();
    us = uniqueString();
    const j = ajaxJson();

    // Drill-down from a My Page dashboard widget: tell the server which saved
    // snapshot was clicked BEFORE loading its grid. The response names the target
    // module — Caption "Work orders", Key "Request", Path "Helpdesk.Request.Request".
    if (opts.snapshotId) {
      POST(`${APP}/services/MMLayoutReadOnly.asmx/SelectSnapshotFromMyPage`,
        JSON.stringify({ SnapshotID: opts.snapshotId }), j);
    }

    // Menu resolution.
    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetMenuItemSteps`,
      JSON.stringify({ Tag: mod.processTag }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems`,
      JSON.stringify({ Parent: mod.processTag, Tag: mod.processStepTag }), j);

    // Persist the ACTIVE navigation state. These are NOT incidental. The browser
    // fires exactly these three between GetMenuItemProcessItems and InitMainLayout,
    // and they are what tells the server which grid is active. The filter endpoints
    // are SESSION-scoped — they apply to that active data state — so without these
    // a filter call returns 200 but filters nothing, and the grid reloads unfiltered.
    saveToggle('ActiveDataStateV2', 'ActiveNavigationItem', mod.processTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStep${mod.processTag}`, mod.processStepTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStepItem${mod.processTag}.${mod.processStepTag}`, mod.dataTag);

    // Layout init.
    //
    // The server ISSUES a UniqueString here and returns it in the response; the grid
    // and every filter call downstream are keyed on it. Inventing one locally is
    // accepted by the server (200) but it has no layout against it — so filters bind
    // to nothing and the grid always reloads UNFILTERED. Proven by sending both in the
    // same session: invented -> 2554 rows after filtering, server-issued -> 3 rows,
    // which is what the browser shows.
    const initRes = POST(`${APP}/services/MMLayout.asmx/InitMainLayout`, JSON.stringify({
      UniqueString: '', MenuItemKey: mod.dataTag, SummaryID: 0,
      MenuItemID: mod.menuItemId, MenuItemTypeID: mod.menuItemType,
      ProcessTag: mod.processTag, ProcessStepTag: mod.processStepTag, SnapshotID: 0,
    }), opts.serverUniqueString ? ajaxJsonText() : j);
    if (opts.serverUniqueString) {
      const mm = String(initRes.body || '').match(/"UniqueString"\s*:\s*"([0-9a-fA-F]{16,40})"/);
      if (mm) us = mm[1];
      else if (VERIFY) console.log(`[VERIFY] vu=${__VU} InitMainLayout(${mod.dataTag}) issued NO UniqueString`);
    }

    // BOTH filter controls, in the browser's order:
    //   type '3' = the top MainManFilter bar (Region/Portfolio/Site/Object)
    //   type '2' = the right-hand data-filter panel
    // Sending only type 2 leaves the top filter uninstantiated server-side, so
    // RefreshMainManFilter is accepted (200) but binds to nothing.
    POST(`${APP}/services/MMLayoutReadOnly.asmx/LoadMMFilterControl`,
      JSON.stringify({ tag: mod.dataTag, type: '3' }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/LoadMMFilterControl`,
      JSON.stringify({ tag: mod.dataTag, type: '2' }), j);
    POST(`${APP}/services/MMLayoutReadOnly.asmx/BuildLayout`,
      buildLayoutBody(mod, us, opts.snapshotId), j);

    // Grid: headers, then data (the heaviest call in the scenario).
    //
    // tags.name collapses this into ONE metric series. Without it every request is its
    // own series, because the URL carries a per-call UniqueString and a cache-buster —
    // which once pushed a run past k6's 100k time-series limit. k6 then warns about
    // memory and can start delaying its own requests, i.e. measuring the generator.
    const headers = GET(
      `${APP}/restapi/List/GetMMListHeaders?DataPath=${encodeURIComponent(mod.dataPath)}` +
      `&UniqueString=${us}&Gantt=False&PopupSQLListIndex=0&_=${Date.now()}`,
      Object.assign({}, ajaxGet(), { tags: { name: 'restapi/List/GetMMListHeaders' } }));

    const listParams = (opts.keepList || VERIFY)
      ? Object.assign({ responseType: 'text' }, ajaxForm())
      : ajaxForm();
    const list = POST(`${APP}/restapi/List/GetMMList`, getMMListBody(mod, us), listParams);
    if (opts.keepList) listText = (typeof list.body === 'string') ? list.body : '';
    verifyRows(`openModule(${mod.dataTag})`, list);

    ok = check(null, {
      [`${mod.processTag} headers loaded`]: () => headers.status === 200,
      [`${mod.processTag} grid loaded`]:    () => list.status === 200,
    });
    errorRate.add(!ok);
    (trend || navigateTrend).add(Date.now() - t0);
  });
  return opts.keepList ? { ok: ok, us: us, listText: listText } : ok;
}

/* ---------------------------------------------------------------------------
 * 9. STEP 6 — LOGOUT
 * ------------------------------------------------------------------------ */

function logout() {
  let ok = false;
  group('Logout', function () {
    const t0 = Date.now();
    const res = GET(`${APP}/MMV2Logout.aspx`);
    ok = check(res, {
      'logged out (back on login)': (r) => r.url.includes('MMV2Login.aspx') || r.status === 200,
    });
    errorRate.add(!ok);
    logoutTrend.add(Date.now() - t0);
  });
  return ok;
}

/* ---------------------------------------------------------------------------
 * 10. THE JOURNEY — the six manual test steps, in order
 * ------------------------------------------------------------------------ */

// Pull the first record id out of a grid response, to prove it returned real rows.
function firstId(listText, dataTag) {
  const m = (listText || '').match(new RegExp(dataTag + '\\$1\\$(\\d+)'));
  return m ? m[1] : null;
}

const OPTS = { keepList: true, serverUniqueString: true, snapshotId: WIDGET_SNAPSHOT_ID };

export default function () {
  // Step 1: LOGIN. The backoff is REQUIRED, not tidiness. A failed login ends the
  // iteration in a fraction of a second and k6 immediately starts another, so each VU
  // would retry several times per second and flood a struggling login endpoint into
  // collapse. On one tenant that produced a 65-69% failure rate that we caused ourselves.
  if (!login()) {
    sleep(randomIntBetween(20, 40));
    return;
  }
  sleep(randomIntBetween(1, 3));

  // Step 2: navigation menu -> My page. Opening the menu itself is client-side and
  // fires no HTTP (captured and confirmed), so this is just the module switch + load.
  openMyPage('2. Navigation -> My page module');
  sleep(randomIntBetween(1, 3));

  // Step 3: the My page tab — reloads the dashboard counter widgets.
  openMyPageTab('3. My page tab');
  sleep(randomIntBetween(1, 3));

  // Step 4: click "Unfinished work orders on my organisation".
  const wo = openModule(WORKORDERS,
    `4. Widget (snapshot ${WIDGET_SNAPSHOT_ID}) -> Work order grid`,
    widgetTrend, OPTS);

  // Assert the grid actually returned ROWS. Without this the step "passes" on an
  // empty grid, which is exactly how broken scenarios went unnoticed for weeks.
  const woId = firstId(wo.listText, 'Request');
  check(null, { 'Work order grid returned rows': () => woId !== null });
  if (VERIFY) console.log(`[VERIFY] vu=${__VU} iter=${__ITER} workOrderRow=${woId}`);
  sleep(randomIntBetween(1, 3));

  // Step 5: back to My page.
  openMyPage('5. Navigation -> My page module');
  sleep(randomIntBetween(1, 3));

  // Step 6: Logout, then the gap before the next login.
  logout();
  sleep(ITER_DELAY);
}

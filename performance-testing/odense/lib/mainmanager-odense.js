/*
 * ODENSE ADAPTER — https://fm.odense.dk  ("Odense kommune demo MainManager")
 *
 * Odense runs the SAME WebForms build as bygst/kommune (__VIEWSTATE, .aspx,
 * services/*.asmx), so lib/mainmanager.js does 95% of the work unchanged. This file
 * holds ONLY the two things Odense does differently, and re-exports the rest.
 *
 * lib/mainmanager.js IS NOT MODIFIED. That is deliberate: it is the file that produced
 * bygst runs 001-059, and keeping it byte-identical keeps that history comparable.
 *
 * ---------------------------------------------------------------------------
 * DIFFERENCE 1 — THE LOGIN. Captured live 2026-09-10.
 * ---------------------------------------------------------------------------
 * bygst posts lgnUserLogin$UserName / lgnUserLogin$Password to MMV2Login.aspx.
 * Those fields DO NOT EXIST on the Odense login page. Odense's visible form is
 * username2FA / password2FA behind a button whose onclick is `login2FA(this)`, and
 * that handler does:
 *
 *   1. POST /api/v1/GetTempCode   {"Username":..,"Password":..}
 *        -> { Success: true, Clipboard: "<short OTP>" }   + an HttpOnly auth cookie
 *   2. fill #OTP with Clipboard, then click #VerifyOTPBtn, which is an ordinary
 *      WebForms postback to MMV2Login.aspx carrying __VIEWSTATE + OTP.
 *
 * If Clipboard comes back EMPTY the page shows a manual OTP screen instead — that
 * account would be unautomatable. For the perf account the server returns the code, so
 * step 2 is scriptable. loginOdense() below reproduces exactly those two calls.
 *
 *   SECURITY NOTE, worth raising with the product team: the second factor is handed
 *   to an unauthenticated caller in the GetTempCode response body. Anyone holding the
 *   password gets the OTP for free, which removes the point of the second factor.
 *   Plausibly a demo-tenant convenience — confirm it is not the case on real tenants.
 *
 * ---------------------------------------------------------------------------
 * DIFFERENCE 2 — SITE LOOKUP NEEDS PREFIX MATCHING.
 * ---------------------------------------------------------------------------
 * Odense site names carry a numeric code: "1101 Rådhuset" (GroundID 381). The server
 * search is substring-based but breaks on the space:
 *     q="1101"          -> 1 hit    q="Rådhuset"  -> 1 hit
 *     q="1101 Rådhuset" -> NO DATA  q="Radhuset"  -> NO DATA (accent-sensitive)
 * mainmanager.js's resolveDataFilterId uses ONE string as both the query and the
 * exact-match target, so it cannot express this. resolveFilterIdPrefix() below sends
 * the short token as q and matches on a leading fragment — so SITE_NAME='1101' finds
 * '1101 Rådhuset'. Using the numeric token also keeps the scenario file pure ASCII,
 * avoiding the encoding damage we hit editing these files on Windows before.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS THE SAME (verified live, not assumed)
 *   Sites  = menu item 540 (Ground)     <- identical to bygst
 *   Builds = menu item 8   (Building)   <- identical to bygst
 *   RefreshMainManFilter body: DataTag 'Ground', MainGroupID/GroundID/MainID
 *                              -> exactly what applyLocationFilter already sends
 *   Filter payloads are JSON (WebForms style), record opens are openMyModal(...)
 * ---------------------------------------------------------------------------
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// How often a login bounced because another VU's GetTempCode superseded our code.
// At 1 VU this should be 0; anything above that is shared-account contention, not
// an application problem.
export const otpCollisions = new Counter('otp_code_collisions');

// Per-status counters for the two login calls. The adapter uses http.get/http.post
// directly rather than mainmanager.js's tap(), so its failures carry no DEBUG detail.
// Without this a bad login run only tells you "57% of login pages were not 200" and
// not WHY — 503 (overload / shedding) and 0 (connection refused / reset) mean very
// different things in a report.
const LOGIN_STATUSES = [0, 200, 302, 400, 401, 403, 429, 500, 502, 503, 504];
const loginPageStatus = {};
const tempCodeStatus = {};
LOGIN_STATUSES.forEach(function (s) {
  loginPageStatus[s] = new Counter(`login_page_status_${s}`);
  tempCodeStatus[s]  = new Counter(`gettempcode_status_${s}`);
});
function recordStatus(map, status) {
  (map[status] || map[0]).add(1);
}
import {
  APP, BASE_URL, errorRate, loginTrend, loginAuthTrend, loginRenderTrend,
  navigateTrend, filterTrend, ajaxJson, ajaxForm,
  // `export *` below re-exports these to consumers but does NOT bind them in this
  // module's own scope, so anything used INSIDE this file must be imported by name.
  openModule,
  handleSummary as baseHandleSummary,
} from './mainmanager.js';

// Everything not overridden here comes straight from the bygst library.
export * from './mainmanager.js';

// ---------------------------------------------------------------------------
// Credentials. The shared library resolves USERNAME/PASSWORD from config.json, which
// points at BYGST — so Odense must NOT use them. Read config-odense.json here instead.
// ---------------------------------------------------------------------------
export const ODENSE_CONFIG = (function () {
  const candidates = [
    './config-odense.json',
    'PerformanceTests/config-odense.json',
    '../config-odense.json',
  ];
  for (let i = 0; i < candidates.length; i++) {
    try { const t = open(candidates[i]); if (t) return JSON.parse(t); } catch (e) { /* try next */ }
  }
  return {};
})();

export const OD_USERNAME = __ENV.MM_USERNAME || ODENSE_CONFIG.username || '';
export const OD_PASSWORD = __ENV.MM_PASSWORD || ODENSE_CONFIG.password || '';

const DEBUG = !!__ENV.DEBUG;

function extractField(html, name) {
  const m = new RegExp(`id="${name}"[^>]*value="([^"]*)"`).exec(html || '');
  return m ? m[1] : '';
}
const ajaxJsonText = () => Object.assign({ responseType: 'text' }, ajaxJson());

// ---------------------------------------------------------------------------
// STEP 1 — LOGIN (Odense two-request flow). Drop-in replacement for login().
// ---------------------------------------------------------------------------
// How many times to re-request a temp code when the postback bounces.
// WHY THIS EXISTS: the temp code is stored PER USER ACCOUNT, and every GetTempCode
// invalidates the previous one (proven 2026-09-10: code used immediately -> 302;
// same code after a second GetTempCode -> 200 bounce; the newer code -> 302). So when
// N VUs share one account they overwrite each other and only the newest code works.
// Measured login success on one account: 1 VU 100%, 10 VU 72.5%, 50 VU 44%.
//
// A bounce is therefore usually NOT "bad credentials" — it is "someone took my code",
// which LOOKS retryable. IT IS NOT. MEASURED, 50 VUs, 2 minutes, same conditions:
//
//        LOGIN_RETRIES=0   login 44.0%   login p95  4.5s    collisions  n/a
//        LOGIN_RETRIES=3   login 33.9%   login p95 37.6s    collisions  352
//
// Retrying makes it WORSE. Every retry fires another GetTempCode, which invalidates
// some OTHER VU's code, so retries manufacture the very collisions they are trying to
// survive — a thundering herd. Same shape as the bygst experiment where re-login on
// first failure took failures from 4.73% to 8.62%.
//
// DEFAULT 0. There is no client-side workaround for one shared account; the fix is one
// account per VU (data/users.csv + currentUser(), already supported by mainmanager.js).
// -e LOGIN_RETRIES=3 is kept only to reproduce the measurement above.
const LOGIN_RETRIES = parseInt(__ENV.LOGIN_RETRIES || '0', 10);

export function loginOdense(user) {
  const username = (user && user.username) || OD_USERNAME;
  const password = (user && user.password) || OD_PASSWORD;
  let success = false;

  group('1. Login', function () {
    const t0 = Date.now();
    const tAuth = Date.now();
    let landing = null;

    // Retry loop. Each attempt re-fetches the login page (fresh __VIEWSTATE) and asks
    // for a FRESH temp code, because the previous one may have been superseded by
    // another VU on the same account. See the LOGIN_RETRIES note above.
    for (let attempt = 0; attempt <= LOGIN_RETRIES; attempt++) {
      const page = http.get(`${APP}/MMV2Login.aspx`, { responseType: 'text' });
      recordStatus(loginPageStatus, page.status);
      if (attempt === 0) check(page, { 'login page 200': (r) => r.status === 200 });
      if (DEBUG && page.status !== 200) {
        console.error(`[LOGIN PAGE ${page.status}] ${String(page.body||'').replace(/\s+/g,' ').slice(0,160)}`);
      }

      const viewstate = extractField(page.body, '__VIEWSTATE');
      const vsgen     = extractField(page.body, '__VIEWSTATEGENERATOR');
      const eventval  = extractField(page.body, '__EVENTVALIDATION');
      if (!viewstate || !password) break;

      // (1) Authenticate. OTP comes back in the body; auth cookie in a header.
      const temp = http.post(`${BASE_URL}/api/v1/GetTempCode`,
        JSON.stringify({ Username: username, Password: password }),
        { headers: { 'Content-Type': 'application/json' }, responseType: 'text' });
      recordStatus(tempCodeStatus, temp.status);
      if (DEBUG && temp.status !== 200) {
        console.error(`[GETTEMPCODE ${temp.status}] ${String(temp.body||'').replace(/\s+/g,' ').slice(0,160)}`);
      }

      let otp = '', authOk = false;
      try {
        otp = temp.json('Clipboard') || '';
        authOk = temp.json('Success') === true;
      } catch (e) { otp = ''; authOk = false; }

      // Assert on CONTENT, not status: GetTempCode answers 200 with Success:false for
      // a bad password, so a status check alone would call a failed login a success.
      // Only counted on the first attempt so the check reflects credentials, not retries.
      if (attempt === 0) {
        check(null, {
          'GetTempCode Success': () => authOk,
          'OTP issued':          () => otp !== '',
        });
      }
      if (!authOk || !otp) {
        // Bad credentials are not retryable — a retry would just hammer the endpoint.
        if (DEBUG) {
          let msg = ''; try { msg = temp.json('Message') || ''; } catch (e) { /* ignore */ }
          console.log(`[LOGIN FAIL] creds status=${temp.status} Success=${authOk} otpLen=${otp.length} msg=${msg}`);
        }
        break;
      }

      // (2) Submit the OTP — a plain WebForms postback. password2FA is sent EMPTY:
      // the page blanks that field before clicking Verify.
      const res = http.post(`${APP}/MMV2Login.aspx`, {
        '__EVENTTARGET': '', '__EVENTARGUMENT': '',
        '__VIEWSTATE': viewstate, '__VIEWSTATEGENERATOR': vsgen, '__EVENTVALIDATION': eventval,
        'username2FA': username,
        'password2FA': '',
        'OTP': otp,
        'VerifyOTPBtn': 'Verificer',
      }, { redirects: 0 });

      landing = res;
      if (res.status >= 300 && res.status < 400 && res.headers['Location']) {
        const loc = res.headers['Location'];
        const url = loc.indexOf('http') === 0 ? loc
                  : loc.indexOf('/') === 0 ? `${BASE_URL}${loc}` : `${APP}/${loc}`;
        const tRender = Date.now();
        landing = http.get(url);
        loginRenderTrend.add(Date.now() - tRender);
      }

      if (landing && landing.url.indexOf('MMV2Content.aspx') !== -1) break;   // in

      // Bounced: almost always "another VU superseded my code". Count it, jitter to
      // desynchronise from whoever we are racing, and try again with a fresh code.
      otpCollisions.add(1);
      if (attempt < LOGIN_RETRIES) sleep(0.2 + Math.random() * 0.8);
    }
    loginAuthTrend.add(Date.now() - tAuth);

    success = check(landing, {
      'logged in (on Content page)': (r) => !!r && r.url.indexOf('MMV2Content.aspx') !== -1,
      'login not bounced back':      (r) => !!r && r.url.indexOf('MMV2Login.aspx') === -1,
    });
    if (!success) { errorRate.add(1); loginTrend.add(Date.now() - t0); return; }

    // Shell XHRs the SPA fires once the content page loads (same as bygst).
    http.post(`${APP}/services/MMLayoutReadOnly.asmx/BuildMainMenu`, '{}', ajaxJson());
    http.post(`${APP}/services/MMLayoutReadOnly.asmx/GetUnreadCount`, '{}', ajaxJson());

    errorRate.add(false);
    loginTrend.add(Date.now() - t0);
  });

  return success;
}

// ===========================================================================
// FILTER STEPS THAT ACTUALLY ASSERT ON THE DATA
// ===========================================================================
// mainmanager.js's applyLocationFilter / applyDataFilter / clearDataFilter assert
// ONLY `status === 200` on the grid reload. Their row-count logging is behind
// -e VERIFY, and so is keeping the response body at all (verifyListParams). So in a
// real load run — which never sets VERIFY — a filter that silently does nothing
// passes every check. That is exactly how the bygst "filters look fine but the grid
// is unfiltered" problem stayed invisible, and it is what the first Odense smoke hit:
// all four filter steps returned 2,286 of 2,286 with 100% checks green.
//
// These wrappers keep the SAME requests and the same order, and only add assertions:
//   - the body is really a DataTables payload (not a login page / error page)
//   - opts.minRows      : at least N rows  -> use on CLEAR / "show all" legs
//   - opts.maxRows      : at most N rows   -> use on APPLY legs, so a filter that
//                         does nothing FAILS instead of passing silently
// Row counts are parsed on EVERY run, not just under VERIFY.
//
// mainmanager.js is deliberately not modified: it is the file behind bygst runs
// 001-059 and must stay byte-identical.
// ===========================================================================

// Same body builder as mainmanager.js:getMMListBody (not exported there).
function listBody(mod, us, search) {
  const len = parseInt(__ENV.GRID_PAGE || mod.pageSize || 100, 10);
  return `draw=1&start=0&length=${len}&search%5Bvalue%5D=${encodeURIComponent(search || '')}&search%5Bregex%5D=false` +
         `&DataPath=${encodeURIComponent(mod.dataPath)}&UniqueString=${us}` +
         `&Gantt=False&PopupSQLListIndex=0&GroupBy=&ExtraParams=&IsSublist=False`;
}

// Always keeps the body so the counts can be read. The grid is capped at pageSize
// rows (10 here), so this is cheap.
function reloadAndCount(mod, us) {
  const res = http.post(`${APP}/restapi/List/GetMMList`, listBody(mod, us),
    Object.assign({ responseType: 'text' }, ajaxForm()));
  const b = (typeof res.body === 'string') ? res.body : '';
  const m = b.match(/"recordsTotal":(\d+)/);
  return { res: res, total: m ? parseInt(m[1], 10) : null };
}

function assertGrid(mod, label, r, opts) {
  let ok = check(r.res, {
    [`${mod.dataTag} grid reloaded after ${label}`]: (x) => x.status === 200,
    [`${mod.dataTag} ${label} returned a grid`]:     () => r.total !== null,
  });
  if (typeof opts.minRows === 'number') {
    ok = check(null, {
      [`${mod.dataTag} ${label} kept >= ${opts.minRows} rows`]:
        () => r.total !== null && r.total >= opts.minRows,
    }) && ok;
  }
  if (typeof opts.maxRows === 'number') {
    // The assertion that catches "the filter did nothing": if the grid comes back
    // with the full unfiltered count, this fails.
    ok = check(null, {
      [`${mod.dataTag} ${label} narrowed to <= ${opts.maxRows} rows`]:
        () => r.total !== null && r.total <= opts.maxRows,
    }) && ok;
  }
  if (__ENV.VERIFY) {
    console.log(`[VERIFY] vu=${__VU} iter=${__ITER} ${mod.dataTag} ${label}: recordsTotal=${r.total}`);
  }
  errorRate.add(!ok);
  return ok;
}

// Filter state is stored PER USER ACCOUNT on the server and SURVIVES logout/login
// (proven on Odense 2026-09-10: filter to 3 rows, log out, log back in -> still 3).
// So an iteration that dies midway leaves the next one looking at a filtered grid.
// Call this once before the test to guarantee a known starting state.
// Deliberately does NOT call openModule(): k6 leaves __VU/__ITER undefined inside
// setup(), and mainmanager.js's verifyRows() dereferences __ITER whenever VERIFY is
// set, so openModule throws there. This does the minimum needed for the server to
// bind a filter to a layout — active-nav toggles, then InitMainLayout for a REAL
// UniqueString — then clears the location filter and reports the row count.
export function resetAccountFilterState(mod, groupName) {
  let rows = null;
  group(groupName || 'Reset inherited filter state', function () {
    const j = ajaxJson();
    http.post(`${APP}/services/MMLayoutReadOnly.asmx/saveToggleValue`,
      JSON.stringify({ MySection: 'ActiveDataStateV2', MyKey: 'ActiveNavigationItem', Value: mod.processTag }), j);
    http.post(`${APP}/services/MMLayoutReadOnly.asmx/saveToggleValue`,
      JSON.stringify({ MySection: 'ActiveDataStateV2', MyKey: `ActiveNavigationStep${mod.processTag}`, Value: mod.processStepTag }), j);
    http.post(`${APP}/services/MMLayoutReadOnly.asmx/saveToggleValue`,
      JSON.stringify({ MySection: 'ActiveDataStateV2', MyKey: `ActiveNavigationStepItem${mod.processTag}.${mod.processStepTag}`, Value: mod.dataTag }), j);

    const init = http.post(`${APP}/services/MMLayout.asmx/InitMainLayout`, JSON.stringify({
      UniqueString: '', MenuItemKey: mod.dataTag, SummaryID: 0,
      MenuItemID: mod.menuItemId, MenuItemTypeID: mod.menuItemType,
      ProcessTag: mod.processTag, ProcessStepTag: mod.processStepTag, SnapshotID: 0,
    }), ajaxJsonText());
    const m = String(init.body || '').match(/"UniqueString"\s*:\s*"([0-9a-fA-F]{16,40})"/);
    if (!m) return;

    http.post(`${APP}/services/MMLayout.asmx/RefreshMainManFilter`, JSON.stringify({
      DataTag: mod.mainManFilterTag || 'PropertyItem',
      ControlIDChanged: 'MainManFilter_TFGroundID',
      Value: ['MainManFilter_TFMainGroupID#0', 'MainManFilter_TFGroundID#0',
              'MainManFilter_TFMainID#0'],
    }), j);
    rows = reloadAndCount(mod, m[1]).total;
  });
  return rows;
}

export function applyLocationFilterChecked(mod, groundId, us, groupName, opts) {
  opts = opts || {};
  let ok = false, rows = null;
  group(groupName || `Location filter ${mod.dataTag}`, function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/RefreshMainManFilter`, JSON.stringify({
      DataTag: mod.mainManFilterTag || 'PropertyItem',
      ControlIDChanged: 'MainManFilter_TFGroundID',
      Value: ['MainManFilter_TFMainGroupID#0', `MainManFilter_TFGroundID#${groundId}`,
              'MainManFilter_TFMainID#0'],
    }), ajaxJson());
    const r = reloadAndCount(mod, us);
    ok = assertGrid(mod, `location filter (GroundID=${groundId})`, r, opts);
    rows = r.total;
    filterTrend.add(Date.now() - t0);
  });
  return { ok: ok, rows: rows };
}

export function applyDataFilterChecked(mod, controlIdChanged, values, us, groupName, opts) {
  opts = opts || {};
  let ok = false, rows = null;
  group(groupName || `Data filter ${mod.dataTag}`, function () {
    const t0 = Date.now();
    http.post(`${APP}/services/MMLayout.asmx/RefreshDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, ControlIDChanged: controlIdChanged, Value: values, TemplateID: 0,
    }), ajaxJson());
    const r = reloadAndCount(mod, us);
    ok = assertGrid(mod, `data filter (${controlIdChanged})`, r, opts);
    rows = r.total;
    filterTrend.add(Date.now() - t0);
  });
  return { ok: ok, rows: rows };
}

export function clearDataFilterChecked(mod, values, us, groupName, opts) {
  opts = opts || {};
  let ok = false, rows = null;
  group(groupName || `Clear data filter ${mod.dataTag}`, function () {
    const t0 = Date.now();
    // NO TemplateID here. Captured on Odense 2026-09-10: RefreshDataFilter carries
    // TemplateID:0 but EmptyDataFilter does NOT. mainmanager.js's clearDataFilter has
    // it right; an earlier version of this wrapper wrongly added the field.
    http.post(`${APP}/services/MMLayout.asmx/EmptyDataFilter`, JSON.stringify({
      DataTag: mod.dataTag, Value: values,
    }), ajaxJson());
    const r = reloadAndCount(mod, us);
    ok = assertGrid(mod, 'filter clear', r, opts);
    rows = r.total;
    filterTrend.add(Date.now() - t0);
  });
  return { ok: ok, rows: rows };
}

// Read the row count out of a grid body kept by openModule({keepList:true}).
// Used to derive the unfiltered baseline so the APPLY legs can assert they narrowed
// it, without hardcoding a row count that changes with the data.
export function rowsIn(listText) {
  const m = (listText || '').match(/"recordsTotal":(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

// ---------------------------------------------------------------------------
// RESOLVE A DROPDOWN VALUE BY NAME -> id, with PREFIX matching.
//   Same call sequence as mainmanager.js's resolveDataFilterId; the only change is
//   that the search term and the match term are allowed to differ:
//     opts.query  what to send as q= (defaults to `name`)
//     match       leading-fragment, case-insensitive
//   Cached per VU, like the original.
// ---------------------------------------------------------------------------
const _resolved = {};
function reEscape(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

export function resolveFilterIdPrefix(mod, controlToken, name, opts) {
  opts = opts || {};
  if (!name) return null;
  const ck = `${mod.dataTag}:${controlToken}:${name}`;
  if (_resolved[ck] !== undefined) return _resolved[ck];

  let id = null;
  group(opts.groupName || `Resolve ${controlToken} '${name}'`, function () {
    const t0 = Date.now();

    const fc = http.post(`${APP}/services/MMLayoutReadOnly.asmx/LoadMMFilterControl`,
      JSON.stringify({ tag: mod.dataTag, type: opts.type || '2' }), ajaxJsonText());
    let html = '';
    try { html = fc.json('d') || ''; } catch (e) { html = (typeof fc.body === 'string') ? fc.body : ''; }

    const re = new RegExp("DataPath:\\s*'([^']*" + reEscape(controlToken) +
      "[^']*)'\\s*,\\s*UniqueString:\\s*'([^']*)'[\\s\\S]{0,240}?checksum:\\s*'([^']*)'");
    const mm = re.exec(html);
    if (!mm && DEBUG) {
      const tokens = (html.match(/DataPath:\s*'([^']+)'/g) || []).map((s) => s.replace(/DataPath:\s*'|'/g, ''));
      console.log(`[RESOLVE NO-TOKEN] '${controlToken}' not in filter HTML (len ${html.length}). Present: ${JSON.stringify(tokens)}`);
    }

    if (mm) {
      const q = opts.query || name;
      const url = `${APP}/restapi/List/ComboboxData?DataPath=${encodeURIComponent(mm[1])}` +
        `&UniqueString=${mm[2]}&p=1&q=${encodeURIComponent(q)}&checksum=${encodeURIComponent(mm[3])}`;
      // Name-tagged: the URL carries a per-VU UniqueString + checksum, so an untagged
      // call mints a new metric time series every time.
      const cb = http.get(url, Object.assign(ajaxJsonText(),
        { tags: { name: 'restapi/List/ComboboxData' } }));
      try {
        const arr = cb.json('data') || [];
        const want = String(name).toLowerCase().trim();
        const hit = opts.prefix
          ? arr.find((o) => o && o.Name && o.Name.toLowerCase().trim().indexOf(want) === 0)
          : arr.find((o) => o && o.Name && o.Name.toLowerCase().trim() === want);
        if (hit) id = hit.ID;
        if (id === null && DEBUG) {
          const cand = arr.slice(0, 30).map((o) => o && o.Name).filter(Boolean);
          console.log(`[RESOLVE MISS] ${controlToken} '${name}' (q='${q}') not in ${arr.length}: ${JSON.stringify(cand)}`);
        }
      } catch (e) { if (DEBUG) console.log(`[RESOLVE ERR] ${controlToken} '${name}': ${e}`); }
    }

    check(null, { [`resolved ${controlToken} '${name}'`]: () => id !== null });
    errorRate.add(id === null);
    (opts.trend || navigateTrend).add(Date.now() - t0);
  });

  _resolved[ck] = id;
  return id;
}

// ===========================================================================
// REPORT — adds a LOGIN-PATH ERROR section that the shared report cannot show.
// ===========================================================================
// mainmanager.js's report has a "Server errors observed" table, but it only covers
// three catalogued bygst endpoints (RefreshMainManFilter / RefreshDataFilter /
// EmptyDataFilter). On Odense those three are clean, so the table prints
// "No server errors recorded this run" — while 39% of login pages were returning 503
// and 18% were failing to connect at all. Read by a manager that is simply wrong.
//
// This wrapper keeps the shared report exactly as-is and appends a section built from
// the per-status counters recorded in loginOdense(). It does NOT modify
// mainmanager.js, so bygst's report is untouched.
export function handleSummaryOdense(data) {
  const out = baseHandleSummary(data);
  const m = data.metrics || {};
  const n = (k) => (m[k] && m[k].values && m[k].values.count) || 0;

  const rows = [];
  let pageTotal = 0, codeTotal = 0;
  LOGIN_STATUSES.forEach(function (s) {
    const a = n(`login_page_status_${s}`), b = n(`gettempcode_status_${s}`);
    pageTotal += a; codeTotal += b;
    if (a || b) rows.push({ s: s, page: a, code: b });
  });
  if (!rows.length) return out;

  const label = (s) => (s === 0 ? '0 — no response (connection refused / reset / timeout)'
    : s === 200 ? '200 — OK'
    : s === 503 ? '503 — Service Unavailable (server shedding load)'
    : String(s));
  const pctOf = (v, t) => (t ? ((100 * v) / t).toFixed(1) + '%' : '—');

  const body = rows.map(function (r) {
    const bad = r.s !== 200 && r.s !== 302;
    return `<tr><td${bad ? ' style="color:#b91c1c;font-weight:600"' : ''}>${label(r.s)}</td>`
      + `<td>${r.page} (${pctOf(r.page, pageTotal)})</td>`
      + `<td>${r.code} (${pctOf(r.code, codeTotal)})</td></tr>`;
  }).join('');

  // EVERYTHING BELOW IS DERIVED FROM THIS RUN. No baked-in percentages from earlier
  // runs: a reader must be able to assume every number on this panel came from the
  // run that produced the file. The OTP mechanism is described qualitatively (it is a
  // property of the application, not a measurement) and the numbers illustrating it
  // are computed from this run's own counters and checks.
  const collisions = n('otp_code_collisions');
  const peakVUs = (m.vus_max && m.vus_max.values && m.vus_max.values.max) || 0;

  // SUM every occurrence of the check, do not take the first match. The same check
  // name appears in TWO places: once inside setup()'s login group and once in the
  // per-iteration login group. Returning the first hit reports setup's single login
  // (e.g. 1/1) instead of the run total (e.g. 176/1959) — a 3-orders-of-magnitude
  // understatement that would make a bad run look clean.
  function sumCheck(group, name, acc) {
    acc = acc || { pass: 0, fail: 0 };
    (group.checks || []).forEach(function (c) {
      if (c.name === name) { acc.pass += c.passes; acc.fail += c.fails; }
    });
    (group.groups || []).forEach(function (g) { sumCheck(g, name, acc); });
    return acc;
  }
  const li = sumCheck(data.root_group || {}, 'logged in (on Content page)');
  const liPass = li.pass;
  const liTotal = li.pass + li.fail;

  // A 503 on the login page ends the iteration BEFORE GetTempCode is reached, so the
  // two column totals differ by exactly the number of short-circuited attempts.
  const shortCircuited = pageTotal - codeTotal;

  const collisionNote = collisions > 0
    ? `<b>OTP code collisions this run: ${collisions}.</b> These are NOT a server fault.
 Odense issues a one-time login code stored per USER ACCOUNT, and each request replaces the
 previous one, so virtual users sharing a single test account overwrite each other's codes.
 With ${peakVUs} peak VUs on one account, <b>${liPass} of ${liTotal} logins reached the
 content page (${pctOf(liPass, liTotal)})</b>. A valid login measurement needs one account
 per VU; until then treat the login figures as a property of the test setup, not of Odense.`
    : `<b>OTP code collisions this run: 0.</b> Odense issues a one-time login code stored per
 USER ACCOUNT and each request replaces the previous one, so concurrent virtual users on a
 single account overwrite each other. None occurred here
 (${liPass} of ${liTotal} logins reached the content page), so the login figures in this run
 are not distorted by account sharing.`;

  const splitNote = shortCircuited > 0
    ? `<p style="font-size:12px;color:#515b72;margin:8px 0 0">
 The two columns have different totals: ${pageTotal} login-page requests vs ${codeTotal} to
 GetTempCode. A failed login page ends the iteration before GetTempCode is called, so
 <b>${shortCircuited}</b> attempts never got that far. Login-page failures and OTP collisions
 are therefore SEPARATE and ADDITIVE causes of a low login success rate.</p>`
    : '';

  const section = `
<h2>Login path — HTTP status breakdown (Odense)</h2>
<p style="font-size:12px;color:#515b72;margin:6px 0 10px">
 The "Server errors observed" table above only covers three catalogued filter endpoints and
 says nothing about the login path. These are the real per-status counts for the two login
 calls, measured in THIS run. <b>Anything other than 200 here means the request never
 reached the application.</b> Counts include the single login performed by setup().
</p>
<table><tr><th>HTTP status</th><th>MMV2Login.aspx (page)</th><th>/api/v1/GetTempCode</th></tr>${body}</table>
<p style="font-size:12px;color:#515b72;margin:10px 0 0">${collisionNote}</p>
${splitNote}
<p style="font-size:12px;color:#b91c1c;margin:8px 0 0">
 Caution when reading the latency figures above: requests that were refused return almost
 instantly, which pulls the percentiles DOWN. A low p95 alongside a high failure rate means
 most requests were rejected quickly, not served quickly.
</p>`;

  Object.keys(out).forEach(function (k) {
    if (k.slice(-5) === '.html' && typeof out[k] === 'string') {
      out[k] = out[k].replace('</body>', section + '</body>');
    }
  });
  return out;
}

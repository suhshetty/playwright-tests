/*
 * MAINMANAGER **CORE** LIBRARY (ASP.NET Core tenants, e.g. kommunedevcore)
 *
 * Sibling of lib/mainmanager.js, which targets the older WebForms tenants (bygst,
 * kommune, kommunerelease). Kept SEPARATE and self-contained on purpose: the two
 * builds differ enough that sharing code would make both fragile, and bygst testing
 * is ongoing. Never import both libraries into one script — they define metrics with
 * the same names and k6 will refuse to start.
 *
 * Endpoint and payload differences vs the WebForms build are documented in
 * CORE-API-MAPPING.md (captured live in a browser 2026-08-26).
 * The two big ones:
 *   - .asmx services moved to /api/<Controller>/<Method>, several POST -> GET
 *   - payload styles are INVERTED: GetMMList is JSON here (form-encoded on bygst),
 *     the filter calls are form-encoded here (JSON on bygst)
 */

import http from 'k6/http';
import { check, group } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
// -e ENV  >  config.json  >  built-in default, so a single value can be overridden
// for a one-off run. config.json is gitignored (real passwords stay out of git).
export const CONFIG = (function () {
  // k6 open() base path varies (CWD vs script dir), so try the likely locations.
  const candidates = ['../config-core.json', '../config.json', './config.json', 'PerformanceTests/config.json'];
  for (let i = 0; i < candidates.length; i++) {
    try { const t = open(candidates[i]); if (t) return JSON.parse(t); } catch (e) { /* try next */ }
  }
  return {};
})();

export const BASE_URL = __ENV.BASE_URL || CONFIG.baseUrl || 'https://kommunedevcore.mainmanager.is';
export const API      = `${BASE_URL}/api`;          // /api/MMLayout, /api/MMLayoutReadOnly
export const APP      = `${BASE_URL}/MMV2`;         // /MMV2/restapi/List/...
export const APPLOWER = `${BASE_URL}/mmv2`;         // /mmv2/restapi/List/ComboboxData, GetLayerPoints

export const USERNAME = __ENV.MM_USERNAME || CONFIG.username || '';
export const PASSWORD = __ENV.MM_PASSWORD || CONFIG.password || '';

const DEBUG    = !!__ENV.DEBUG;
const SLOW_MS  = parseInt(__ENV.SLOW_MS || '3000', 10);
const GRID_PAGE = parseInt(__ENV.GRID_PAGE || '100', 10);

// ---------------------------------------------------------------------------
// METRICS — same names as the WebForms lib so the reports stay comparable
// ---------------------------------------------------------------------------
export const errorRate       = new Rate('business_errors');
export const loginTrend      = new Trend('step_login_duration', true);
export const loginAuthTrend  = new Trend('step_login_auth_duration', true);
export const landingTrend    = new Trend('step_landing_duration', true);
export const navigateTrend   = new Trend('step_navigate_duration', true);
export const recordModalTrend= new Trend('step_open_record_duration', true);
export const filterTrend     = new Trend('step_filter_duration', true);
export const logoutTrend     = new Trend('step_logout_duration', true);
export const treeTrend       = new Trend('step_tree_load_duration', true);
export const serverErrors    = new Counter('known_server_errors');

// ---------------------------------------------------------------------------
// SERVER API ERRORS — per-endpoint, per-status
//
// The bygst report tracks this for three endpoints only, because on that tenant the
// three filter calls are known-broken headlessly and are HELD OUT of the http-failed
// SLA. Neither half of that applies here:
//   * CORE's filters work (proved live: Buildings 4,433 -> 1 -> 798 -> 4,433), so
//     there is no known-broken endpoint to exclude;
//   * excluding errors during a CAPACITY test would delete the very finding the test
//     exists to produce.
// So this covers EVERY endpoint the scenario calls, and the errors stay counted in
// http_req_failed. The table tells you which API broke first, which is the useful
// answer when an environment sheds load.
//
// k6 requires metrics to be constructed in the init context, so the endpoint list is
// static. `seg` is matched against the last path segment of the request URL.
// ---------------------------------------------------------------------------
const OBSERVED_STATUSES = [0, 400, 401, 403, 404, 429, 500, 502, 503, 504];

export const ENDPOINTS = [
  { key: 'loginpage',    seg: '@root-get',              label: 'GET / (login page)' },
  { key: 'loginsubmit',  seg: '@root-post',             label: 'POST / (authenticate)' },
  { key: 'keepalive',    seg: 'keepalive',              label: 'restapi/Internal/KeepAlive' },
  { key: 'mainmenu',     seg: 'buildmainmenu',          label: 'MMLayoutReadOnly/BuildMainMenu' },
  { key: 'unread',       seg: 'getunreadcount',         label: 'MMLayoutReadOnly/GetUnreadCount' },
  { key: 'menusteps',    seg: 'getmenuitemsteps',       label: 'MMLayoutReadOnly/GetMenuItemSteps' },
  { key: 'menuitems',    seg: 'getmenuitemprocessitems', label: 'MMLayoutReadOnly/GetMenuItemProcessItems' },
  { key: 'toggle',       seg: 'savetogglevalue',        label: 'MMLayoutReadOnly/saveToggleValue' },
  { key: 'initlayout',   seg: 'initmainlayout',         label: 'MMLayout/InitMainLayout' },
  { key: 'filterctrl',   seg: 'loadmmfiltercontrol',    label: 'MMLayoutReadOnly/LoadMMFilterControl' },
  { key: 'buildlayout',  seg: 'buildlayout',            label: 'MMLayoutReadOnly/BuildLayout' },
  { key: 'listheaders',  seg: 'getmmlistheaders',       label: 'restapi/List/GetMMListHeaders' },
  { key: 'list',         seg: 'getmmlist',              label: 'restapi/List/GetMMList' },
  { key: 'combobox',     seg: 'comboboxdata',           label: 'restapi/List/ComboboxData' },
  { key: 'modal',        seg: 'loadmmmodalcontrol',     label: 'MMLayout/LoadMMModalControl' },
  { key: 'childcount',   seg: 'getchildcount',          label: 'MMLayoutReadOnly/GetChildCount' },
  { key: 'gismodal',     seg: 'buildgraphicalmodal',    label: 'restapi/Graphical/BuildGraphicalModal' },
  { key: 'gislayers',    seg: 'getlayerpoints',         label: 'restapi/Graphical/GetLayerPoints' },
  { key: 'sitefilter',   seg: 'refreshmainmanfilter',   label: 'MMLayout/RefreshMainManFilter' },
  { key: 'datafilter',   seg: 'refreshdatafilter',      label: 'MMLayout/RefreshDataFilter' },
  { key: 'clearfilter',  seg: 'emptydatafilter',        label: 'MMLayout/EmptyDataFilter' },
  { key: 'logout',       seg: 'logout',                 label: 'MMV2Logout/Logout' },
  // My page (scenario 1)
  { key: 'buildmypage',  seg: 'buildmypage',            label: 'MMLayoutReadOnly/BuildMyPage' },
  { key: 'portalagg',    seg: 'initportalaggregate',    label: 'MMLayoutReadOnly/InitPortalAggregate' },
  { key: 'selectsnap',   seg: 'selectsnapshotfrommypage', label: 'MMLayoutReadOnly/SelectSnapshotFromMyPage' },
  // Organisation trees (scenario 3)
  { key: 'tree',         seg: 'tree',                   label: 'restapi/Graphical/Tree' },
  { key: 'treemenu',     seg: 'populatetreeactionmenu', label: 'MMLayoutReadOnly/PopulateTreeActionMenu' },
  { key: 'other',        seg: null,                     label: '(unclassified)' },
];

const _epTotal = {}, _epByStatus = {}, _segToKey = {};
ENDPOINTS.forEach(function (e) {
  _epTotal[e.key] = new Counter(`api_err_${e.key}`);
  _epByStatus[e.key] = {};
  OBSERVED_STATUSES.forEach(function (s) { _epByStatus[e.key][s] = new Counter(`api_err_${e.key}_${s}`); });
  _epByStatus[e.key].other = new Counter(`api_err_${e.key}_other`);
  if (e.seg) _segToKey[e.seg] = e.key;
});

function endpointKey(res) {
  const method = (res.request && res.request.method) || 'GET';
  let path = String(res.request ? res.request.url : '');
  path = path.replace(/^https?:\/\/[^/]+/, '').split('?')[0].replace(/\/+$/, '');
  if (path === '') return method === 'POST' ? 'loginsubmit' : 'loginpage';
  const seg = path.slice(path.lastIndexOf('/') + 1).toLowerCase();
  return _segToKey[seg] || 'other';
}

// Called for every response; records only errors. HTTP 0 (connection refused/reset or
// timeout) is bucketed like any status — under load it is often the largest bucket and
// hiding it would understate the collapse.
function recordApiError(res) {
  if (res.status >= 200 && res.status < 400) return;
  const key = endpointKey(res);
  _epTotal[key].add(1);
  const bucket = _epByStatus[key][res.status] || _epByStatus[key].other;
  bucket.add(1);
  serverErrors.add(1, { endpoint: key, status: String(res.status) });
}

// ---------------------------------------------------------------------------
// MODULES — Building archive, captured live on kommunedevcore 2026-08-26.
//
// menuItemId is per-TENANT, not per-build: bygst uses 540/8, kommunedevcore uses
// 1783/1018. Getting it wrong makes BuildLayout answer {"success":false} and the
// grid endpoints then 403 the UniqueString. Overridable with -e for other tenants.
//
// childKeys: the sub-entity counts the record modal requests via GetChildCount.
// The Building modal fires NO GetChildCount here (verified in the browser) — its
// sub-entities load lazily — so Buildings deliberately has none.
// ---------------------------------------------------------------------------
export const MODULES = {
  // *** DOES NOT EXIST ON kommunedevcore — DO NOT USE WITHOUT CHECKING THE TENANT ***
  // Verified 2026-09-09: GetMenuItemSteps(BuildingArchive) lists exactly TWO items under
  // GroundRegistration ("Site register") on this tenant — MainGroupTree 1784 ("Portfolio
  // management") and MainGroup 1787 ("Portfolios"). There is no id 1783 and no 'Ground'
  // item, confirmed against the live UI: the Site register tab shows only those two
  // sub-tabs. InitMainLayout answers 200 with EVERY FIELD NULL, so no UniqueString is
  // issued and BuildLayout never succeeds.
  //
  // This descriptor was carried over from the bygst (WebForms) tenant, where the Sites
  // grid does exist. On CORE use MODULES.Portfolios instead. Kept here because it is
  // still correct for tenants that expose the grid — check before reusing.
  Sites: {
    processTag: 'BuildingArchive', processStepTag: 'GroundRegistration',
    dataTag: 'Ground', dataCaption: 'Site', dataPath: 'Ground$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_SITES || '1783', 10), menuItemType: 1,
    mainManFilterTag: 'Ground',
    dataText: 'Open site',
    listModeMenuItems: null, reloadFilter: false,
    childKeys: ['MainGroupData', 'RealProperty', 'Building', 'ActiveHeadLeaseContract',
                'ActiveLeaseContract', 'LeaseContract', 'AssetProtectionAndTourism',
                'MainManUsageOrganisation', 'MainManFacilityUsage', 'ResponseDemandOnGround',
                'Picture', 'MainManDocument', 'TechnicalInformation', 'IdentificationCode',
                'Service', 'Task', 'RecurringIncident', 'Incident'],
  },
  // The CORE stand-in for Sites: the second sub-tab under "Site register".
  // Verified 2026-09-09 — InitMainLayout returns UniqueString + ActiveDataTag=MainGroup,
  // ActiveDataCaption=Portfolio, DataPath=MainGroup$1$0.
  // NOTE: this grid has NO type-3 location controls, so no Site dropdown lives here.
  // The Site (GroundID) filter belongs to Buildings — see the note there.
  Portfolios: {
    processTag: 'BuildingArchive', processStepTag: 'GroundRegistration',
    dataTag: 'MainGroup', dataCaption: 'Portfolio', dataPath: 'MainGroup$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_PORTFOLIOS || '1787', 10), menuItemType: 1,
    mainManFilterTag: 'MainGroup',
    dataText: 'Open portfolio',
    listModeMenuItems: null, reloadFilter: false,
  },
  // Buildings owns the Site dropdown on CORE. Its type-3 filter control exposes
  // RegionID, MainGroupID and GroundID (verified 2026-09-09); resolving a site name
  // here works, e.g. 'AKTIVITETSHUSET' -> 58334.
  Buildings: {
    processTag: 'BuildingArchive', processStepTag: 'RegisterLocationStructure',
    dataTag: 'Building', dataCaption: 'Building', dataPath: 'Building$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_BUILDINGS || '1018', 10), menuItemType: 1,
    // CORE sends the grid's OWN tag on RefreshMainManFilter (bygst sends 'Ground').
    mainManFilterTag: 'Building',
    dataText: 'Open building',
    listModeMenuItems: [], reloadFilter: true,
  },
  // processStepTag is `MainSummary-<summaryId>`, NOT bare 'MainSummary' — that is what
  // InitMainLayout sends (captured on kommunedevcore 2026-09-03). It is derived in
  // openMyPage() so the two can never drift apart.
  MyPage: {
    processTag: 'MyPage',
    dataTag: 'MyPage', dataCaption: 'My page', dataPath: 'MyPage$1$0',
    menuItemId: 0, menuItemType: 2,
    summaryId: parseInt(__ENV.MYPAGE_SUMMARY_ID || '2147483643', 10),
  },
  // The grid behind the "Unfinished work orders on my organisation" widget.
  // Verified on kommunedevcore 2026-09-03: snapshot 4270 opens Helpdesk / Request /
  // DataPath Request$1$0, MenuItemID 1143 — the SAME as kommune. This entry previously
  // read OperationAndMaintenance / WorkOrderDayPlanning / WorkOrder / 1150, which is a
  // different screen entirely, so scenario 1 was loading the wrong grid.
  WorkOrders: {
    processTag: 'Helpdesk', processStepTag: 'Request',
    dataTag: 'Request', dataCaption: 'Work order', dataPath: 'Request$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_WORKORDERS || '1143', 10), menuItemType: 1,
    mainManFilterTag: 'Request',
    dataText: 'Open work order',
    listModeMenuItems: [], reloadFilter: true,
  },
  // Operation and maintenance -> Work order overview -> Work orders (SCENARIO 6).
  // Captured live on kommunedevcore 2026-09-09 from the sub-tab's own handler:
  //   subTabClicked('Request', 0, 1133, 1, 'Requests', 'OperationAndMaintenance')
  // NOTE the id: 1133, NOT the Helpdesk 1143 in MODULES.WorkOrders above. Both grids
  // carry dataTag 'Request', so pointing at the wrong one still returns work orders and
  // the mistake does not surface as an error — it just measures a different module.
  // skipGis: the work-order modal fires NO BuildGraphicalModal / GetLayerPoints
  // (verified by capturing every XHR on a real record open — only LoadMMModalControl
  // and GetChildCount).
  WorkOrdersOM: {
    processTag: 'OperationAndMaintenance', processStepTag: 'Requests',
    dataTag: 'Request', dataCaption: 'Work order', dataPath: 'Request$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_WORKORDERS_OM || '1133', 10), menuItemType: 1,
    mainManFilterTag: 'Request',
    dataText: 'Open work order',
    listModeMenuItems: [], reloadFilter: true,
    skipGis: true,
    // All 26 keys the browser asks for, in its order.
    childKeys: ['RequestEmployee', 'RequestMainManDocument', 'RequestMainManDocumentNoAccess',
                'RequestEmailHistory', 'RequestPlannedCost', 'RequestHours', 'RequestMaterial',
                'RequestOtherCost', 'RequestHSEItem', 'RequestInspection', 'LocalChecklist',
                'LocalChecklistIncident', 'RequestDocument', 'Incident', 'FollowUpComplaint',
                'FollowupUnfinishedIncident', 'RecurringIncident', 'RequestRecipitant', 'Thread',
                'Note', 'Reminder', 'StandardMessage', 'RequestHistoryForLocation',
                'EnvironmentalGoal', 'RequestEnvironmentalGoal', 'Invoice'],
  },
  // Kept for callers that genuinely want the O&M day-planning grid (not scenario 1).
  WorkOrdersDayPlanning: {
    processTag: 'OperationAndMaintenance', processStepTag: 'WorkOrderDayPlanning',
    dataTag: 'WorkOrder', dataCaption: 'Work order', dataPath: 'WorkOrder$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_WO_DAYPLANNING || '1150', 10), menuItemType: 1,
    mainManFilterTag: 'WorkOrder',
    dataText: 'Open work order',
    listModeMenuItems: [], reloadFilter: true,
  },
  // Human resources -> Organisation overview -> Build organisation trees.
  // Captured on kommunedevcore 2026-09-07:
  //   subTabClicked('OrganisationTree', 0, 2926, 1, 'Organisation', 'HumanResources')
  //   InitMainLayout { MenuItemKey:'OrganisationTree', MenuItemID:2926,
  //                    MenuItemTypeID:1, ProcessTag:'HumanResources',
  //                    ProcessStepTag:'Organisation' }
  // The view loads TWO trees from one layout — left = organisations, right = persons.
  OrganisationTree: {
    processTag: 'HumanResources', processStepTag: 'Organisation',
    dataTag: 'OrganisationTree', dataCaption: 'Build organisation tree',
    dataPath: 'OrganisationTree$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_ORGTREE || '2926', 10), menuItemType: 1,
    leftTreeId:  __ENV.LEFT_TREE_ID  || 'MMLeftTree-OrganisationTree',
    rightTreeId: __ENV.RIGHT_TREE_ID || 'MMRightTree-BuildPersonTree',
  },
  // Record types opened by right-clicking a tree node. NOTE the tree node's own tag is
  // 'Organisation', but the modal is opened with tag 'Company' — they differ, and
  // PopulateTreeActionMenu is queried with the NODE tag while LoadMMModalControl uses
  // the MODAL tag. childKeys captured from the live GetChildCount calls.
  // Named *Record, NOT Company/Person: a `Person` GRID module already exists further
  // down this object, and in a JS object literal the LAST duplicate key wins silently.
  // Naming these Person/Company made MODULES.Person resolve to the grid descriptor,
  // which has no nodeTag — the tree action-menu call then went out with
  // sDataTag=undefined and returned an empty menu.
  CompanyRecord: {
    dataTag: 'Company', dataCaption: 'Company', dataText: 'Open company',
    nodeTag: 'Organisation',
    childKeys: ['Department', 'Employee', 'OrganisationDocument', 'EmployeeProfession',
                'OrganisationGroupData', 'MainGroupOnPerson', 'OrganisationTask', 'VendorIssue'],
  },
  PersonRecord: {
    dataTag: 'Person', dataCaption: 'Person', dataText: 'Open person',
    nodeTag: 'Person',
    childKeys: ['PersonPermit', 'PersonEducation', 'PersonExperience', 'PersonReference',
                'PersonPriorJob', 'PersonLanguage', 'PersonMembership', 'PersonPublication',
                'PersonMainType', 'OrganisationTask', 'Employee', 'OrganisationDocument',
                'UserLoginHistory', 'MainModuleUserSettings'],
  },
  // Helpdesk -> Incidents overview -> "All incidents".
  // Verified live on kommunedevcore 2026-09-07:
  //   subTabClicked('Incident', 0, 1168, 1, 'Incidents', 'Helpdesk')
  //   InitMainLayout { MenuItemKey:'Incident', MenuItemID:1168, MenuItemTypeID:1,
  //                    ProcessTag:'Helpdesk', ProcessStepTag:'Incidents' }
  // This entry previously read processStepTag 'IncidentOverview' and menuItemId 1197 —
  // both wrong; the step tag is 'Incidents' and the id is 1168. The sub-tab labelled
  // "All incidents" is subtab-Incident (there are 11 sub-tabs under this step).
  Incidents: {
    processTag: 'Helpdesk', processStepTag: 'Incidents',
    dataTag: 'Incident', dataCaption: 'Incident', dataPath: 'Incident$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_INCIDENTS || '1168', 10), menuItemType: 1,
    mainManFilterTag: 'Incident',
    dataText: 'Open incident',
    listModeMenuItems: [], reloadFilter: true,
    childKeys: ['CheckItemDoc', 'IncidentRecipitant', 'IncidentReview', 'DeviationThread',
                'ConnectedRequest', 'BIMElementIncident', 'LocalChecklist'],
  },
  HumanResources: {
    processTag: 'HumanResources', processStepTag: 'OrganisationOverview',
    dataTag: 'Company', dataCaption: 'Company', dataPath: 'Company$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_HR || '1266', 10), menuItemType: 1,
    mainManFilterTag: 'Company',
    dataText: 'Open company',
    listModeMenuItems: [], reloadFilter: false,
  },
  Person: {
    processTag: 'HumanResources', processStepTag: 'OrganisationOverview',
    dataTag: 'Person', dataCaption: 'Person', dataPath: 'Person$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_HR || '1266', 10), menuItemType: 1,
    mainManFilterTag: 'Person',
    dataText: 'Open person',
    listModeMenuItems: [], reloadFilter: false,
  },
  // UNVERIFIED. processStepTag 'LeaseContractsOverview' and menuItemId 1346 were never
  // confirmed against the live menu; the real step tag is 'LeaseContract' and none of
  // the four lease sub-tabs uses 1346. Superseded by the four entries below — kept only
  // so existing callers do not break. Do not use for new work.
  LeaseContracts: {
    processTag: 'PropertyManagement', processStepTag: 'LeaseContractsOverview',
    dataTag: 'HeadLeaseContract', dataCaption: 'Lease contract', dataPath: 'HeadLeaseContract$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_LEASECONTRACTS || '1346', 10), menuItemType: 1,
    mainManFilterTag: 'HeadLeaseContract',
    dataText: 'Open lease contract',
    listModeMenuItems: [], reloadFilter: true,
  },

  // Property management -> Lease contracts overview. FOUR SEPARATE sub-tabs, each with
  // its own menuItemId and dataTag — verified live on kommunedevcore 2026-09-09 from
  // subTabClicked(...) and the InitMainLayout bodies:
  //   Head lease contracts          5387   HeadLeaseContract
  //   Lease contracts               1328   LeaseContract
  //   Sub lease contracts           5394   SubLeaseContract
  //   Lease contract renegotiations 5417   LeaseContractRenegotiation
  // All share ProcessTag 'PropertyManagement' / ProcessStepTag 'LeaseContract'.
  // scenario4-propertymanagement-core.js (the unverified older file) drove all three
  // contract grids through the single LeaseContracts entry above, so it was loading the
  // same grid three times rather than three different ones.
  HeadLeaseContract: {
    processTag: 'PropertyManagement', processStepTag: 'LeaseContract',
    dataTag: 'HeadLeaseContract', dataCaption: 'Head lease contract',
    dataPath: 'HeadLeaseContract$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_HEADLEASE || '5387', 10), menuItemType: 1,
    mainManFilterTag: 'HeadLeaseContract',
    dataText: 'Open head lease contract',
    listModeMenuItems: [], reloadFilter: true,
    childKeys: ['SubContract', 'ServiceContractBenificiary', 'LeaseContractRenegotiation',
                'LeaseContractUtilization', 'CostDistributionAgreement', 'ServiceContractDocument'],
  },
  LeaseContract: {
    processTag: 'PropertyManagement', processStepTag: 'LeaseContract',
    dataTag: 'LeaseContract', dataCaption: 'Lease contract', dataPath: 'LeaseContract$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_LEASE || '1328', 10), menuItemType: 1,
    mainManFilterTag: 'LeaseContract',
    dataText: 'Open lease contract',
    listModeMenuItems: [], reloadFilter: true,
  },
  SubLeaseContract: {
    processTag: 'PropertyManagement', processStepTag: 'LeaseContract',
    dataTag: 'SubLeaseContract', dataCaption: 'Sub lease contract',
    dataPath: 'SubLeaseContract$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_SUBLEASE || '5394', 10), menuItemType: 1,
    mainManFilterTag: 'SubLeaseContract',
    dataText: 'Open sub lease contract',
    listModeMenuItems: [], reloadFilter: true,
  },
  LeaseContractRenegotiation: {
    processTag: 'PropertyManagement', processStepTag: 'LeaseContract',
    dataTag: 'LeaseContractRenegotiation', dataCaption: 'Lease contract renegotiation',
    dataPath: 'LeaseContractRenegotiation$1$0',
    menuItemId: parseInt(__ENV.MENUITEM_RENEGOTIATION || '5417', 10), menuItemType: 1,
    mainManFilterTag: 'LeaseContractRenegotiation',
    dataText: 'Open lease contract renegotiation',
    listModeMenuItems: [], reloadFilter: true,
  },
};

// The landing module after login. On kommunedevcore the app lands on Buildings.
const LANDING = MODULES.Buildings;

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------
function tap(res) {
  recordApiError(res);
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
function GET(url, params)        { return tap(http.get(url, params)); }
function POST(url, body, params) { return tap(http.post(url, body, params)); }

const ajaxJson = () => ({ headers: {
  'Content-Type': 'application/json; charset=UTF-8',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'X-Requested-With': 'XMLHttpRequest',
} });
const ajaxForm = () => ({ headers: {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'X-Requested-With': 'XMLHttpRequest',
} });
const ajaxGet = () => ({ headers: {
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'X-Requested-With': 'XMLHttpRequest',
} });
const ajaxGetText = () => ({ headers: {
  'Accept': '*/*', 'X-Requested-With': 'XMLHttpRequest',
}, responseType: 'text' });
const ajaxJsonText = () => Object.assign({ responseType: 'text' }, ajaxJson());
// Bodies are discarded globally; BuildMyPage needs its markup back so the widget
// checksums can be parsed out of it.
const ajaxFormText = () => Object.assign({ responseType: 'text' }, ajaxForm());

// -e VERIFY=true logs the real DataTables row counts so a filter step can be proven to
// have narrowed the grid, rather than just answering 200. 1-VU use only: it keeps
// response bodies. This is how the bygst filter defect was isolated.
// Returns the DataTables row counts, or null when the response was not a grid payload
// at all. ALWAYS parses — the console line is what VERIFY gates, not the parsing.
//
// It used to return early unless VERIFY was set, which meant the row counts existed
// only in 1-VU smoke runs and every load run asserted nothing but HTTP 200. That is
// precisely the bygst failure mode: the server answers 200 with an EMPTY grid and no
// status check notices. Callers assert on the returned counts so the load run catches
// it too.
function verifyRows(label, res) {
  let total = null, filtered = null;
  try {
    const t = res.json('recordsTotal');
    const f = res.json('recordsFiltered');
    if (typeof t === 'number') total = t;
    if (typeof f === 'number') filtered = f;
  } catch (e) { /* not JSON — leave null, the caller's check fails */ }
  if (__ENV.VERIFY) {
    console.log(`[VERIFY] vu=${__VU} iter=${__ITER} ${label}: recordsTotal=${total === null ? '?' : total}`
      + ` recordsFiltered=${filtered === null ? '?' : filtered}`);
  }
  return { total: total, filtered: filtered };
}

// GetMMList bodies are KEPT (bodies are discarded globally). They have to be: the row
// counts above cannot be read from a discarded body, and asserting on status alone is
// the bug this library exists to avoid. The grid is capped at GRID_PAGE (100) rows, the
// same page the browser fetches, so this is bounded.
const listParams = () => ajaxJsonText();

// Build a form-urlencoded body with repeated Value[] entries, exactly as the
// CORE front-end sends for the three filter endpoints.
function filterFormBody(fields, values) {
  const parts = [];
  for (const k of Object.keys(fields)) parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(fields[k])}`);
  for (const v of values) parts.push(`Value%5B%5D=${encodeURIComponent(v)}`);
  return parts.join('&');
}

// ---------------------------------------------------------------------------
// STEP 1 — LOGIN (ASP.NET Core: antiforgery token, form-urlencoded, 302)
// ---------------------------------------------------------------------------
function extractToken(html) {
  const m = (html || '').match(/name="__RequestVerificationToken"[^>]*value="([^"]+)"/)
         || (html || '').match(/value="([^"]+)"[^>]*name="__RequestVerificationToken"/);
  return m ? m[1] : null;
}

export function login(user) {
  const username = (user && user.username) || USERNAME;
  const password = (user && user.password) || PASSWORD;
  let success = false;

  group('1. Login', function () {
    const t0 = Date.now();

    // The login page carries the antiforgery token in a hidden input.
    const page = GET(`${BASE_URL}/`, { responseType: 'text' });
    check(page, { 'login page 200': (r) => r.status === 200 });

    const token = extractToken(page.body);
    if (!token || !password) { errorRate.add(1); loginTrend.add(Date.now() - t0); return; }

    const tAuth = Date.now();
    const res = POST(`${BASE_URL}/`, {
      'UserName': username,
      'Password': password,
      '__RequestVerificationToken': token,
    }, { redirects: 0 });
    loginAuthTrend.add(Date.now() - tAuth);

    // Successful auth answers 302 -> /MMV2/Index
    let landing = res;
    if (res.status >= 300 && res.status < 400 && res.headers['Location']) {
      const loc = res.headers['Location'];
      const url = loc.indexOf('http') === 0 ? loc
                : loc.indexOf('/') === 0 ? `${BASE_URL}${loc}` : `${BASE_URL}/${loc}`;
      landing = GET(url);
    }

    success = check(landing, {
      'logged in (on Content page)': (r) => r.url.indexOf('/MMV2') !== -1,
      'login not bounced back':      (r) => !/\/$/.test(r.url) || r.url.indexOf('/MMV2') !== -1,
    });
    if (!success) { errorRate.add(1); loginTrend.add(Date.now() - t0); return; }

    // Shell XHRs the SPA fires once the content page loads.
    POST(`${BASE_URL}/restapi/Internal/KeepAlive`, '{}', ajaxJson());
    GET(`${API}/MMLayoutReadOnly/BuildMainMenu`, ajaxGet());
    POST(`${API}/MMLayoutReadOnly/GetUnreadCount`, '{}', ajaxJson());

    errorRate.add(false);
    loginTrend.add(Date.now() - t0);
  });

  return success;
}

export function loadLandingModule() {
  if (!LANDING) return true;
  return openModule(LANDING, 'Landing (post-login module)', landingTrend);
}

// ---------------------------------------------------------------------------
// STEP 2 — OPEN A GRID MODULE
//   Sequence captured live. Differences from the WebForms build:
//     GetMenuItemProcessItems and LoadMMFilterControl are GETs with query params,
//     BuildLayout moved to the ReadOnly controller, GetMMList takes a JSON body.
//   opts.keepList returns the grid body so a caller can read a record id from it.
// ---------------------------------------------------------------------------
export function openModule(mod, groupName, trend, opts) {
  opts = opts || {};
  let ok = false, us = '', listText = '';

  group(groupName || `Open ${mod.processTag}`, function () {
    const t0 = Date.now();
    const j = ajaxJson();

    POST(`${API}/MMLayoutReadOnly/GetMenuItemSteps`, JSON.stringify({ Tag: mod.processTag }), j);
    GET(`${API}/MMLayoutReadOnly/GetMenuItemProcessItems`
        + `?Parent=${encodeURIComponent(mod.processTag)}&Tag=${encodeURIComponent(mod.processStepTag)}`, ajaxGet());

    // Active-nav state. Required: the server scopes filter operations to whatever
    // it believes the active grid is (same behaviour as the WebForms build).
    saveToggle('ActiveDataStateV2', 'ActiveNavigationItem', mod.processTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStep${mod.processTag}`, mod.processStepTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStepItem${mod.processTag}.${mod.processStepTag}`, mod.dataTag);

    // InitMainLayout ISSUES the UniqueString — it is not client-generated. Everything
    // downstream (BuildLayout, the grid endpoints, the filter-control checksums) is
    // keyed on it, and the server 403s a UniqueString it did not hand out. Sending a
    // locally-invented one makes the grid calls fail as if auth had lapsed.
    const init = POST(`${API}/MMLayout/InitMainLayout`, JSON.stringify({
      UniqueString: '', MenuItemKey: mod.dataTag, SummaryID: 0,
      MenuItemID: mod.menuItemId, MenuItemTypeID: mod.menuItemType,
      ProcessTag: mod.processTag, ProcessStepTag: mod.processStepTag, SnapshotID: 0,
    }), ajaxJsonText());

    const layoutBody = (typeof init.body === 'string') ? init.body : '';
    try { us = init.json('UniqueString') || ''; } catch (e) { us = ''; }

    // Both filter controls, in the browser's order:
    //   type 3 = top location bar (Region / Portfolio / Site)
    //   type 2 = right-hand data-filter panel
    GET(`${API}/MMLayoutReadOnly/LoadMMFilterControl?tag=${encodeURIComponent(mod.dataTag)}&type=3`, ajaxGetText());
    GET(`${API}/MMLayoutReadOnly/LoadMMFilterControl?tag=${encodeURIComponent(mod.dataTag)}&type=2`, ajaxGetText());

    // The SPA echoes the InitMainLayout response back verbatim as the BuildLayout
    // request (byte-for-byte identical in the capture), so replay it rather than
    // rebuilding the container — that keeps this tenant-agnostic.
    const built = POST(`${API}/MMLayoutReadOnly/BuildLayout`, layoutBody, ajaxJsonText());

    // NAME TAG REQUIRED. This URL carries the per-iteration UniqueString AND a
    // cache-buster (_=Date.now()), so WITHOUT a name tag every single call becomes its
    // own metric time series. That is what blew past k6's 100k-series limit on bygst
    // run-059 and truncated the report. Same reason for the tags on the modal GETs.
    const headers = GET(`${APP}/restapi/List/GetMMListHeaders`
      + `?DataPath=${encodeURIComponent(mod.dataPath)}&UniqueString=${us}`
      + `&Gantt=False&PopupSQLListIndex=0&_=${Date.now()}`,
      Object.assign(ajaxGet(), { tags: { name: 'restapi/List/GetMMListHeaders' } }));

    const list = POST(`${APP}/restapi/List/GetMMList`, JSON.stringify(getMMListBody(mod, us, opts.search)), listParams());
    if (opts.keepList) listText = (typeof list.body === 'string') ? list.body : '';
    const rows = verifyRows(`${mod.dataTag} grid (unfiltered)`, list);

    // BuildLayout answers 200 even when it rejects the body, so assert on success —
    // otherwise a bad payload only surfaces as a 403 two calls later.
    let buildOk = false;
    try { buildOk = built.json('success') === true; } catch (e) { buildOk = false; }

    // 'grid returned data' is the content assertion. A grid that answers 200 with a body
    // that is not a DataTables payload (a login page, an error page, an empty string)
    // is the silent failure the status check above cannot see. opts.minRows additionally
    // requires actual rows, for grids known to be populated.
    const wantRows = (typeof opts.minRows === 'number') ? opts.minRows : null;
    ok = check(null, {
      [`${mod.processTag} UniqueString issued`]: () => us !== '',
      [`${mod.processTag} layout built`]:        () => buildOk,
      [`${mod.processTag} headers loaded`]:      () => headers.status === 200,
      [`${mod.processTag} grid loaded`]:         () => list.status === 200,
      [`${mod.dataTag} grid returned data`]:     () => rows.total !== null,
    });
    if (wantRows !== null) {
      const hasRows = check(null, {
        [`${mod.dataTag} grid has >= ${wantRows} rows`]: () => rows.total !== null && rows.total >= wantRows,
      });
      ok = ok && hasRows;
    }
    errorRate.add(!ok);
    (trend || navigateTrend).add(Date.now() - t0);
  });

  return opts.keepList ? { ok: ok, us: us, listText: listText } : ok;
}

export function saveToggle(section, key, value) {
  return POST(`${API}/MMLayoutReadOnly/saveToggleValue`,
    JSON.stringify({ MySection: section, MyKey: key, Value: String(value) }), ajaxJson());
}

// ---------------------------------------------------------------------------
// MY PAGE (DASHBOARD) — loads the dashboard with widgets (Scenario 1)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// MY PAGE (Dashboard)
//   Full sequence captured on kommunedevcore 2026-09-03:
//     GetMenuItemSteps -> 3x saveToggleValue -> InitMainLayout
//     -> BuildMyPage -> InitPortalAggregate x18 (CONCURRENT)
//
//   The previous version stopped after InitMainLayout, so it never loaded the
//   dashboard at all — it measured a navigation, not a My Page load. Worse, its two
//   checks were `() => true`, i.e. they passed unconditionally even if every request
//   500'd. Both are fixed here.
//
//   The widget fan-out is the heavy part and the reason this scenario exists: on
//   kommune at 250 VUs BuildMyPage succeeded only 4-8% of the time while login was
//   still at 93-96%.
//
//   ENCODING: BuildMyPage and InitPortalAggregate are FORM-URLENCODED on CORE, while
//   InitMainLayout is JSON — the same inversion seen elsewhere in this build.
// ---------------------------------------------------------------------------
export function openMyPage(groupName, trend) {
  let ok = false;
  group(groupName || 'My page (Dashboard)', function () {
    const t0 = Date.now();
    const j = ajaxJson();
    const mod = MODULES.MyPage;
    const sum = `MainSummary-${mod.summaryId}`;

    POST(`${API}/MMLayoutReadOnly/GetMenuItemSteps`, JSON.stringify({ Tag: mod.processTag }), j);

    saveToggle('ActiveDataStateV2', 'ActiveNavigationItem', mod.processTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStep${mod.processTag}`, sum);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStepItem${mod.processTag}.${sum}`, sum);

    // ProcessStepTag carries the summary id — bare 'MainSummary' is not what the UI sends.
    POST(`${API}/MMLayout/InitMainLayout`, JSON.stringify({
      UniqueString: '', MenuItemKey: sum, SummaryID: mod.summaryId,
      MenuItemID: 0, MenuItemTypeID: 2, ProcessTag: mod.processTag,
      ProcessStepTag: sum, SnapshotID: 0,
    }), j);

    ok = loadMyPageDashboard(mod);
    (trend || navigateTrend).add(Date.now() - t0);
  });

  return ok;
}

// BuildMyPage returns the widget markup; each widget renders an initPortalAggregate
// call whose 6th argument is a SERVER-ISSUED CHECKSUM. Omitting it makes the call fail
// — the identical defect found in the WebForms library on 2026-09-03, where every
// widget returned HTTP 500 and 'all dashboard widgets loaded' had been 0% on every run.
// Widget keys are PARSED from the response, so this adapts to whatever dashboard the
// tenant has configured rather than hardcoding snapshot ids.
function loadMyPageDashboard(mod) {
  const built = POST(`${API}/MMLayoutReadOnly/BuildMyPage`,
    `MainSummaryID=${mod.summaryId}&FilterValues=`, ajaxFormText());

  let ok = check(built, {
    'BuildMyPage 200': (r) => r.status === 200,
    'BuildMyPage no server error': (r) => r.status === 200 &&
      !/Server Error|Unhandled exception/i.test(String(r.body || '')),
  });

  // CORE returns RAW HTML here, not the {success, html} envelope used elsewhere.
  let html = '';
  try { html = built.json('html') || built.json('d') || ''; } catch (e) { html = ''; }
  if (!html && typeof built.body === 'string') html = built.body;
  // Checksums arrive with '+' written as + (same double-escaping as ComboboxData).
  html = unescapeJs(html);

  // Unlike the WebForms build, CORE does not pass literals to initPortalAggregate —
  // it emits a block of vars per widget and then calls
  //   initPortalAggregate(containerId, portalKey, mainModuleId, false, counterSteps, checksum)
  // so the values must be read from the assignments:
  //   var portalKey = 'Snapshot-4390';
  //   var mainModuleId = 883;
  //   var checksum = '1xRDto9f...=';
  const re = /var\s+portalKey\s*=\s*'([^']+)'\s*;[\s\S]{0,300}?var\s+mainModuleId\s*=\s*(\d+)\s*;[\s\S]{0,300}?var\s+checksum\s*=\s*'([^']*)'/g;
  const widgets = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    // The 4th argument is the literal `false` in every capture, so exclude is constant.
    widgets.push({ key: m[1], moduleId: parseInt(m[2], 10), exclude: false, checksum: m[3] });
  }
  if (!widgets.length && __ENV.DEBUG) {
    console.error(`[MYPAGE] no widgets parsed from BuildMyPage (len ${html.length}); `
      + `initPortalAggregate present: ${html.indexOf('initPortalAggregate') >= 0}`);
  }

  ok = check(null, { 'dashboard has widgets': () => widgets.length > 0 }) && ok;

  if (widgets.length) {
    // A browser fires these CONCURRENTLY. Batching reproduces the fan-out, which is
    // the load characteristic this scenario is meant to measure.
    const reqs = widgets.map((w) => ({
      method: 'POST',
      url: `${API}/MMLayoutReadOnly/InitPortalAggregate`,
      body: `PortalKey=${encodeURIComponent(w.key)}&MainModuleID=${w.moduleId}`
          + `&ExcludeLocation=${w.exclude}&Checksum=${encodeURIComponent(w.checksum)}`,
      params: ajaxForm(),
    }));
    const responses = http.batch(reqs);
    responses.forEach(recordApiError);
    const allOk = responses.every((r) => r.status === 200);
    ok = check(null, { 'all dashboard widgets loaded (200)': () => allOk }) && ok;
    if (__ENV.VERIFY) {
      console.log(`[VERIFY] vu=${__VU} iter=${__ITER} dashboard widgets=${widgets.length} allOk=${allOk}`);
    }
  }

  errorRate.add(!ok);
  return ok;
}

// ---------------------------------------------------------------------------
// DUAL ORGANISATION TREE  (HR -> Organisation overview -> Build organisation trees)
//   Captured on kommunedevcore 2026-09-07:
//     GetMenuItemSteps -> GetMenuItemProcessItems (GET) -> 3x saveToggleValue
//     -> InitMainLayout -> LoadMMFilterControl(type=2) -> BuildLayout
//     -> Graphical/Tree x2  (left child=false, right child=true)
//
//   Both trees come back in FULL in one call each — 465 nodes left, 768 right, ~330 KB
//   apiece on this tenant. That is the weight of this scenario; there is no paging.
//
//   Returns { ok, us, leftText, rightText } so a caller can pick a real node id out of
//   the live data (each node carries a_attr.serverid) instead of hardcoding a record.
// ---------------------------------------------------------------------------
export function openTree(mod, groupName, trend) {
  let ok = false, us = '', leftText = '', rightText = '';

  group(groupName || `Open ${mod.dataTag}`, function () {
    const t0 = Date.now();
    const j = ajaxJson();

    POST(`${API}/MMLayoutReadOnly/GetMenuItemSteps`, JSON.stringify({ Tag: mod.processTag }), j);
    GET(`${API}/MMLayoutReadOnly/GetMenuItemProcessItems`
        + `?Parent=${encodeURIComponent(mod.processTag)}&Tag=${encodeURIComponent(mod.processStepTag)}`, ajaxGet());

    saveToggle('ActiveDataStateV2', 'ActiveNavigationItem', mod.processTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStep${mod.processTag}`, mod.processStepTag);
    saveToggle('ActiveDataStateV2', `ActiveNavigationStepItem${mod.processTag}.${mod.processStepTag}`, mod.dataTag);

    // InitMainLayout ISSUES the UniqueString; both tree calls are keyed on it.
    const init = POST(`${API}/MMLayout/InitMainLayout`, JSON.stringify({
      UniqueString: '', MenuItemKey: mod.dataTag, SummaryID: 0,
      MenuItemID: mod.menuItemId, MenuItemTypeID: mod.menuItemType,
      ProcessTag: mod.processTag, ProcessStepTag: mod.processStepTag, SnapshotID: 0,
    }), ajaxJsonText());

    const layoutBody = (typeof init.body === 'string') ? init.body : '';
    try { us = init.json('UniqueString') || ''; } catch (e) { us = ''; }

    GET(`${API}/MMLayoutReadOnly/LoadMMFilterControl?tag=${encodeURIComponent(mod.dataTag)}&type=2`, ajaxGetText());

    // BuildLayout takes the InitMainLayout response echoed back verbatim.
    const built = POST(`${API}/MMLayoutReadOnly/BuildLayout`, layoutBody, ajaxJsonText());
    let buildOk = false;
    try { buildOk = built.json('success') === true; } catch (e) { buildOk = false; }

    const dp = encodeURIComponent(mod.dataPath);
    const treeParams = Object.assign({ responseType: 'text' }, ajaxGet());
    const left = GET(`${APPLOWER}/restapi/Graphical/Tree?parent=%23&datapath=${dp}`
      + `&uniquestring=${us}&child=false&treeid=${encodeURIComponent(mod.leftTreeId)}`,
      Object.assign({}, treeParams, { tags: { name: 'restapi/Graphical/Tree(left)' } }));
    const right = GET(`${APPLOWER}/restapi/Graphical/Tree?parent=%23&datapath=${dp}`
      + `&uniquestring=${us}&child=true&treeid=${encodeURIComponent(mod.rightTreeId)}`,
      Object.assign({}, treeParams, { tags: { name: 'restapi/Graphical/Tree(right)' } }));

    leftText  = (typeof left.body === 'string')  ? left.body  : '';
    rightText = (typeof right.body === 'string') ? right.body : '';

    const leftNodes  = (leftText.match(/"serverid":"\d+"/g)  || []).length;
    const rightNodes = (rightText.match(/"serverid":"\d+"/g) || []).length;

    ok = check(null, {
      [`${mod.dataTag} UniqueString issued`]: () => us !== '',
      [`${mod.dataTag} layout built`]:        () => buildOk,
      // Assert on CONTENT, not status. A 200 with an empty tree is the failure mode
      // that hid the broken auth-once sessions for weeks.
      'left tree returned nodes':  () => leftNodes > 0,
      'right tree returned nodes': () => rightNodes > 0,
    });
    if (__ENV.VERIFY) {
      console.log(`[VERIFY] vu=${__VU} iter=${__ITER} tree nodes left=${leftNodes} right=${rightNodes}`);
    }
    errorRate.add(!ok);
    (trend || treeTrend).add(Date.now() - t0);
  });

  return { ok: ok, us: us, leftText: leftText, rightText: rightText };
}

// Right-click a tree node. Queried with the NODE's tag (e.g. 'Organisation'), which is
// not always the modal's tag (e.g. 'Company'). The response HTML carries the
// UniqueString that the subsequent LoadMMModalControl must use — another server-issued
// token, like the layout UniqueString and the dashboard checksum. Returns it, or ''.
export function populateTreeActionMenu(nodeTag, dataId, groupName) {
  let us = '';
  const res = GET(`${API}/MMLayoutReadOnly/PopulateTreeActionMenu`
    + `?sDataTag=${encodeURIComponent(nodeTag)}&lDataID=${dataId}`, ajaxGetText());

  let html = '';
  try { html = res.json('html') || res.json('d') || ''; } catch (e) { html = ''; }
  if (!html && typeof res.body === 'string') html = res.body;
  // The menu markup HTML-encodes its quotes as &#x27;, so the JS string literals are
  // not literal quotes until decoded. Same trap as the + in the dashboard and
  // ComboboxData checksums — decode before matching or the regex silently finds nothing.
  html = unescapeJs(html)
    .replace(/&#x27;/g, "'").replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&');

  // openMyModal('Company','Company$1$50421','50421','<uniquestring>','UseDefaultViewKey',...)
  const m = html.match(/openMyModal\(\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'([0-9a-fA-F]{16,40})'/);
  if (m) us = m[1];
  else if (__ENV.DEBUG) {
    console.error(`[TREEMENU] no UniqueString for ${nodeTag}/${dataId} (status ${res.status}, `
      + `len ${html.length}, openMyModal present: ${html.indexOf('openMyModal') >= 0})`);
  }

  const ok = check(null, {
    [`${groupName || nodeTag} action menu loaded`]: () => res.status === 200 && us !== '',
  });
  errorRate.add(!ok);
  return us;
}

// ---------------------------------------------------------------------------
// CLICK A MY PAGE WIDGET
//   Tells the server which saved snapshot was clicked, BEFORE its grid is opened.
//   Verified: POST /api/MMLayoutReadOnly/SelectSnapshotFromMyPage, body SnapshotID=<id>
//   (form-urlencoded). Without it the grid loads unscoped — i.e. not the widget's data.
// ---------------------------------------------------------------------------
export function selectSnapshotFromMyPage(snapshotId) {
  const res = POST(`${API}/MMLayoutReadOnly/SelectSnapshotFromMyPage`,
    `SnapshotID=${snapshotId}`, ajaxForm());
  const ok = check(res, { [`snapshot ${snapshotId} selected`]: (r) => r.status === 200 });
  errorRate.add(!ok);
  return ok;
}


// GetMMList takes a JSON DataTables payload on CORE (form-urlencoded on bygst).
// The columns array is sent as an index-only list; the server does not appear to
// require the per-column names, and omitting them keeps this tenant-agnostic.
function getMMListBody(mod, us, search) {
  const columns = [];
  for (let i = 0; i < 21; i++) {
    columns.push({ data: i, name: null, searchable: true, orderable: i > 2, search: { value: '', regex: false } });
  }
  return {
    draw: 1, columns: columns, order: [],
    start: 0, length: GRID_PAGE,
    search: { value: search || '', regex: false },
    DataPath: mod.dataPath, UniqueString: us,
    Gantt: 'False', PopupSQLListIndex: 0,
    GroupBy: '', ExtraParams: '', IsSublist: 'False',
  };
}

// ---------------------------------------------------------------------------
// STEP 3 — OPEN A GRID RECORD -> MODAL
//   LoadMMModalControl, then (Sites only) GetChildCount, then the GIS pair:
//   BuildGraphicalModal + three GetLayerPoints layers. Captured live.
//   Keys are PascalCase here; the bygst .asmx build takes them lowercase.
//   opts.mainId: the active site's GroundID, which is what the browser passes as
//   GetLayerPoints' MainID (NOT the opened record's id). 0 when no site is selected.
// ---------------------------------------------------------------------------
const GIS_LAYERS = [
  { typeId: 7,  key: 'openarea' },
  { typeId: 8,  key: 'openareaoutlines' },
  { typeId: 15, key: 'LightPole' },
];

export function openRecordModal(mod, id, us, groupName, trend, opts) {
  opts = opts || {};
  let ok = false;
  group(groupName || `Open ${mod.dataTag} record`, function () {
    const t0 = Date.now();
    const datapath = `${mod.dataTag}$1$${id}`;
    const uniq = us || '';
    const mainId = opts.mainId || 0;

    const built = POST(`${API}/MMLayout/LoadMMModalControl`, JSON.stringify({
      Tag: mod.dataTag, DataPath: datapath, Id: String(id), UniqueString: uniq,
      ViewKey: 'UseDefaultViewKey', ExtraParameters: '', NoRestore: '', Modal: '1',
      ContentType: '7', DataText: mod.dataText || `Open ${mod.dataCaption || mod.dataTag}`,
      IdSelection: [], TemplateId: 0, SaveButtonValue: 0, EditMode: 1, UserRoleID: 0, PopupSQLListIndex: 0,
    }), ajaxJsonText());

    if (mod.childKeys && mod.childKeys.length) {
      POST(`${API}/MMLayoutReadOnly/GetChildCount`, JSON.stringify({
        UniqueString: uniq, DataPath: datapath, ChildKeys: mod.childKeys,
      }), ajaxJson());
    }

    // Not every record type loads the GIS pane. The work-order modal fires neither of
    // these (verified on kommunedevcore 2026-09-09), so sending them would invent load
    // the real client never generates. Set skipGis on the module to opt out.
    if (mod.skipGis) {
      ok = check(built, {
        'modal loaded (200)':    (r) => r.status === 200,
        'modal no server error': (r) => r.status === 200 && !/Server Error|Unhandled exception/i.test(String(r.body || '')),
      });
      errorRate.add(!ok);
      (trend || recordModalTrend).add(Date.now() - t0);
      return;
    }

    // Name-tagged: the URL embeds the UniqueString and the record's DataPath, so it is
    // unique on every single open. Untagged, one series per record open. See the note
    // on GetMMListHeaders in openModule().
    GET(`${APP}/restapi/Graphical/BuildGraphicalModal?selected=gis`
      + `&UniqueString=${uniq}&DataPath=${encodeURIComponent(datapath)}`
      + `&ActionKey=&ContainerLocation=1&SaveSelectedState=false`,
      Object.assign(ajaxGet(), { tags: { name: 'restapi/Graphical/BuildGraphicalModal' } }));

    GIS_LAYERS.forEach(function (layer) {
      GET(`${APPLOWER}/restapi/Graphical/GetLayerPoints?Tag=&UniqueString=`
        + `&TypeID=${layer.typeId}&Key=${layer.key}&MainID=${mainId}`
        + `&AppUserName=&AppPassword=&Districts=&CheckwordID=&CheckwordItems=`
        + `&Grades=&OrganisationID=&EmployeeID=`,
        Object.assign(ajaxGet(), { tags: { name: `restapi/Graphical/GetLayerPoints(${layer.key})` } }));
    });

    ok = check(built, {
      'modal loaded (200)':    (r) => r.status === 200,
      'modal no server error': (r) => r.status === 200 && !/Server Error|Unhandled exception/i.test(String(r.body || '')),
    });
    errorRate.add(!ok);
    (trend || recordModalTrend).add(Date.now() - t0);
  });
  return ok;
}

// ---------------------------------------------------------------------------
// RESOLVE A DROPDOWN VALUE BY NAME -> id
//   LoadMMFilterControl (GET) returns the control HTML carrying each dropdown's
//   DataPath / UniqueString / server-issued checksum. Replay the dropdown's own
//   ComboboxData call with q=<name> and match on Name. Cached per VU.
//   opts.type: '3' = MainManFilter bar (Site), '2' = data-filter panel (Municipality).
// ---------------------------------------------------------------------------
const _resolved = {};
function reEscape(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// The markup embeds the checksum inside a JS string literal, and ASP.NET Core escapes
// '+' and friends as + there. JSON.parse only strips one layer, so those arrive
// as six literal characters; the browser's JS engine is what unescapes them. Doing the
// same here — otherwise ComboboxData 403s on a corrupted checksum.
function unescapeJs(s) {
  return String(s).replace(/\\u([0-9a-fA-F]{4})/g, function (_, hex) {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

export function resolveFilterId(mod, controlToken, name, opts) {
  opts = opts || {};
  if (!name) return null;
  const ck = `${mod.dataTag}:${controlToken}:${name}`;
  if (_resolved[ck] !== undefined) return _resolved[ck];

  let id = null;
  group(opts.groupName || `Resolve ${controlToken} '${name}'`, function () {
    const t0 = Date.now();
    const fc = GET(`${API}/MMLayoutReadOnly/LoadMMFilterControl`
      + `?tag=${encodeURIComponent(mod.dataTag)}&type=${opts.type || '2'}`, ajaxGetText());

    // CORE answers {"success":true,"html":"<markup>"}. json() returns undefined for a
    // missing key rather than throwing, so fall through explicitly — reading 'd' (the
    // .asmx wrapper) first would silently yield an empty string on every call.
    let html = '';
    try { html = fc.json('html') || fc.json('d') || ''; } catch (e) { html = ''; }
    if (!html && typeof fc.body === 'string') html = fc.body;

    const re = new RegExp("DataPath:\\s*'([^']*" + reEscape(controlToken) +
      "[^']*)'\\s*,\\s*UniqueString:\\s*'([^']*)'[\\s\\S]{0,240}?checksum:\\s*'([^']*)'");
    const mm = re.exec(html);
    if (!mm && DEBUG) {
      const tokens = (html.match(/DataPath:\s*'([^']+)'/g) || []).map((s) => s.replace(/DataPath:\s*'|'/g, ''));
      console.log(`[RESOLVE NO-TOKEN] '${controlToken}' not in filter HTML (len ${html.length}). Present: ${JSON.stringify(tokens)}`);
    }

    if (mm) {
      const url = `${APPLOWER}/restapi/List/ComboboxData?DataPath=${encodeURIComponent(unescapeJs(mm[1]))}`
        + `&UniqueString=${mm[2]}&p=1&q=${encodeURIComponent(name)}`
        + `&checksum=${encodeURIComponent(unescapeJs(mm[3]))}`;
      // Name-tagged: URL carries a UniqueString + checksum, unique per VU.
      const cb = GET(url, Object.assign(ajaxJsonText(), { tags: { name: 'restapi/List/ComboboxData' } }));
      try {
        const arr = cb.json('data') || [];
        // Exact match by default. opts.prefix allows matching on a leading fragment,
        // needed where the option label is long and the test spec quotes it truncated —
        // e.g. the site "Affaldscenter, AffaldVarme, Center for Miljo og En...". Exact
        // matching silently returns null there, and the caller then skips the step.
        const want = String(name).toLowerCase().trim();
        const hit = opts.prefix
          ? arr.find((o) => o && o.Name && o.Name.toLowerCase().trim().indexOf(want) === 0)
          : arr.find((o) => o && o.Name && o.Name.toLowerCase().trim() === want);
        if (hit) id = hit.ID;
        if (id === null && DEBUG) {
          console.log(`[RESOLVE MISS] ${controlToken} '${name}' not in ${arr.length}: ` +
            JSON.stringify(arr.slice(0, 30).map((o) => o && o.Name).filter(Boolean)));
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

// ---------------------------------------------------------------------------
// FILTERS — form-urlencoded with repeated Value[] entries on CORE.
//   The location bar has THREE dropdowns here (Region / Portfolio / Site);
//   the WebForms build has two.
// ---------------------------------------------------------------------------
// opts.minRows — assert the reloaded grid still has at least N rows. Use it on the
// CLEAR / "show all" leg of a filter pair, where an empty grid can only mean the
// session or the filter state is broken. Omit it on the APPLY leg, where zero matches
// is a legitimate answer.
export function applyLocationFilter(mod, groundId, us, groupName, trend, opts) {
  opts = opts || {};
  let ok = false;
  group(groupName || `Location filter ${mod.dataTag}`, function () {
    const t0 = Date.now();

    const body = filterFormBody(
      { DataTag: mod.mainManFilterTag || mod.dataTag, ControlIDChanged: 'MainManFilter_TFGroundID' },
      [
        'MainManFilter_TFRegionID#0',
        'MainManFilter_TFMainGroupID#0',
        `MainManFilter_TFGroundID#${groundId}`,
        'MainManFilter_TFMainID#0',
      ]);
    POST(`${API}/MMLayout/RefreshMainManFilter`, body, ajaxForm());

    const list = POST(`${APP}/restapi/List/GetMMList`, JSON.stringify(getMMListBody(mod, us)), listParams());
    const rows = verifyRows(`${mod.dataTag} after location filter GroundID=${groundId}`, list);
    ok = check(list, {
      [`${mod.dataTag} grid reloaded after location filter`]: (r) => r.status === 200,
      [`${mod.dataTag} location filter returned a grid`]:     () => rows.total !== null,
    });
    if (typeof opts.minRows === 'number') {
      ok = check(null, {
        [`${mod.dataTag} location filter kept >= ${opts.minRows} rows`]:
          () => rows.total !== null && rows.total >= opts.minRows,
      }) && ok;
    }
    errorRate.add(!ok);
    (trend || filterTrend).add(Date.now() - t0);
  });
  return ok;
}

export function applyDataFilter(mod, controlIdChanged, values, us, groupName, trend, opts) {
  opts = opts || {};
  let ok = false;
  group(groupName || `Data filter ${mod.dataTag}`, function () {
    const t0 = Date.now();
    // opts.extraFields: extra top-level form fields some grids send alongside DataTag,
    // e.g. the O&M work-order filter posts TemplateID=0.
    const body = filterFormBody(
      Object.assign({ DataTag: mod.dataTag, ControlIDChanged: controlIdChanged }, opts.extraFields || {}),
      values);
    POST(`${API}/MMLayout/RefreshDataFilter`, body, ajaxForm());

    const list = POST(`${APP}/restapi/List/GetMMList`, JSON.stringify(getMMListBody(mod, us)), listParams());
    const rows = verifyRows(`${mod.dataTag} after data filter ${controlIdChanged}`, list);
    ok = check(list, {
      [`${mod.dataTag} grid reloaded after data filter`]: (r) => r.status === 200,
      [`${mod.dataTag} data filter returned a grid`]:     () => rows.total !== null,
    });
    if (typeof opts.minRows === 'number') {
      ok = check(null, {
        [`${mod.dataTag} data filter kept >= ${opts.minRows} rows`]:
          () => rows.total !== null && rows.total >= opts.minRows,
      }) && ok;
    }
    errorRate.add(!ok);
    (trend || filterTrend).add(Date.now() - t0);
  });
  return ok;
}

export function clearDataFilter(mod, values, us, groupName, trend, opts) {
  opts = opts || {};
  let ok = false;
  group(groupName || `Clear data filter ${mod.dataTag}`, function () {
    const t0 = Date.now();
    const body = filterFormBody(
      Object.assign({ DataTag: mod.dataTag }, opts.extraFields || {}), values);
    POST(`${API}/MMLayout/EmptyDataFilter`, body, ajaxForm());

    const list = POST(`${APP}/restapi/List/GetMMList`, JSON.stringify(getMMListBody(mod, us)), listParams());
    const rows = verifyRows(`${mod.dataTag} after filter clear`, list);
    ok = check(list, {
      [`${mod.dataTag} grid reloaded after filter clear`]: (r) => r.status === 200,
      [`${mod.dataTag} filter clear returned a grid`]:     () => rows.total !== null,
    });
    if (typeof opts.minRows === 'number') {
      ok = check(null, {
        [`${mod.dataTag} filter clear restored >= ${opts.minRows} rows`]:
          () => rows.total !== null && rows.total >= opts.minRows,
      }) && ok;
    }
    errorRate.add(!ok);
    (trend || filterTrend).add(Date.now() - t0);
  });
  return ok;
}

// Re-fetch the grid with no filter change. The client does this after layout changes
// that reflow the list — e.g. pinning the filter panel fires exactly one GetMMList
// (verified on kommunedevcore 2026-09-09) and nothing else.
export function reloadGrid(mod, us, groupName, trend, opts) {
  opts = opts || {};
  let ok = false;
  group(groupName || `Reload ${mod.dataTag} grid`, function () {
    const t0 = Date.now();
    const list = POST(`${APP}/restapi/List/GetMMList`, JSON.stringify(getMMListBody(mod, us)), listParams());
    const rows = verifyRows(`${mod.dataTag} after grid reload`, list);
    ok = check(list, {
      [`${mod.dataTag} grid reloaded`]:            (r) => r.status === 200,
      [`${mod.dataTag} grid reload returned data`]: () => rows.total !== null,
    });
    if (typeof opts.minRows === 'number') {
      ok = check(null, {
        [`${mod.dataTag} grid reload kept >= ${opts.minRows} rows`]:
          () => rows.total !== null && rows.total >= opts.minRows,
      }) && ok;
    }
    errorRate.add(!ok);
    (trend || navigateTrend).add(Date.now() - t0);
  });
  return ok;
}

// ---------------------------------------------------------------------------
// LOGOUT — /MMV2/MMV2Logout/Logout redirects to the login page.
// ---------------------------------------------------------------------------
export function logout() {
  let ok = false;
  group('Logout', function () {
    const t0 = Date.now();
    const res = GET(`${APP}/MMV2Logout/Logout`);
    ok = check(res, { 'logged out (back on login)': (r) => r.status === 200 && r.url.indexOf('/MMV2') === -1 });
    errorRate.add(!ok);
    logoutTrend.add(Date.now() - t0);
  });
  return ok;
}

// ---------------------------------------------------------------------------
// OPTIONS + REPORT
// ---------------------------------------------------------------------------
export function defaultOptions() {
  return {
    discardResponseBodies: true,
    thresholds: {
      http_req_duration: ['p(95)<3000'],
      http_req_failed:   ['rate<0.01'],
      business_errors:   ['rate<0.01'],
      step_login_duration:       ['p(95)<10000'],
      step_landing_duration:     ['p(95)<5000'],
      step_navigate_duration:    ['p(95)<5000'],
      step_open_record_duration: ['p(95)<5000'],
      step_filter_duration:      ['p(95)<5000'],
      step_logout_duration:      ['p(95)<2000'],
    },
  };
}

const REPORT_PREFIX = __ENV.REPORT_PREFIX || 'summary';

function fmtMs(v) {
  if (v === undefined || v === null) return '-';
  return v >= 1000 ? (v / 1000).toFixed(2) + ' s' : Math.round(v) + ' ms';
}

function buildHtml(data) {
  const m = data.metrics || {};
  const cPass = (m.checks && m.checks.values.passes) || 0;
  const cFail = (m.checks && m.checks.values.fails) || 0;
  const reqs  = (m.http_reqs && m.http_reqs.values) || {};
  const failRate = (m.http_req_failed && m.http_req_failed.values.rate) || 0;
  const bizRate  = (m.business_errors && m.business_errors.values.rate) || 0;
  const srvErr   = (m.known_server_errors && m.known_server_errors.values.count) || 0;

  const thrRows = Object.keys(data.metrics || {}).flatMap((name) => {
    const th = (data.metrics[name] || {}).thresholds;
    if (!th) return [];
    return Object.keys(th).map((cond) => {
      const okFlag = !th[cond].ok === false;
      return `<tr><td>${name}</td><td>${cond}</td><td class="${okFlag ? 'pass' : 'fail'}">${okFlag ? 'PASS' : 'FAIL'}</td></tr>`;
    });
  }).join('');

  const trendRows = Object.keys(m).filter((k) => m[k].type === 'trend').sort().map((n) => {
    const v = m[n].values;
    return `<tr><td>${n}</td><td>${fmtMs(v.avg)}</td><td>${fmtMs(v.med)}</td><td>${fmtMs(v['p(95)'])}</td><td>${fmtMs(v.max)}</td></tr>`;
  }).join('');

  // --- Server API errors, per endpoint, per observed status ---------------
  // Data-driven: only endpoints that ACTUALLY failed this run get a row, so a clean
  // run shows a green line rather than a table of zeros.
  const WHAT = {
    0:   'No response — the connection was refused, reset, or timed out before the server answered. Under load this means the web tier stopped accepting connections.',
    400: 'Bad Request — the server rejected the payload.',
    401: 'Unauthorized — the session was not accepted.',
    403: 'Forbidden — the account lacks rights for this call, or the server did not recognise the layout UniqueString.',
    404: 'Not Found — this endpoint does not exist on the server.',
    429: 'Too Many Requests — the server is rate-limiting.',
    500: 'Internal Server Error — an unhandled exception in the application.',
    502: 'Bad Gateway — a proxy could not reach the application.',
    503: 'Service Unavailable — the environment rejecting requests under load, typically across many endpoints at once.',
    504: 'Gateway Timeout — a proxy gave up waiting for the application.',
  };

  const errRows = [], cleanLabels = [];
  let errTotal = 0;
  ENDPOINTS.forEach(function (e) {
    const cnt = (m[`api_err_${e.key}`] && m[`api_err_${e.key}`].values.count) || 0;
    if (!cnt) { cleanLabels.push(e.label); return; }
    errTotal += cnt;
    const seen = [];
    OBSERVED_STATUSES.concat(['other']).forEach(function (s) {
      const c = (m[`api_err_${e.key}_${s}`] && m[`api_err_${e.key}_${s}`].values.count) || 0;
      if (c > 0) seen.push({ status: s, count: c });
    });
    seen.sort((a, b) => b.count - a.count);
    const statusCell = seen.map((s) => `${s.status} &times;${s.count}`).join('<br>');
    const nature = seen.map((s) => WHAT[s.status] || `Observed HTTP ${s.status}.`).join(' ');
    errRows.push(`<tr><td>${e.label}</td><td class="fail">${statusCell}</td><td>${cnt}</td><td>${nature}</td></tr>`);
  });
  errRows.sort();

  const errTable = errRows.length
    ? `<table><tr><th>Endpoint</th><th>Status</th><th>Occurrences</th><th>Nature</th></tr>${errRows.join('')}</table>`
    : `<p class="pass" style="font-size:13px">No server API errors recorded this run.</p>`;
  const cleanNote = (errRows.length && cleanLabels.length)
    ? `<p style="font-size:12px;color:#15803d;margin:8px 0 0">Zero errors on: ${cleanLabels.join(', ')}.</p>`
    : '';

  const errSection = `
<h2>Server API errors observed</h2>
<p style="font-size:12px;color:#515b72;margin:6px 0 10px">
 Every endpoint this scenario calls, with the status codes actually returned this run.
 Unlike the bygst report, these are <b>counted in</b> the <i>http failed</i> figure above and
 not held out of the SLA: on this tenant the filter endpoints work correctly, so there is no
 known-broken endpoint to exclude — and during a capacity test, excluding errors would hide
 the finding. <b>Total failed requests: ${errTotal}.</b>
</p>
${errTable}
${cleanNote}`;

  return `<!doctype html><html><head><meta charset="utf-8"><title>K6 Performance Report — CORE</title>
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
<h1>K6 Performance Report — MainManager CORE</h1>
<p style="font-size:12px;color:#515b72">Target: ${BASE_URL}</p>
<div class="cards">
 <div class="card"><div class="n ${cFail === 0 ? 'pass' : 'fail'}">${cPass}/${cPass + cFail}</div><div class="l">checks passed</div></div>
 <div class="card"><div class="n">${reqs.count || 0}</div><div class="l">total requests</div></div>
 <div class="card"><div class="n ${failRate < 0.01 ? 'pass' : 'fail'}">${(failRate * 100).toFixed(2)}%</div><div class="l">http failed</div></div>
 <div class="card"><div class="n ${bizRate < 0.01 ? 'pass' : 'fail'}">${(bizRate * 100).toFixed(2)}%</div><div class="l">business errors</div></div>
 <div class="card"><div class="n ${srvErr === 0 ? 'pass' : 'fail'}">${srvErr}</div><div class="l">server API errors</div></div>
</div>
<h2>SLA thresholds</h2>
<table><tr><th>Metric</th><th>Condition</th><th>Result</th></tr>${thrRows || '<tr><td colspan=3>none</td></tr>'}</table>
${errSection}
<h2>Latency by step</h2>
<table><tr><th>Step / metric</th><th>avg</th><th>median</th><th>p95</th><th>max</th></tr>${trendRows}</table>
<p style="color:#999;font-size:11px;margin-top:24px">Generated by lib/mainmanager-core.js. Thresholds are the agreed SLA, not a description of the test environment.</p>
</body></html>`;
}

export function handleSummary(data) {
  const dir = __ENV.REPORT_DIR;
  const out = {};
  const html = buildHtml(data);
  const json = JSON.stringify(data, null, 2);
  if (dir) {
    out[`${dir}/summary.html`] = html;
    out[`${dir}/summary.json`] = json;
  } else {
    out[`${REPORT_PREFIX}-latest.html`] = html;
    out[`${REPORT_PREFIX}-latest.json`] = json;
  }
  out['stdout'] = '\n';
  return out;
}

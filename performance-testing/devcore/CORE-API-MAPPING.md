# kommunedevcore (MainManager CORE) — API mapping for Scenario 2

Captured live in a browser on 2026-08-26. Target: `https://kommunedevcore.mainmanager.is`
Version banner: **20.25.1.CORE** (ASP.NET Core, vs WebForms on bygst).

Credentials that work: `suhsh` / (password: see config-core.json). **No OTP prompt** — the `VerifyOTP`
form exists on the login page but was not triggered.

---

## 1. Endpoint mapping

| Purpose | bygst (WebForms) | kommunedevcore (CORE) | Method change |
|---|---|---|---|
| Login page | `GET /mmv2/MMV2Login.aspx` | `GET /` | — |
| Login submit | `POST /mmv2/MMV2Login.aspx` | `POST /` | — |
| Landing after login | `/mmv2/MMV2Content.aspx` | `/MMV2/Index` | — |
| Main menu | `POST …MMLayoutReadOnly.asmx/BuildMainMenu` | `GET /api/MMLayoutReadOnly/BuildMainMenu` | POST→**GET** |
| Unread count | `POST …/GetUnreadCount` | `POST /api/MMLayoutReadOnly/GetUnreadCount` | — |
| Menu steps | `POST …/GetMenuItemSteps` | `POST /api/MMLayoutReadOnly/GetMenuItemSteps` | — |
| Menu items | `POST …/GetMenuItemProcessItems` | `GET /api/MMLayoutReadOnly/GetMenuItemProcessItems?Parent=..&Tag=..` | POST→**GET** |
| Nav state | `POST …/saveToggleValue` | `POST /api/MMLayoutReadOnly/saveToggleValue` | — |
| Layout init | `POST …MMLayout.asmx/InitMainLayout` | `POST /api/MMLayout/InitMainLayout` | — |
| Filter control | `POST …/LoadMMFilterControl` | `GET /api/MMLayoutReadOnly/LoadMMFilterControl?tag=..&type=..` | POST→**GET** |
| Build layout | `POST …/BuildLayout` | `POST /api/MMLayoutReadOnly/BuildLayout` | moved to ReadOnly |
| Grid headers | `GET /mmv2/restapi/List/GetMMListHeaders` | `GET /MMV2/restapi/List/GetMMListHeaders` | — |
| Grid data | `POST /mmv2/restapi/List/GetMMList` | `POST /MMV2/restapi/List/GetMMList` | — |
| Record modal | `POST …MMLayout.asmx/LoadMMModalControl` | `POST /api/MMLayout/LoadMMModalControl` | — |
| Child counts | `POST …/GetChildCount` | `POST /api/MMLayoutReadOnly/GetChildCount` | — |
| Graphical modal | `POST …/BuildGraphicalModal` | `GET /MMV2/restapi/Graphical/BuildGraphicalModal?selected=gis&…` | POST→**GET** |
| Map layers | `GET /mmv2/restapi/Graphical/GetLayerPoints` | `GET /mmv2/restapi/Graphical/GetLayerPoints` | — (fires 3× with different TypeID/Key) |
| Site filter | `POST …MMLayout.asmx/RefreshMainManFilter` | `POST /api/MMLayout/RefreshMainManFilter` | — |
| Data filter | `POST …/RefreshDataFilter` | `POST /api/MMLayout/RefreshDataFilter` | — |
| Clear filter | `POST …/EmptyDataFilter` | `POST /api/MMLayout/EmptyDataFilter` | — |
| Logout | `GET /mmv2/MMV2Logout.aspx` | `GET /MMV2/MMV2Logout/Logout` | — |
| Keep-alive | (n/a) | `POST /restapi/Internal/KeepAlive` (once after login) | new |
| IsShortcut | (removed) | not an endpoint — a `false` field in the BuildLayout body | — |

Note the inconsistent casing: `/MMV2/restapi/...` for List and BuildGraphicalModal,
but `/mmv2/restapi/...` for GetLayerPoints. Both appear to work.

---

## 2. BIGGEST CHANGE — request bodies are form-urlencoded, not JSON

bygst sends JSON. CORE sends `application/x-www-form-urlencoded` with `Value[]` arrays.

**Login** — `POST /`
```
UserName=suhsh&Password=Testing%40%2112345&__RequestVerificationToken=<token>
```
The token comes from a hidden input on `GET /`. Response is a **302** to `/MMV2/Index`.
Cookies in play: `.AspNetCore.Antiforgery.*`, `.AspNetCore.Session`.

**RefreshMainManFilter** — `POST /api/MMLayout/RefreshMainManFilter`
```
DataTag=Building
&ControlIDChanged=MainManFilter_TFGroundID
&Value[]=MainManFilter_TFRegionID#0
&Value[]=MainManFilter_TFMainGroupID#0
&Value[]=MainManFilter_TFGroundID#58334
&Value[]=MainManFilter_TFMainID#0
```
Differences from bygst:
- form-urlencoded, `Value[]` notation
- `DataTag` is the **grid's** tag (`Building`), not `Ground`
- extra **`MainManFilter_TFRegionID`** field (bygst has no Region dropdown)

**EmptyDataFilter** — `POST /api/MMLayout/EmptyDataFilter` (captured on the Ground grid)
```
DataTag=Ground
&Value[]=DataFilter_TFSearchText#
&Value[]=DataFilter_TFDateFilterID#1001
&Value[]=DataFilter_TFTimeLimitINPUT#All years
&Value[]=DataFilter_TFTimeLimit#;
&Value[]=DataFilter_TFUsageID#0
&Value[]=DataFilter_TFFacilityUsageID#0
&Value[]=DataFilter_TFIsLocatedOnMap#0
&Value[]=DataFilter_TFMunicipalityID#140
&Value[]=DataFilter_TFCityID#0
&Value[]=DataFilter_TFZipCodeID#0
&Value[]=DataFilter_TFSubtypeID#
&Value[]=DataFilter_TFSpecialInformationID#0
&Value[]=DataFilter_TFRefurbishmentID#0
&Value[]=DataFilter_TFResponseDemandSelection#
&Value[]=DataFilter_TFContactID#0
&Value[]=DataFilter_TFExternalStatusID#0
&Value[]=DataFilter_TFEFCategoryID1#0
&Value[]=DataFilter_TFEFScopeCategoryID1#0
&Value[]=DataFilter_TFShowInactiveFilterID#0
```
The data-filter field list is **completely different** from bygst's. bygst has
MainTypeID / PreservationConditions / OwningConditionID / ManagerID / ManufacturerID /
EnergyLabel*; CORE has UsageID / FacilityUsageID / SpecialInformationID /
RefurbishmentID / ResponseDemandSelection / ExternalStatusID / EFCategoryID1 /
EFScopeCategoryID1.

**STILL TO CAPTURE:** the Buildings-grid version of this list (the above is the
Ground grid). Capture by applying the Municipality filter on the Buildings grid.

---

## 3. Test data (confirmed live)

| | Value |
|---|---|
| Site name | `AKTIVITETSHUSET` |
| Site GroundID | **58334** |
| Municipality name | `Aarhus` |
| Municipality id | **75** |
| Sites grid, unfiltered | 4,628 rows |
| Buildings grid, unfiltered | 4,433 rows |
| Buildings filtered to site AKTIVITETSHUSET | **1 row** |
| Buildings filtered to municipality Aarhus | **798 rows** |

Every filter step demonstrably narrows AND restores, verified from the k6 run itself
via `-e VERIFY=true` (which logs DataTables `recordsTotal`/`recordsFiltered`):

```
Building grid (unfiltered)                      4433
after location filter GroundID=58334               1
after location filter GroundID=0  (show all)    4433
after data filter MunicipalityID=75              798
after filter clear                              4433
```

This is a behavioural difference from bygst, where the same filter calls answer 200
but leave the row count unchanged (see FILTER-ISSUE-REPORT.md). The CORE build is
correct here.

An earlier note in this file recorded "Buildings unfiltered = 798" — that reading was
taken with the Aarhus municipality filter already applied and has been corrected above.

---

## 4. UI differences (only relevant for future browser captures)

| | bygst | CORE |
|---|---|---|
| Open-record button testid | `action-btn-UseDefaultViewKey` | `btn-list-action-UseDefaultViewKey` |
| Location dropdowns | MainGroup, Ground | **Region**, MainGroup, Ground |

Tab / sub-tab testids are unchanged (`tab-GroundRegistration`,
`tab-RegisterLocationStructure`, `subtab-Building`, …).

---

## 5. Second capture pass — all gaps closed (2026-08-26)

**Logout** — `GET /MMV2/MMV2Logout/Logout` → 302 to `/`. (`MMV2Logout.aspx` is 404.)

**ComboboxData** — `/mmv2/restapi/List/ComboboxData` (unchanged from bygst, lowercase mmv2).

**GetMMList body is JSON on CORE** — the reverse of bygst, which sends form-urlencoded.
Note `length: 100` (bygst uses 10) and a full `columns` array is included:
```json
{"draw":1,"columns":[{"data":0,"name":null,"searchable":true,"orderable":false,
 "search":{"value":"","regex":false}}, ...],"order":[],"start":0,"length":100,
 "search":{"value":"","regex":false},"DataPath":"Building$1$0",
 "UniqueString":"<32 hex>","Gantt":"False","PopupSQLListIndex":0,
 "GroupBy":"","ExtraParams":"","IsSublist":"False"}
```

So the two payload styles are INVERTED between the tenants:

| | bygst | CORE |
|---|---|---|
| GetMMList | form-urlencoded | **JSON** |
| Filter calls | JSON | **form-urlencoded** |

**Buildings-grid data-filter field list** (22 entries, order as sent):
```
DataFilter_TFSearchText#
DataFilter_TFDateFilterID#1001
DataFilter_TFTimeLimitINPUT#All years
DataFilter_TFTimeLimit#;
DataFilter_TFGeographicalRegionID#0
DataFilter_TFIsLocatedOnMap#0
DataFilter_TFUsageOrganisationID#0
DataFilter_TFMainTypeID#0
DataFilter_TFSubtypeID#0
DataFilter_TFMunicipalityID#<id>      <-- the only value that varies
DataFilter_TFCityID#0
DataFilter_TFZipCodeID#0
DataFilter_TFPreservationConditions#0
DataFilter_TFExternalStatusID#0
DataFilter_TFOwningConditionID#0
DataFilter_TFCostCenterID#0
DataFilter_TFCulturalValueID#0
DataFilter_TFPreservationTypeID#0
DataFilter_TFPreservationClassificationID#0
DataFilter_TFEFCategoryID1#0
DataFilter_TFEFScopeCategoryID1#0
DataFilter_TFEFGlobalCategoryID1#0
```

---

## 6. Findings from making the script actually run (2026-08-26)

These four were not visible from reading the capture — each one showed up only as a
failure during the smoke run. Recorded so nobody re-derives them.

**1. InitMainLayout ISSUES the UniqueString; it is not client-generated.**
Its response carries `"UniqueString":"<32 hex>"`, and BuildLayout / GetMMListHeaders /
GetMMList / the filter-control checksums are all keyed on that exact value. Inventing
a well-formed one client-side makes the grid endpoints answer **403** — which reads
like an expired session three calls later, not like a bad parameter.

**2. BuildLayout's request body IS the InitMainLayout response, echoed back verbatim.**
Byte-for-byte identical in the capture. So replay the response rather than rebuilding
the container — that also avoids hard-coding `ProcessSummary` and the server culture
block. CORE posts it unwrapped (no `MMMainLayoutContainer` key, no `__type`); bygst
wraps it. A wrapped body still answers HTTP 200, but with `{"success":false}`, so
assert on `success` or the real failure surfaces later as the 403 above.

**3. `menuItemId` is per-TENANT, not per-build.** bygst 540 (Sites) / 8 (Buildings);
kommunedevcore **1783** / **1018**. Overridable with `-e MENUITEM_SITES` /
`-e MENUITEM_BUILDINGS`.

**4. The ComboboxData checksum is double-escaped.** The filter markup embeds it in a
JS string literal with `+` written as `+`. `JSON.parse` strips only one layer, so
those arrive as six literal characters; in a browser the JS engine unescapes them. Not
doing the same yields a corrupted checksum and a **403** from ComboboxData.

Also: `LoadMMFilterControl` answers `{"success":true,"html":"…"}`. k6's `res.json('d')`
returns *undefined* (not a throw) for the missing .asmx-style key, so a try/catch
fallback to the raw body never fires — read `html` explicitly.

Per-record modal detail: the **Site** modal fires `GetChildCount`, the **Building**
modal does not. `GetLayerPoints` fires **three** times (TypeID 7 `openarea`, 8
`openareaoutlines`, 15 `LightPole`) and its `MainID` is the *active site's* GroundID,
not the opened record's id.

---

## 7. Security observation (unrelated, worth reporting)

The GIS map layers call a third-party service with credentials in the query string,
visible to any logged-in user in browser dev tools:

```
https://geoservice-ok.lifa.dk/Authenticate.ashx?Login=OdenseKommuneEkstern&Password=<redacted>&…
```

Worth raising with the dev team separately.

# Grid filters accepted but not applied outside a browser session

**Environment:** bygst.mainmanager.dk — MainManager FM v20.25.1
**Module:** Building archive → Locations overview → Buildings
**Date:** 2026-08-11
**Raised by:** performance testing (k6), Scenario 2

---

## Summary

`RefreshMainManFilter` and `RefreshDataFilter` return **HTTP 200** when called from a
k6 (headless) session, but the filter is **not applied** — the subsequent `GetMMList`
returns the full, unfiltered result set.

The same requests, byte-for-byte, **work correctly inside a browser session**. We have
therefore ruled out the request payloads entirely. The difference lies in how the
server-side session is established.

We are not asking for a fix to our test — we would like to understand what state a
browser session holds that an API-only session does not, so we can reproduce it.

---

## Expected vs actual

Buildings grid on bygst contains **2,549** records.

| Action | Browser (UI) | k6 (headless) |
|---|---|---|
| No filter | 2,549 | 2,549 ✅ |
| Site = `Adelgade 11` (GroundID 1) | **3** | **2,549** ❌ |
| + Municipality = `København` (id 15) | **2** | **2,549** ❌ |

In both cases k6 receives `200 OK` with no error body. The filter simply has no effect.

---

## The decisive test

Using an authenticated **browser** session with the Site filter applied (grid showing
3 rows), we replayed k6's exact requests via `fetch()` in the page context:

**1. k6's `GetMMList` body** (minimal — no `columns[]` array):

```
draw=1&start=0&length=10&search[value]=&search[regex]=false
&DataPath=Building$1$0&UniqueString=842ff5bef9e34ab0b050c494efdfba1f
&Gantt=False&PopupSQLListIndex=0&GroupBy=&ExtraParams=&IsSublist=False
```

→ returned **`recordsFiltered: 3`** — correctly filtered.

**2. k6's `RefreshMainManFilter` body**, switching to "Show all sites":

```json
{"DataTag":"Ground","ControlIDChanged":"MainManFilter_TFGroundID",
 "Value":["MainManFilter_TFMainGroupID#0","MainManFilter_TFGroundID#0","MainManFilter_TFMainID#0"]}
```

→ `200 OK`, and the following `GetMMList` returned **2,549** — the filter changed as expected.

**Conclusion: k6's requests are correct.** They work when issued from a browser
session and do nothing when issued from k6's own session.

---

## What we have already eliminated

Each of these was checked against a live browser capture and corrected in our client
where it differed. None resolved the issue:

| Hypothesis | Result |
|---|---|
| Wrong `DataTag` (`PropertyItem` vs `Ground`) | Was wrong — corrected. No change. |
| Wrong site id (resolver returned 2074 instead of 1) | Was wrong — corrected. No change. |
| Data filter array missing `DataFilter_TFOwningConditionID#0` | Was wrong — corrected. No change. |
| `UniqueString` server-issued | No — client-generated, passed into `BuildLayout`. |
| Missing DataTables `columns[]` array in `GetMMList` | Not required (proven above). |
| `BuildLayout` missing `LocationFilter` / `DataFilter` blocks | Both present and correct. |
| Missing active-nav state (`saveToggleValue` ×3) | Was missing — added. No change. |
| Missing `LoadMMFilterControl type:'3'` (MainManFilter bar) | Was missing — added. No change. |
| Navigation order (Sites before Buildings) | Not a factor — browser filters correctly in either order. |
| Missing page-init calls (`BuildMainMenu`, `GetUnreadCount`) | Already sent by our client. |

---

## Our client's request sequence

Per grid navigation:

```
GetMenuItemSteps → GetMenuItemProcessItems
→ saveToggleValue ×3   (ActiveDataStateV2: ActiveNavigationItem / …Step… / …StepItem…)
→ InitMainLayout → IsShortcut
→ LoadMMFilterControl type '3' → LoadMMFilterControl type '2'
→ BuildLayout → GetMMListHeaders → GetMMList
```

Filter application:

```
RefreshMainManFilter  (or RefreshDataFilter)  → 200
GetMMList                                     → 200, unfiltered
```

Authentication is a standard form POST to the login page, followed by the landing
module load. No browser, no JavaScript execution.

---

## Questions for the dev team

1. What server-side state does `RefreshMainManFilter` / `RefreshDataFilter` bind the
   filter to, and how is that state created?
2. Is there a call in the page-initialisation sequence — outside the grid navigation
   we replicate — that registers the session as "filter-capable"?
3. Is filter state tied to anything established only by rendering `MMV2Content.aspx`
   (e.g. a ViewState-backed or `Session`-scoped layout object)?

---

## Impact on performance testing

The filter steps still issue their real HTTP calls and trigger a full grid reload, so
they generate representative load. They do not narrow the result set, which means grid
reloads after a filter return the full page rather than a smaller one — a modest
**under**-representation of filtered-query cost, not an inflation.

All other steps in the scenario are verified against real data: login, both grid loads
(1,200 sites / 2,549 buildings), both record modals (133 KB / 162 KB responses plus
`GetChildCount`, `BuildGraphicalModal`, `GetLayerPoints`), and logout.

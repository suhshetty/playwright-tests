# Performance Tests (K6)

K6 performance/load scripts for EG MainManager, captured from the live application
and built to be **re-pointed at any customer** with no code changes.

## Structure

```
PerformanceTests/
├── lib/
│   └── mainmanager.js     # SHARED steps: login(), openMyPage(), openMyPageTab(), openModule(), logout()
├── data/
│   ├── users.example.csv  # template user pool (committed)
│   └── users.csv          # real test accounts (gitignored — create from the example)
├── scenarios/
│   └── all.js             # mixed-workload runner (open model, weighted blend)
├── _scenario-template.js  # copy this to start a new scenario
├── scenario1-login-mypage-logout.js
└── README.md
```

The common steps live **once** in `lib/mainmanager.js`. Every scenario imports them,
so login / logout / navigation are written and maintained in a single place. A
scenario file only declares what is unique to it (which steps, in what order).

### Two execution models
- **Per-scenario files** (e.g. `scenario1-…js`) use a **closed model** (VUs + think time) — quick for smoke/debug of one flow.
- **`scenarios/all.js`** uses an **open model** (constant-arrival-rate) — holds a target request rate regardless of latency, which is how you find capacity. Use this for real load tests and the realistic 6-scenario blend.

### Per-customer config file (`config.json`)
Everything that changes per customer lives in **one file** — copy
[config.example.json](config.example.json) to **`config.json`** (gitignored) and fill it in:

```json
{
  "baseUrl": "https://bygst.mainmanager.dk",
  "username": "<your-username>",
  "password": "<your-password>",
  "siteName": "Adelgade 11",
  "municipalityName": "København"
}
```

The scripts read this at runtime — no code edits, no CLI flags. **Names** (`siteName`,
`municipalityName`) are **resolved to database ids at runtime**, so you only ever type the name you
see in the UI:
- `resolveGroundId(name)` — searches the live Sites grid for the **site** id (scenarios 2 & 6).
- `resolveDataFilterId(mod, control, name)` — resolves a **Filter-panel dropdown** value (e.g.
  Municipality) by name. These dropdowns load options from a *checksum-protected* `ComboboxData`
  endpoint, but the checksum is server-issued and embedded in the `LoadMMFilterControl` HTML — the
  resolver parses it and searches the option list by name. (This also makes the test *more*
  realistic: it's exactly the pair of calls a real user triggers when opening the dropdown.)

To switch customers, change `config.json` and re-run. `config.json` is gitignored, so the real
password is never committed.

> **Windows gotcha (important):** the credential env vars are **`MM_USERNAME` / `MM_PASSWORD`**,
> **not** `USERNAME` / `PASSWORD`. Windows defines `USERNAME` as a built-in OS variable (your
> Windows login), which k6 inherits into `__ENV.USERNAME` and would silently shadow your config.
> The `MM_` prefix avoids that collision. Precedence: `-e MM_USERNAME` → `config.json` → CSV pool.

### The user pool (multi-user load)
For realistic multi-user load each VU can instead log in as a **different** test account, read from
`data/users.csv` (`username,password` header). **No password is committed** — copy
`users.example.csv` to `users.csv` and fill it in (it's gitignored). The CSV pool is used only when
neither `-e MM_USERNAME` nor `config.json username` is set.

## Scenarios

| # | File | Flow |
|---|------|------|
| 1 | [scenario1-login-mypage-logout.js](scenario1-login-mypage-logout.js) | Login → open **My Page** → **My page** tab → drill into the **"Unfinished work orders on my organisation"** widget (→ Work order grid) → back to **My Page** → Logout |
| 1-ramp | [scenario1-ramp.js](scenario1-ramp.js) | Same flow under a **stepped arrival-rate ramp** (open model) to find the capacity knee |
| 2 | [scenario2-buildingarchive.js](scenario2-buildingarchive.js) | Login → **Building archive** → Sites (open site) → Buildings (open building) → **Site location filter** → **Municipality data filter** → clear → Logout |
| 3 | [scenario3-hr-orgtree.js](scenario3-hr-orgtree.js) | Login → **Human resources** → **Organisations overview** → **Build organisation trees** (dual tree) → open a **Company** (popup) → close → open a **Person** (popup) → close → Logout |
| 5 | [scenario5-helpdesk-incident.js](scenario5-helpdesk-incident.js) | Login → **Helpdesk** → **Incidents overview** tab → **Incidents** sub-tab → open an incident (**modal popup**) → Close → Logout |
| 6 | [scenario6-om-workorders.js](scenario6-om-workorders.js) | Login → **Operation and maintenance** → Work orders → open WO → **Site filter** → **Filter panel: WO status** (Select all / Deselect all / Created) → clear → Logout |
| 4 | *to add* | copy [_scenario-template.js](_scenario-template.js) |

## Reusing steps across the 6 scenarios

All scenarios share these building blocks from `lib/mainmanager.js`:

| Step | Function | Reused by |
|------|----------|-----------|
| Login | `login()` | every scenario |
| Open My Page module (dashboard) | `openMyPage()` | scenarios using My Page |
| Click the "My page" tab (reload dashboard widgets) | `openMyPageTab()` | scenarios using My Page |
| Click navigation → open a grid module + load its grid | `openModule(MODULES.X)` | scenarios opening grid modules |
| Logout | `logout()` | every scenario |

A new scenario is just composition. Export a **named** function so the mixed runner can call it:

```js
import { login, openModule, logout, MODULES, defaultOptions } from './lib/mainmanager.js';
export const options = defaultOptions();
export function scenario2() {
  if (!login()) return;
  openModule(MODULES.WorkOrders, '2. Work Orders');   // once captured into MODULES
  logout();
}
export default scenario2;   // lets you also run it standalone
```

To support a grid module other than My Page, **resolve it from the live menu at
runtime** — no hardcoded ids:

```js
const grid = discoverModule('OperationAndMaintenance', 'WorkOrders', 'WorkOrder');
if (grid) openModule(grid, 'Work Orders');   // openModule machinery is identical for every module
```

`discoverModule(process, step, data)` walks `GetMenuItemSteps` → `GetMenuItemProcessItems`
and fills in the tenant-specific `menuItemId` / `menuItemType` / tags from the menu node
itself (matching by `Key` or by English caption, case-insensitive; cached per VU). This is
what makes one script run against **any** customer. A static `MODULES` entry is still
supported as a fallback/offline reference, but discovery is preferred.

### Adding it to the mixed workload (`scenarios/all.js`)
1. Import + re-export the new exec fn there.
2. Give it a **weight** in `WEIGHTS` (its share of the total `RATE`).
3. Add a `scenarios{}` entry via `arrivalScenario('scenario2', WEIGHTS.scenario2)`.

## Why one script works for every customer

Every MainManager tenant runs the **same modules → same API endpoints**. Only the
host differs — the request paths, methods and bodies are identical:

| | Customer 1 | Customer 2 |
|---|---|---|
| **Host** (differs) | `customer1.mainmanager.is` | `customer2.mainmanager.is` |
| **API path** (identical) | `/mmv2/services/…/GetUnreadCount` | `/mmv2/services/…/GetUnreadCount` |
| **Method** | POST | POST |
| **Endpoints** | GetUnreadCount, GetMenuItemSteps, GetMMList, GetMMListHeaders… | same set |

So switching customers = changing `config.json` (`baseUrl` + credentials + names). The **endpoints, methods and
bodies are identical**; only two things are tenant-specific, and both are handled without
editing the script body:

- **Module ids** (`menuItemId`, `menuItemType`, tags) — resolved at runtime by
  `discoverModule()` from the live menu, so they're never hardcoded per tenant.
- **The My Page dashboard summary id** (`2147483643`) — a product *sentinel* constant
  (`int.MaxValue−4`), expected identical on every tenant; `-e MYPAGE_SUMMARY_ID` overrides
  it if a tenant ever differs.

> **Credentials precedence:** `-e MM_USERNAME/MM_PASSWORD` → `config.json` → `data/users.csv` pool.
> The CSV pool is used only when neither the env vars nor `config.json` supply a username — so a
> leftover `users.csv` won't silently shadow an explicit credential. (Use `MM_USERNAME`, **not**
> `USERNAME` — on Windows `USERNAME` is a built-in OS var that k6 would inherit and shadow config.)

## Prerequisites

- [k6](https://k6.io/docs/get-started/installation/) installed (`k6 version`)
- A **test account** on the target environment
- The target environment **whitelisted** to accept traffic from the load-test runner
- **Written authorization** to run load tests against the environment + an agreed test window

## Run it

> First time: copy `config.example.json` → `config.json` and fill in `baseUrl`, `username`,
> `password`, `siteName`, `municipalityName`. Every command below then reads it automatically.

```bash
# Single scenario, standalone (closed model, staged ramp 5 → 15 VUs) — reads config.json
k6 run PerformanceTests/scenario1-login-mypage-logout.js

# Smoke test first (always) — 1 VU, 30s, expect 0 business_errors
k6 run -e VUS=1 -e DURATION=30s PerformanceTests/scenario1-login-mypage-logout.js

# Scenario 6 (O&M work orders) — site is taken BY NAME from config.json and
# resolved to its id at runtime (no hardcoded ids):
k6 run -e VUS=1 -e DURATION=90s PerformanceTests/scenario6-om-workorders.js

# CAPACITY RAMP — open model, STEPPED arrival rate, finds the knee.
# Watch step_login_auth_duration p95 stage-by-stage (the ~22s auth is the bottleneck).
k6 run PerformanceTests/scenario1-ramp.js
k6 run -e PEAK_RATE=30 -e STEP_TIME=4m -e REPORT_PREFIX=PerformanceTests/ramp \
       PerformanceTests/scenario1-ramp.js

# Mixed workload, open model, re-pointed at another customer
# (or just set baseUrl in config.json instead of -e BASE_URL)
k6 run -e BASE_URL=https://<tenant>.mainmanager.is -e RATE=10 -e DURATION=15m \
       PerformanceTests/scenarios/all.js

# Per-run credential override (beats config.json) + JSON output.
# NOTE: MM_USERNAME/MM_PASSWORD — NOT USERNAME (Windows OS var collision).
k6 run -e MM_USERNAME=<user> -e MM_PASSWORD=<pwd> --out json=result.json \
       PerformanceTests/scenario1-login-mypage-logout.js
```

## Configuration (env vars)

Everything here can be set in **`config.json`** (preferred, per customer) and/or overridden
per-run with `-e`. Env vars win over `config.json`; `config.json` wins over the built-in default.

| Var | config.json key | Default | Purpose |
|-----|-----------------|---------|---------|
| `BASE_URL` | `baseUrl` | `https://kommune.mainmanager.is` | Target tenant host — the main per-customer value |
| `MM_USERNAME` | `username` | `suhsh` | Login user. **`MM_` prefix is mandatory** — `USERNAME` collides with the Windows OS var |
| `MM_PASSWORD` | `password` | *(empty — must be supplied)* | Login password (config.json, env, or CSV pool) |
| `SITE_NAME` | `siteName` | `Absalonsgade 16` | Site name for the location filter — **resolved to its id at runtime** (scenarios 2 & 6) |
| `MUNICIPALITY_NAME` | `municipalityName` | `Albertslund` | Municipality name for the data filter — **resolved to its id at runtime** (scenario 2) |
| `SITE_GROUND_ID` | — | *(none)* | Optional fast-path: skip site name→id resolution if you already know the id |
| `MUNICIPALITY_ID` | — | *(none)* | Optional fast-path: skip municipality name→id resolution if you already know the id |
| `VUS` | *(unset → staged ramp)* | Flat virtual-user count (per-scenario closed-model runs) |
| `DURATION` | `1m` / `5m` | Run duration (`VUS` mode / `scenarios/all.js`) |
| `RATE` | `2` | Total iterations/sec across the blend (`scenarios/all.js`, open model) |
| `PEAK_RATE` | `60` | Capacity ramp (`scenario1-ramp.js`): iterations/**min** at the top stage |
| `STEP_TIME` | `3m` | Capacity ramp: hold time per stage |
| `ITER_EST_S` | `40` | Capacity ramp: measured iteration seconds, for Little's-law VU sizing |
| `RAMP_HEADROOM` | `3` | Capacity ramp: `maxVUs` multiplier over steady-state need |
| `MYPAGE_SUMMARY_ID` | `2147483643` | My Page dashboard summary id — **verify per environment** |
| `LANDING_MODULE` | `Pictures` | Post-login landing module (a `MODULES` key, or `none` to skip) |
| `REPORT_PREFIX` | `PerformanceTests/summary` | Path/name for the emitted `.html` + `.json` report |
| **SLA overrides** (ms) | see below | `SLA_HTTP_P95`, `SLA_LOGIN_P95`, `SLA_LANDING_P95`, `SLA_NAV_P95`, `SLA_MYPAGE_P95`, `SLA_LOGOUT_P95`, `MAX_FAIL_RATE` |

> No real password is committed. Put it in `config.json` (gitignored), `data/users.csv` (gitignored), or `-e MM_PASSWORD=...`.

## Metrics & thresholds

The script emits per-step latency trends so you can see *which* step is slow:

- `step_login_duration` — total login; split into `step_login_auth_duration` (credential POST) + `step_login_render_duration` (post-login content render). The 1-VU baseline puts ~22s of the ~25s login in **auth**, not render — so `step_login_auth_duration` is the metric to watch under load.
- `step_landing_duration`, `step_navigate_duration`, `step_mypage_tab_duration`, `step_widget_drilldown_duration` (dashboard widget → Work order grid), `step_logout_duration`
- `business_errors` — functional failures (bad status / login bounce / no dashboard widgets / server-error payload), separate from transport errors

**Memory & error detection:** response bodies are discarded by default (`discardResponseBodies`) to cap
memory at high VU — only the two responses we parse (login page, `BuildMyPage`) keep their body.
Those two also get a body-level check (`bodyOk`) that flags an HTTP-200-with-.NET-error-payload,
which a status-only check would miss.

Thresholds are the **agreed SLA** the run is judged against — targets, not a description
of the (currently slow) dev environment. They're **env-overridable** so each engagement
plugs in its own numbers without code changes:

| Metric | Default (p95) | Override |
|--------|---------------|----------|
| `http_req_duration` | 3 s | `SLA_HTTP_P95` |
| `step_login_duration` | 10 s | `SLA_LOGIN_P95` |
| `step_landing_duration` | 5 s | `SLA_LANDING_P95` |
| `step_navigate_duration` | 5 s | `SLA_NAV_P95` |
| `step_mypage_tab_duration` | 5 s | `SLA_MYPAGE_P95` |
| `step_widget_drilldown_duration` | 5 s | `SLA_WIDGET_P95` |
| `step_logout_duration` | 2 s | `SLA_LOGOUT_P95` |
| `http_req_failed` / `business_errors` | < 1% | `MAX_FAIL_RATE` |

> The shared **dev** environment currently breaches the login target (~22 s vs 10 s). That's a
> real finding, not a test bug — re-measure and agree thresholds against the actual target env.

## Reports

Every run auto-emits a self-contained **`summary.html`** (cards, SLA pass/fail, per-step latency)
and **`summary.json`** (raw k6 data) under `PerformanceTests/` — both gitignored. Open the HTML
in a browser, or feed the JSON into the reports dashboard. Rename with `-e REPORT_PREFIX=...`.

## Per-customer checklist before a real run

1. Confirm the environment data is **synthetic/test data** (GDPR — see the engagement notes).
2. Get the **test URL, credentials, firewall whitelisting, and written sign-off**.
3. Smoke run first: `-e VUS=1 -e DURATION=30s` — confirm 0 functional errors.
4. Tune the **load profile** (VUs/duration) to the customer's expected concurrency.
5. Agree **pass/fail thresholds** with the customer.

## Per-customer capture (only if discovery isn't enough)

`discoverModule()` resolves module ids automatically, so most tenants need **no** capture.
You only need this when (a) you want a static `MODULES` entry for offline reference, or (b) a
module's `dataPath` differs from the `<dataTag>$1$0` convention. Capture takes 2 minutes from
a logged-in browser (DevTools → Network, filter `MMLayoutReadOnly.asmx`):

1. **Top-level process tags** — run in the DevTools console:
   `[...document.querySelectorAll('li[role="menuitem"][data-key]')].map(li => li.dataset.key)`
2. **Steps under a process** — `GetMenuItemSteps` request body `{Tag:"<process>"}` → response
   `d.Items[]`; each item's `Key` is a step (= `processStepTag`).
3. **Grids under a step** — `GetMenuItemProcessItems` body `{Parent:"<process>",Tag:"<step>"}` →
   `d.Items[]`; each node gives `Key` (=`dataTag`), `ID` (=`menuItemId`), `Type` (=`menuItemType`).
4. **dataPath** — load the grid once; copy the `DataPath` query param off the
   `GetMMListHeaders` request. It's normally `<dataTag>$1$0`; pass `opts.dataPath` to
   `discoverModule(...)` (or set it in the `MODULES` entry) only if it differs.

> These are exactly the fields `discoverModule()` reads — capture is just the manual version
> of the same lookup, for when you want them pinned in source.

# MainManager performance testing (k6)

Load tests for EG MainManager, one folder per customer environment. Each folder is
self-contained: its own scripts, library, config template, runner and run history.

| Folder | Environment | Build | Scenarios |
|---|---|---|---|
| [kommune/](kommune/) | https://kommune.mainmanager.is | WebForms | 1 – 6 |
| [devcore/](devcore/) | https://kommunedevcore.mainmanager.is | ASP.NET Core | 1 – 6 |
| [bygst/](bygst/) | https://bygst.mainmanager.dk | WebForms | 1, 2, 3, 5, 6 |
| [odense/](odense/) | https://fm.odense.dk | WebForms (OTP login) | 2 |

Supporting folders: [common/](common/) (the shared runner logic), [learning/](learning/)
(k6 training notes and exercises), [archive/](archive/) (old runners and unattributed
early reports; nothing in there is needed to run a test).

---

## First run in 5 minutes

**1. Install the tools** (once)

- **k6**: `winget install k6 --source winget` on Windows, `brew install k6` on macOS.
  Other options: https://grafana.com/docs/k6/latest/set-up/install-k6/. Built and
  tested with k6 **v0.55**.
- **Git Bash** (comes with Git for Windows). All commands below are bash; run them in
  Git Bash, not PowerShell or cmd.

**2. Add the password** (once per customer)

```bash
cd performance-testing/kommune
cp config.example.json config-kommune.json
# edit config-kommune.json and replace PUT-PASSWORD-HERE
```

The real config files are gitignored, so passwords never reach the repo. The config
file name differs per folder:

| Folder | Config file |
|---|---|
| kommune | `config-kommune.json` |
| devcore | `config-core.json` |
| bygst | `config.json` |
| odense | `config-odense.json` |

The username in each `config.example.json` is the account the tests were built with.
Swap in your own test account if you have one, and ask the team lead for the password.

**3. Smoke test first, always**

```bash
bash run.sh              # lists the scenarios for this customer
bash run.sh 2 --smoke    # 1 virtual user for 90 seconds
```

A smoke run should finish with `checks` near 100% and `business_errors` at 0%. If it
doesn't, a bigger run won't help: fix the smoke run first (see Troubleshooting).

**4. Load test**

```bash
bash run.sh 2 -e VUS=25 -e DURATION=5m   # flat 25 users for 5 minutes
bash run.sh 2                            # full profile: 5 min ramp to 250 users, then 5 min hold
```

**5. Read the report**

Every run writes to `reports/scenario<N>/run-<NNN>_<timestamp>/`:

| File | What it is |
|---|---|
| `summary.html` | **Open this.** Pass/fail per SLA, per-step latency, server errors seen |
| `dashboard.html` | k6 time-series charts (latency and throughput over the run) |
| `summary.json` | Raw k6 metrics, for comparing runs |
| `console.log` | Full console output |

Earlier runs are already in each `reports/` folder. Compare against them.

---

## What the scenarios do

The same six user journeys exist (where built) for every customer:

| # | Journey |
|---|---|
| 1 | Login → My page → "Unfinished work orders on my organisation" widget → Work order grid → My page → Logout |
| 2 | Building archive: Sites grid (open a site) → Buildings grid (open a building) → site filter → municipality/city filter → clear |
| 3 | Human resources: organisation trees → open a company → open a person |
| 4 | Property management: head lease / lease / sub-lease contracts and renegotiations, site and payer filters |
| 5 | Helpdesk: Incidents grid → open an incident |
| 6 | Operation & maintenance: Work orders → open a work order → site filter → status filter → clear |

The steps were captured from the real browser traffic of each environment. Each
script's header comment lists the exact requests and what was verified live.

## Useful options

Add any of these after the scenario number (`bash run.sh 2 -e VUS=10 ...`):

| Option | Effect |
|---|---|
| `--smoke` | Shorthand for `-e VUS=1 -e DURATION=90s -e VERIFY=true` |
| `-e VUS=N -e DURATION=5m` | Flat load instead of the default 250-user ramp |
| `-e VERIFY=true` | Logs the real ids and row counts each step got back (use with 1 VU) |
| `-e DEBUG=true` | Logs every non-2xx and slow request |
| `-e MM_USERNAME=... -e MM_PASSWORD='...'` | Override the config credentials for one run |
| `-e SLA_HTTP_P95=5000` | Change an SLA threshold (ms). See the `SLA_*` names in each `lib/` file |

## How to read the results

- **k6 exit code 99** means an SLA threshold was crossed. That is a finding, not a
  broken test; the reports are complete.
- **`http_req_waiting`** is server time. **`http_req_duration`** also includes
  download time. At 250 users on one laptop, the long tail of `http_req_duration` is
  mostly the laptop failing to download responses fast enough. Use `http_req_waiting`
  for statements about the product.
- **`business_errors`** counts functional failures (login bounced, empty grid, .NET
  error inside a 200 response). It matters more than `http_req_failed`.
- The **"Server errors observed"** table in `summary.html` lists endpoints that
  errored. Known product defects are kept out of the SLA figure but still listed.

## Before testing a real customer environment

1. Written sign-off from the customer, an agreed time window, and the load-generator
   IP allow-listed.
2. Confirm the login is username/password, not SSO-only (the scripts can't do SSO).
3. Confirm the data is synthetic. If it's real personal data (GDPR), keep reports out
   of anything public.
4. Ask for an **account pool** (10–20 test users) for runs above ~100 users. Put them
   in `data/users.csv` (see `bygst/data/users.example.csv`). One shared account at
   250 users mostly measures login contention, not the product.
5. Smoke first, then step up: 25 → 100 → 250.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `k6: command not found` | Install k6, then **reopen** Git Bash |
| `config-....json not found` | Step 2 above |
| Login fails at 1 VU | Wrong password, or the account is locked or expired. Log in once in a browser to check |
| `-e USERNAME=...` ignored | Use `MM_USERNAME`. On Windows `USERNAME` is an OS variable that k6 picks up |
| Fine at 1 VU, 80%+ failures at 250 VUs, login check failing | Login flooding (one shared account logging in hundreds of times). Use an account pool or fewer users |
| `IsShortcut` 500s under load | Known product defect (NullReference under concurrency); listed separately in the report |
| Filters return 200 but the grid isn't filtered (bygst) | Known; see [bygst/FILTER-ISSUE-REPORT.md](bygst/FILTER-ISSUE-REPORT.md) |

## Adding a new customer

1. Copy the closest existing folder (WebForms → `kommune/`, ASP.NET Core → `devcore/`).
2. Update `BASE_URL`, `CONFIG` and the scenario list at the top of `run.sh`.
3. Fill in the config with that environment's URL, account, and a real site and
   municipality **name** (names are looked up live; you never type database ids).
4. Smoke each scenario with `--smoke -e DEBUG=true`. Menu ids can differ per tenant;
   each script's header explains what was captured and how.

## Notes on the code

- Each customer folder has its **own copy** of the library in `lib/`. Kommune, Bygst
  and Odense all started from the same `mainmanager.js`. If you fix a bug in one,
  check the others.
- `lib/mainmanager.js` (WebForms) and `lib/mainmanager-core.js` (ASP.NET Core) can't
  be imported into the same script: they register the same metric names.
- Some scenarios log in on **every** iteration (matching the manual test steps) and
  some log in once per virtual user. Each script's header says which, and why. It
  matters at high user counts: every-iteration logins hit the login page much harder.
  Scenario 1 must log in every iteration: the My page dashboard comes back empty in a
  reused session.

# Kommune — Scenario 1

Self-contained k6 performance test. Everything needed is in this folder; nothing is
imported from `lib/` or anywhere else in the repository.

## The scenario

| # | Label | Step | Expected result |
|---|---|---|---|
| 1 | Login | Enter your username and password, click Login | Logged into the system; the login happens quickly |
| 2 | My page | Select module My page | Module and tabs open and show data |
| 3 | | Click the "Unfinished work orders on my organisation" | Module and tab Helpdesk › Work orders opens and shows data |
| 4 | | Go back - select module My page | Module and tabs open and show data |
| 5 | Logout | Click logout | Logged out |

## Run it

```bash
# Smoke test — 1 VU, 90s, real row counts printed. Run this first, always.
bash performance-testing/kommune/scenario1-standalone/run.sh

# Flat load
bash performance-testing/kommune/scenario1-standalone/run.sh -e VUS=25 -e DURATION=5m

# Full profile — 5m ramp to 250 VUs, then 5m hold
bash performance-testing/kommune/scenario1-standalone/run.sh --load
```

### Credentials

Copy `config.example.json` to `config.json` in this folder and fill it in.
`config.json` is gitignored, so **no password reaches your shell history or the
repository**. If it is missing, the runner falls back to
`../config-kommune.json`, and failing that tells you to pass
`-e MM_USERNAME=<user> -e MM_PASSWORD='<password>'`.

Single-quote the password in bash — it contains `!`, which is history-expanded
inside double quotes.

### Reports

Each run writes to `reports/run-NNN_<timestamp>/` (gitignored):

| File | What it is |
|---|---|
| `dashboard.html` | k6 time-series charts. Open this first. |
| `summary.json` | Raw metrics, for comparing runs. |
| `console.log` | Full output including the `[VERIFY]` lines. |

## Files

| File | Purpose |
|---|---|
| `scenario1.js` | The test. Five steps, one function each, every endpoint commented with where it was captured. |
| `run.sh` | Runner — finds credentials, makes the report folder, sets `BASE_URL`. |
| `config.example.json` | Credentials template. |
| `capture/CAPTURE.md` | **The evidence.** Every request recorded live, step by step, with bodies, timings and sizes. |
| `capture/*.png` | Screenshots from the capture session. |

## Verified

Smoke test, 13 Oct 2026, 1 VU / 100s against kommune:

```
checks ..............: 100.00%  48 out of 48
business_errors .....:   0.00%   0 out of 15
http_req_failed .....:   0.00%   0 out of 216
iterations ..........: 3

step1_login .........: p95  4.64s
step2_mypage ........: p95  4.90s
step3_workorders ....: p95  7.82s   <- crosses its 5s SLA
step4_mypage_return .: p95  4.84s
step5_logout ........: p95  0.71s

[VERIFY] widgets=18 allOk=true
[VERIFY] work order grid status=200 recordsTotal=469 recordsFiltered=469
[VERIFY] firstWorkOrderRow=83596
```

**Read the `[VERIFY]` lines, not just the pass rate.** `widgets=18` matches the
dashboard tiles; `recordsTotal=469` and `firstWorkOrderRow=83596` prove the grid
returned real data rather than an empty `200`. A grid that returns `200` with zero
rows is indistinguishable from a working one if you only check the status code —
which is why every data step here asserts on content.

### The failing threshold is a finding, not a bug

`step3_workorders` crosses its 5s target at **7.8s p95 with a single user and no
load**. That step contains the 588 KB `GetMMList` call. It is a genuine observation
about the Work order grid.

k6 exits **99** when a threshold is crossed. That means "SLA breached", not "the test
broke" — the run was valid and the reports are complete. Do not wire CI to treat 99
as a tooling failure.

## Moving this to another tenant

Re-capture these before trusting a run elsewhere. Assuming a default matches is how
the Scenario 2 Buildings grid spent an afternoon returning 403:

| Constant | Current | Risk |
|---|---|---|
| `WIDGET_SNAPSHOT_ID` | `4270` | **High** — it is a user's saved view. Always re-capture. |
| `MENUITEM_WORKORDERS` | `1143` | **High** — per tenant. Read it off `InitMainLayout`. |
| `MYPAGE_SUMMARY_ID` | `2147483643` | Low — a product sentinel (`int.MaxValue - 4`), but confirm once via `BuildMainMenu`. |

All three are `-e` overridable, e.g. `-e WIDGET_SNAPSHOT_ID=1234`.

`capture/CAPTURE.md` shows exactly how each was obtained, so the same method works on
any environment.

## Relationship to the rest of the repo

This folder is deliberately standalone, for KT and for running one scenario without
learning the shared library first. The production equivalent is
`../scenario1-mypage-kommune.js` + `lib/mainmanager.js`, which shares
helpers across six scenarios.

The two differ slightly on purpose: the production file has a **sixth** step (a
separate "My page tab" click) that this Zephyr scenario does not list. If you need
numbers comparable with the existing `reports/scenario1-kommune/` history, use the
production file.

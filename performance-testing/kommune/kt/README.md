# KT — Performance Testing From Scratch

Knowledge-transfer material for Scenario 1, written for someone who has never done
performance testing. Nothing in here is used by a production run; it exists to be
read and to be run once by a newcomer.

| File | What it is |
|---|---|
| `scenario1-kt.html` | The KT document. Open it in a browser. Every API call in Scenario 1, captured live on kommune, with a keep-or-drop verdict and the reason for each. |
| `scenario1-standalone.js` | The whole of Scenario 1 in **one file**, with no imports from `lib/`. 576 lines. Readable top to bottom in one sitting. |
| `run-kt.sh` | **The only command you need.** Runs either script, finds the credentials, makes the report folder. |
| `config.example.json` | Credentials template. Copy it to `performance-testing/kommune/config-kommune.json` (gitignored) and fill it in. |
| `kt-01-*.png`, `kt2-*.png` | The screenshots the document embeds. |

## Just run it

```bash
bash performance-testing/kommune/kt/run-kt.sh                          # smoke: 1 VU, 90s, row counts
bash performance-testing/kommune/kt/run-kt.sh -e VUS=25 -e DURATION=5m # load
bash performance-testing/kommune/kt/run-kt.sh --production             # the real repo scenario instead
```

It picks up the username and password from `performance-testing/kommune/config-kommune.json`
if that file exists, so **no password appears on your command line or in your shell
history**. Without it, pass `-e MM_USERNAME=... -e MM_PASSWORD='...'` yourself.

Reports go to `performance-testing/kommune/kt/reports/run-NNN_<timestamp>/` (gitignored).

### What is NOT in this folder, and why

`lib/mainmanager.js` stays where it is. It is ~1,300 lines shared by fifteen other
scenario files; a copy in here would drift from the original the first time somebody
fixes a bug in one and not the other. This repository already has that problem with
some duplicated CORE scenarios, and it is not worth repeating for KT.

`scenario1-standalone.js` is the answer to "one folder, nothing else needed" — it has
no imports at all. Use `--production` when you want the real thing, and the runner
reaches out to `lib/` for you.


The document is also published at
<https://claude.ai/artifact/UdpcJQRiXQLAT4UopRbxAF> (private; share from the page's
Share menu). The copy here is the one that survives if that link ever goes away.

---

## Running the standalone file

It needs no other file in this repository. The password is **never** stored in it —
pass it with `-e`, which is what keeps the file safe to paste into a document or a
ticket. The script throws immediately if you forget it.

```bash
# Smoke test — one user, 90 seconds, real row counts printed
k6 run -e BASE_URL=https://kommune.mainmanager.is \
       -e MM_USERNAME=suhsh -e MM_PASSWORD='<password>' \
       -e VUS=1 -e DURATION=90s -e VERIFY=true \
       performance-testing/kommune/kt/scenario1-standalone.js

# Small load test — 25 users, five minutes
k6 run -e BASE_URL=https://kommune.mainmanager.is \
       -e MM_USERNAME=suhsh -e MM_PASSWORD='<password>' \
       -e VUS=25 -e DURATION=5m \
       performance-testing/kommune/kt/scenario1-standalone.js
```

Leave `-e VUS` off entirely and it uses the ramp written into the file: 5m up to
250 VUs, then a 5m hold.

In bash, **single-quote the password**. The kommune one contains `!`, which bash
history-expands inside double quotes.

### What a good smoke test looks like

Verified 13 Oct 2026, run from a directory containing no other repository files:

```
checks ............: 100.00%  57 out of 57
business_errors ...:   0.00%   0 out of 18
http_req_failed ...:   0.00%   0 out of 261
iterations ........: 2

[VERIFY] dashboard widgets=18 allOk=true
[VERIFY] openModule(Request) status=200 recordsTotal=469 recordsFiltered=469
[VERIFY] workOrderRow=83596
```

Read the `[VERIFY]` lines — they are the point of the smoke test. `widgets=18`
matches the eighteen dashboard tiles. `recordsTotal=469` and `workOrderRow=83596`
prove the grid returned real data rather than an empty `200`.

The KT document records **464** rows from the 11 October capture; the run above says
**469**. Five work orders were created in between. Compare the smoke test against
**what the browser shows you today**, never against a number in a document.

### One threshold is expected to fail

`step_widget_drilldown_duration` crosses its 5s target at ~14s p95 even with a single
user. That is the step containing the 588 KB `GetMMList` call — a genuine finding
about the Work order grid, not a script bug.

k6 exits **99** when a threshold is crossed. That means "SLA breached", not "the test
broke": the run was valid and the report is complete. Do not wire CI to treat 99 as a
tooling failure.

---

## Standalone vs the production scenario

| | `kt/scenario1-standalone.js` | `scenario1-mypage-kommune.js` |
|---|---|---|
| Dependencies | none | `lib/mainmanager.js` (~1,300 lines, shared with 5 other scenarios) |
| Credentials | `-e MM_USERNAME` / `-e MM_PASSWORD` only | `config-kommune.json` (gitignored), `-e` overrides |
| Reports | k6's console summary | numbered folder with `summary.html`, `summary.json`, `dashboard.html` |
| Purpose | teaching — read it end to end | real runs |

**Use the production version for anything that produces a number somebody will act
on.** Run it through its runner script, which passes `BASE_URL` and creates the report
folder:

```bash
bash performance-testing/kommune/run.sh 1 --smoke
```

The two files send the same requests. If they ever diverge, the production one is
correct and this one needs updating.

---

## Keeping this current

Every id in the standalone file was captured live and is marked as such in its
comments. Re-verify them when moving to another tenant — especially:

- `WIDGET_SNAPSHOT_ID` (4270) — per-tenant **data**, somebody's saved view. Always
  re-capture.
- `menuItemId` (1143) — per-tenant. Read it off `InitMainLayout` in the browser.
- `MYPAGE_SUMMARY_ID` (2147483643) — a product sentinel constant, expected to be the
  same everywhere, but confirm once on a new tenant via `BuildMainMenu`.

Assuming a default matches is how the Scenario 2 Buildings grid spent an afternoon
returning 403.

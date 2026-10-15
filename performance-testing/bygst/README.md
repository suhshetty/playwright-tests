# Bygst — https://bygst.mainmanager.dk

WebForms build (`.dk`), behind Cloudflare. This was the first environment the
framework was built on, so it has the longest run history (Scenario 2: 59 runs) and
a few extra tools.

```bash
cp config.example.json config.json           # once; fill in the password
bash run.sh 2 --smoke                        # always first
bash run.sh 2 -e VUS=25 -e DURATION=5m
```

## Files

| Path | What |
|---|---|
| `run.sh` | Runner: `bash run.sh <1 / 1-ramp / 2 / 2-held / 3 / 5 / 6 / all> [--smoke] [k6 args]` |
| `scenario1-login-mypage-logout.js` | S1: My page dashboard journey |
| `scenario1-ramp.js` | S1 as a capacity ramp (open model, `-e PEAK_RATE=` iterations/min) |
| `scenario2-buildingarchive.js` | S2: Building archive |
| `scenario2-heldsession.js` | S2 on long-lived sessions (session-expiry soak) |
| `scenario3-hr-orgtree.js`, `scenario5-helpdesk-incident.js`, `scenario6-om-workorders.js` | S3, S5, S6 |
| `scenarios/all.js` | Weighted mixed-workload runner (only Scenario 1 wired in so far) |
| `_scenario-template.js` | Start a new scenario by copying this |
| `lib/mainmanager.js` | Shared WebForms steps |
| `data/users.example.csv` | Template for an account pool, `data/users.csv` (gitignored) |
| `FILTER-ISSUE-REPORT.md` | Write-up of the filter defect below, as sent to the developers |
| `reports/scenario<N>/` | Run history (`_verify` = filter verification run) |

There is no Scenario 4 for Bygst.

## Config values

| Key | Value |
|---|---|
| `siteName` | `Adelgade 11` |
| `municipalityName` | `København` |

## Known issues

- **Filters return 200 but don't filter** when called from k6 (they work in a
  browser). The grid reload is still measured, but the "filtered" result isn't real.
  Details: [FILTER-ISSUE-REPORT.md](FILTER-ISSUE-REPORT.md).
- **`IsShortcut` returns 500 under load.** Known product defect, listed separately in
  each report.
- **Single shared account.** Above ~150 users the login page becomes the bottleneck.
  Use an account pool (`data/users.csv`) for meaningful high-load numbers.

## Last recorded runs

| Scenario | Date | Peak VUs | Checks | business_errors | p95 server time |
|---|---|---|---|---|---|
| 2 | 27 Aug 2026 | 250 | 86% | 21% | 5.4 s |
| 2-held | 27 Aug 2026 | 250 | 88% | 16% | 2.5 s |
| 3 | 21 Jun 2026 | 250 | 100% | 0% | 0.34 s |
| 5 | 21 Jun 2026 | 250 | 100% | 0% | 0.34 s |
| 6 | 24 Jun 2026 | 50 | 100% | 0% | 1.1 s |

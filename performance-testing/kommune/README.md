# Kommune — https://kommune.mainmanager.is

WebForms build, plain username/password login (no OTP). Scenarios 1–6.

```bash
cp config.example.json config-kommune.json   # once; fill in the password
bash run.sh 2 --smoke                        # always first
bash run.sh 2 -e VUS=25 -e DURATION=5m
```

## Files

| Path | What |
|---|---|
| `run.sh` | Runner: `bash run.sh <1-6> [--smoke] [k6 args]` |
| `scenario1-mypage-kommune.js` … `scenario6-operationmaintenance-kommune.js` | The six scenarios |
| `lib/mainmanager.js` | Shared WebForms steps (login, open module, open record, filters, report) |
| `config.example.json` | Template for `config-kommune.json` (gitignored) |
| `scenario1-standalone/` | Scenario 1 in a single file with no library, plus its own `run.sh`. Easiest one to read |
| `kt/` | Knowledge-transfer kit: open `kt/scenario1-kt.html` in a browser. It explains every API call in Scenario 1 and why it is kept or dropped |
| `reports/scenario<N>/` | Run history |

## Config values

| Key | Value | Used by |
|---|---|---|
| `siteName` | `AKTIVITETSHUSET` | site filter (S2, S6), looked up by name at runtime |
| `municipalityName` | `Aarhus` | municipality filter (S2) |

## Scenario notes

- **S1** logs in every iteration (the dashboard is empty in a reused session).
  Widget snapshot id 4270 is Kommune-specific.
- **S4** opens the lease renegotiation record but deliberately does **not** save it.
  Every user would write to the same shared row, so the test would measure row-lock
  contention. The full reasoning is in the script header.
- **S6** uses its own site-filter function rather than the library one; the script header explains why.

## Last recorded runs (11 Oct 2026, 25 VUs)

| Scenario | Checks | http_req_failed | business_errors | p95 server time |
|---|---|---|---|---|
| 1 | 100% | 0% | 0% | 7.6 s |
| 2 | 76% | 20% | 37% | 4.1 s |
| 3 | 100% | 0% | 0% | 1.1 s |
| 4 | 99% | 0% | 0% | 0.75 s |
| 5 | 95% | 4% | 9% | 1.9 s |
| 6 | 84% | 10% | 22% | 2.7 s |

S2, S5 and S6 were not clean in that round. Before treating a new result as a
regression, open the matching `reports/scenario<N>/run-*/summary.html` and compare
which checks and endpoints failed.

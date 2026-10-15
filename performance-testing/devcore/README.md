# DevCore — https://kommunedevcore.mainmanager.is

The **ASP.NET Core** rebuild of MainManager (v20.25.1.CORE). The screens are the same
as Kommune, but the HTTP layer is different, so it has its own library
(`lib/mainmanager-core.js`). Scenarios 1–6.

```bash
cp config.example.json config-core.json      # once; fill in the password
bash run.sh 2 --smoke                        # always first
bash run.sh 2 -e VUS=25 -e DURATION=5m
```

## Files

| Path | What |
|---|---|
| `run.sh` | Runner: `bash run.sh <1-6> [--smoke] [k6 args]` |
| `scenario1-mypage-core.js` … `scenario6-operationmaintenance-core.js` | The six scenarios (these were `core-verified/` in the old layout) |
| `lib/mainmanager-core.js` | Core-build steps |
| `CORE-API-MAPPING.md` | **Read before changing anything.** WebForms → Core endpoint mapping and the gotchas below |
| `archive/` | Earlier August drafts of scenarios 3–6, kept for reference. Use the top-level files |
| `reports/scenario<N>/` | Run history |

## Things that look like bugs but aren't (all surface as a 403)

1. `InitMainLayout` **issues** the `UniqueString`; read it from the response. A made-up
   one makes the grid calls 403.
2. `BuildLayout`'s request body is the `InitMainLayout` response echoed back
   unchanged.
3. Menu item ids are per **tenant**, not per build (e.g. Sites 1783 here, 540 on bygst).
4. The ComboboxData checksum comes double-escaped; unescape `\uXXXX` or it 403s.

Payload styles are swapped compared with WebForms: grid calls are JSON here and
filter calls are form-encoded. Unlike Bygst, the filters **really do** narrow the grid
here (Buildings 4,433 → 1 by site → 798 by municipality).

## Last recorded runs (11 Oct 2026, 25 VUs)

| Scenario | Checks | http_req_failed | business_errors | p95 server time |
|---|---|---|---|---|
| 1 | 91% | 4% | 13% | 3.5 s |
| 2 | 100% | 0% | 0% | 3.2 s |
| 3 | 100% | 0% | 0% | 0.6 s |
| 4 | 100% | 0% | 0% | 0.5 s |
| 5 | 100% | 0% | 0% | 0.9 s |
| 6 | 99% | 0% | 3% | 0.8 s |

S1 and S6 were not fully clean in that round. Open the matching `reports/scenario<N>/run-*/summary.html` to see which checks failed before treating a new result as a regression.

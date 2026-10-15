# Odense — https://fm.odense.dk

"Odense kommune demo MainManager". WebForms build, same as Bygst, with two
differences. Only **Scenario 2** (Building archive) was built.

```bash
cp config.example.json config-odense.json    # once; fill in the password
bash run.sh 2 --smoke                        # always first
bash run.sh 2 -e VUS=25 -e DURATION=5m
```

## Files

| Path | What |
|---|---|
| `run.sh` | Runner: `bash run.sh 2 [--smoke] [k6 args]` |
| `scenario2-buildingarchive-odense.js` | S2: Sites → Buildings → site filter → city filter → clear |
| `lib/mainmanager.js` | Shared WebForms steps (same as Kommune/Bygst) |
| `lib/mainmanager-odense.js` | Odense-only changes on top of it (login, site lookup); re-exports the rest |
| `reports/scenario2/` | Run history (29 runs) |

## How Odense differs

1. **Two-step login**: `/api/v1/GetTempCode` → one-time code → `MMV2Login.aspx`
   postback. Handled in `lib/mainmanager-odense.js`.
2. **No Municipality filter.** The **City** filter (`cityName`: `Odense C`) is used
   instead.

Site `1101` is matched by prefix. Grid sizes when captured: Sites 850 rows, Buildings
2,286 rows.

## Last recorded run

17 Sep 2026, ramp to 150 VUs: checks 51%, business_errors 71%, p95 server time 3.3 s.
That run was **not** clean, so treat it as a stress observation, not a baseline.
Re-run a 25-VU baseline before comparing anything against it. Odense is a customer
environment: get sign-off before any load run.

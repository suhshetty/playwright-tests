#!/usr/bin/env bash
# Run the Scenario 2 HELD-SESSION variant and drop ALL THREE reports into one
# auto-numbered per-run folder:
#   PerformanceTests/reports/scenario2-held/run-<NNN>_<timestamp>/
#       summary.html    <- open this
#       summary.json
#       dashboard.html  <- k6 time-series charts
#
# Defaults reproduce the SHAPE of run-055/058 so the two models can be compared:
#   RAMP_SECONDS=300  (5m staggered logins)  +  LOOP_SECONDS=3300  (55m of journeys)
#   = 1 hour total, 250 VUs.
#
# Usage:
#   bash PerformanceTests/run-scenario2-held.sh                                  # 250 VU / 1h
#   bash PerformanceTests/run-scenario2-held.sh -e VUS=100 -e LOOP_SECONDS=900   # 100 VU / 15m
#   bash PerformanceTests/run-scenario2-held.sh -e VUS=25 -e LOOP_SECONDS=300 -e VERIFY=true
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BASE="PerformanceTests/reports/scenario2-held"
mkdir -p "$BASE"

COUNT=$(find "$BASE" -maxdepth 1 -type d -name 'run-*' 2>/dev/null | wc -l | tr -d ' ')
NNN=$(printf '%03d' "$((COUNT + 1))")
STAMP=$(date +%Y%m%d-%H%M%S)
DIR="$BASE/run-${NNN}_${STAMP}"
mkdir -p "$DIR"

echo "=== Scenario 2 HELD SESSION — run #$NNN ==="
echo "Reports -> $DIR"

# k6 exits 99 when thresholds are crossed. That is a RESULT, not a tooling failure —
# don't let `set -e` abort before the file listing below.
set +e
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT="$DIR/dashboard.html" \
  k6 run -e REPORT_DIR="$DIR" \
    -e VUS="${VUS:-250}" -e RAMP_SECONDS="${RAMP_SECONDS:-300}" -e LOOP_SECONDS="${LOOP_SECONDS:-3300}" \
    "$@" PerformanceTests/scenario2-heldsession.js
RC=$?
set -e

echo ""
echo "=== Done (k6 exit $RC). Files in $DIR: ==="
ls -1 "$DIR"
[ "$RC" -eq 99 ] && echo "(exit 99 = SLA thresholds crossed; the reports are complete)"
exit 0

#!/usr/bin/env bash
# Run Scenario 2 against the KOMMUNE tenant and drop ALL THREE reports into one
# auto-numbered per-run folder:
#   PerformanceTests/reports/scenario2-kommune/run-<NNN>_<timestamp>/
#       summary.html    <- open this
#       summary.json
#       dashboard.html  <- k6 time-series charts
#
# Same layout as run-scenario2.sh (bygst); only the target and script differ.
# BASE_URL is passed here because the shared library resolves its target at import
# time from -e BASE_URL or config.json — and config.json points at BYGST. Without
# this flag you would load-test the wrong customer. Credentials come from
# config-kommune.json (gitignored).
#
# Default profile: 5m ramp to 250 VUs + 5m soak = 10 minutes.
#
# Usage:
#   bash PerformanceTests/run-scenario2-kommune.sh                          # 250 VU / 10m
#   bash PerformanceTests/run-scenario2-kommune.sh -e VUS=1 -e DURATION=2m  # smoke
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BASE="PerformanceTests/reports/scenario2-kommune"
mkdir -p "$BASE"

COUNT=$(find "$BASE" -maxdepth 1 -type d -name 'run-*' 2>/dev/null | wc -l | tr -d ' ')
NNN=$(printf '%03d' "$((COUNT + 1))")
STAMP=$(date +%Y%m%d-%H%M%S)
DIR="$BASE/run-${NNN}_${STAMP}"
mkdir -p "$DIR"

echo "=== Scenario 2 KOMMUNE — run #$NNN ==="
echo "Target  -> https://kommune.mainmanager.is"
echo "Reports -> $DIR"

# k6 exits 99 when thresholds are crossed. That is a RESULT, not a tooling failure —
# don't let `set -e` abort before the file listing below.
set +e
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT="$DIR/dashboard.html" \
  k6 run -e REPORT_DIR="$DIR" \
    -e BASE_URL=https://kommune.mainmanager.is \
    "$@" PerformanceTests/scenario2-buildingarchive-kommune.js
RC=$?
set -e

echo ""
echo "=== Done (k6 exit $RC). Files in $DIR: ==="
ls -1 "$DIR"
[ "$RC" -eq 99 ] && echo "(exit 99 = SLA thresholds crossed; the reports are complete)"
exit 0

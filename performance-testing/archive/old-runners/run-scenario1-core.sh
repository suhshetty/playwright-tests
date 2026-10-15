#!/usr/bin/env bash
# Run Scenario 1 against a CORE tenant (kommunedevcore) and drop ALL THREE reports
# into one auto-numbered per-run folder:
#   PerformanceTests/reports/scenario1-core/run-<NNN>_<timestamp>/
#       summary.html    <- open this; includes the Server API errors table
#       summary.json
#       dashboard.html  <- k6 time-series charts
#
# BASE_URL is passed here because the core library resolves its target at import time
# and its LAST config fallback is config.json, which points at BYGST. The scenario
# throws without it. Credentials come from config-core.json (gitignored).
#
# Default profile: 5m ramp to 250 VUs + 5m soak = 10 minutes, 10s iteration delay.
#
# Usage:
#   bash PerformanceTests/run-scenario1-core.sh                                  # 250 VU / 10m
#   bash PerformanceTests/run-scenario1-core.sh -e VUS=1 -e DURATION=90s -e VERIFY=true
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BASE="PerformanceTests/reports/scenario1-core"
mkdir -p "$BASE"

COUNT=$(find "$BASE" -maxdepth 1 -type d -name 'run-*' 2>/dev/null | wc -l | tr -d ' ')
NNN=$(printf '%03d' "$((COUNT + 1))")
STAMP=$(date +%Y%m%d-%H%M%S)
DIR="$BASE/run-${NNN}_${STAMP}"
mkdir -p "$DIR"

echo "=== Scenario 1 CORE — run #$NNN ==="
echo "Target  -> https://kommunedevcore.mainmanager.is"
echo "Reports -> $DIR"

# k6 exits 99 when thresholds are crossed. That is a RESULT, not a tooling failure.
set +e
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT="$DIR/dashboard.html" \
  k6 run -e REPORT_DIR="$DIR" \
    -e BASE_URL=https://kommunedevcore.mainmanager.is \
    "$@" PerformanceTests/core-verified/scenario1-mypage-core.js
RC=$?
set -e

echo ""
echo "=== Done (k6 exit $RC). Files in $DIR: ==="
ls -1 "$DIR"
[ "$RC" -eq 99 ] && echo "(exit 99 = SLA thresholds crossed; the reports are complete)"
exit 0

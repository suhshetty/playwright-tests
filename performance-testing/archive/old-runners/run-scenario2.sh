#!/usr/bin/env bash
# Run Scenario 2 and drop BOTH reports into one auto-numbered per-run folder:
#   PerformanceTests/reports/scenario2/run-<NNN>_<timestamp>/
#       summary.html    <- honest report (open this)
#       summary.json
#       dashboard.html  <- k6 time-series charts
#
# Usage (from repo root or anywhere):
#   bash PerformanceTests/run-scenario2.sh                       # full 1->250 ramp
#   bash PerformanceTests/run-scenario2.sh -e VUS=1 -e DURATION=60s   # quick smoke
#   (any extra args are passed straight through to `k6 run`)
set -euo pipefail

# Always resolve paths from the repo root (parent of this script's dir).
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BASE="PerformanceTests/reports/scenario2"
mkdir -p "$BASE"

# Next run number = (existing run-* folders) + 1, zero-padded to 3 digits.
COUNT=$(find "$BASE" -maxdepth 1 -type d -name 'run-*' 2>/dev/null | wc -l | tr -d ' ')
NNN=$(printf '%03d' "$((COUNT + 1))")
STAMP=$(date +%Y%m%d-%H%M%S)
DIR="$BASE/run-${NNN}_${STAMP}"
mkdir -p "$DIR"

echo "=== Scenario 2 — run #$NNN ==="
echo "Reports -> $DIR"

K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT="$DIR/dashboard.html" \
  k6 run -e REPORT_DIR="$DIR" "$@" PerformanceTests/scenario2-buildingarchive.js

echo ""
echo "=== Done. Files in $DIR: ==="
ls -1 "$DIR"

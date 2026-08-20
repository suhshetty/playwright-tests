#!/usr/bin/env bash
# Generic Scenario runner — drops BOTH reports into one auto-numbered per-run folder:
#   PerformanceTests/reports/<scenarioN>/run-<NNN>_<timestamp>/
#       summary.html    <- honest report (open this)
#       summary.json
#       dashboard.html  <- k6 time-series charts
#
# Usage (from anywhere):
#   bash PerformanceTests/run-perf.sh scenario3-hr-orgtree.js                  # default profile
#   bash PerformanceTests/run-perf.sh scenario3-hr-orgtree.js -e VUS=1 -e DURATION=60s   # smoke
#   bash PerformanceTests/run-perf.sh scenario2-buildingarchive.js            # works for any scenario
#   (extra args after the script name are passed straight through to `k6 run`)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SCRIPT="${1:?usage: run-perf.sh <scenarioN-file.js> [k6 args]}"; shift || true
[ -f "$SCRIPT" ] || SCRIPT="PerformanceTests/$SCRIPT"
[ -f "$SCRIPT" ] || { echo "Script not found: $SCRIPT" >&2; exit 1; }

# Folder name = the scenario number (scenario3-hr-orgtree.js -> scenario3) so reports
# group cleanly and match the existing reports/scenario2 layout.
NAME="$(basename "$SCRIPT" .js | sed -E 's/^(scenario[0-9]+).*/\1/')"
BASE="PerformanceTests/reports/$NAME"
mkdir -p "$BASE"

COUNT=$(find "$BASE" -maxdepth 1 -type d -name 'run-*' 2>/dev/null | wc -l | tr -d ' ')
NNN=$(printf '%03d' "$((COUNT + 1))")
STAMP=$(date +%Y%m%d-%H%M%S)
DIR="$BASE/run-${NNN}_${STAMP}"
mkdir -p "$DIR"

echo "=== $NAME — run #$NNN ==="
echo "Reports -> $DIR"

K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT="$DIR/dashboard.html" \
  k6 run -e REPORT_DIR="$DIR" "$@" "$SCRIPT"

echo ""
echo "=== Done. Files in $DIR: ==="
ls -1 "$DIR"

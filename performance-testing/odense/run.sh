#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# ODENSE (https://fm.odense.dk, WebForms) — the only command you need.
#
#   bash run.sh                              # list the scenarios
#   bash run.sh 2 --smoke                    # 1 VU for 90s, logs real ids. Run this FIRST.
#   bash run.sh 2 -e VUS=25 -e DURATION=5m   # flat load
#   bash run.sh 2                            # full profile: 5m ramp to 250 VUs + 5m hold
#
# Works from any directory. Anything after the scenario number goes to `k6 run`.
# Credentials: config-odense.json in this folder (gitignored).
# Reports:     reports/scenario<N>/run-<NNN>_<timestamp>/summary.html
# ---------------------------------------------------------------------------
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

TITLE="Odense"
BASE_URL="${BASE_URL:-https://fm.odense.dk}"
CONFIG="config-odense.json"

scenario_file() {
  case "$1" in
    2) echo scenario2-buildingarchive-odense.js ;;
    *) return 1 ;;
  esac
}
list_scenarios() {
  echo "  2  Building archive: sites, buildings, site + city filters (only scenario built for Odense)"
}

source "$HERE/../common/run-lib.sh"

#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# KOMMUNE (https://kommune.mainmanager.is, WebForms) — the only command you need.
#
#   bash run.sh                              # list the scenarios
#   bash run.sh 2 --smoke                    # 1 VU for 90s, logs real ids. Run this FIRST.
#   bash run.sh 2 -e VUS=25 -e DURATION=5m   # flat load
#   bash run.sh 2                            # full profile: 5m ramp to 250 VUs + 5m hold
#
# Works from any directory. Anything after the scenario number goes to `k6 run`.
# Credentials: config-kommune.json in this folder (gitignored).
# Reports:     reports/scenario<N>/run-<NNN>_<timestamp>/summary.html
# ---------------------------------------------------------------------------
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

TITLE="Kommune"
BASE_URL="${BASE_URL:-https://kommune.mainmanager.is}"
CONFIG="config-kommune.json"

scenario_file() {
  case "$1" in
    1) echo scenario1-mypage-kommune.js ;;
    2) echo scenario2-buildingarchive-kommune.js ;;
    3) echo scenario3-hr-orgtree-kommune.js ;;
    4) echo scenario4-propertymanagement-kommune.js ;;
    5) echo scenario5-helpdesk-incident-kommune.js ;;
    6) echo scenario6-operationmaintenance-kommune.js ;;
    *) return 1 ;;
  esac
}
list_scenarios() {
  echo "  1  My page -> work-order widget -> My page -> logout (logs in every iteration)"
  echo "  2  Building archive: sites, buildings, site + municipality filters"
  echo "  3  Human resources: organisation trees, open company + person"
  echo "  4  Property management grids"
  echo "  5  Helpdesk: incidents grid, open an incident"
  echo "  6  Operation & maintenance: work orders, site + status filters"
}

source "$HERE/../common/run-lib.sh"

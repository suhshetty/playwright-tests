#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# BYGST (https://bygst.mainmanager.dk, WebForms) — the only command you need.
#
#   bash run.sh                              # list the scenarios
#   bash run.sh 2 --smoke                    # 1 VU for 90s, logs real ids. Run this FIRST.
#   bash run.sh 2 -e VUS=25 -e DURATION=5m   # flat load
#   bash run.sh 2                            # full profile: 5m ramp to 250 VUs + 5m hold
#
# Works from any directory. Anything after the scenario number goes to `k6 run`.
# Credentials: config.json in this folder (gitignored).
# Reports:     reports/scenario<N>/run-<NNN>_<timestamp>/summary.html
# ---------------------------------------------------------------------------
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

TITLE="Bygst"
BASE_URL="${BASE_URL:-https://bygst.mainmanager.dk}"
CONFIG="config.json"

scenario_file() {
  case "$1" in
    1)      echo scenario1-login-mypage-logout.js ;;
    1-ramp) echo scenario1-ramp.js ;;
    2)      echo scenario2-buildingarchive.js ;;
    2-held) echo scenario2-heldsession.js ;;
    3)      echo scenario3-hr-orgtree.js ;;
    5)      echo scenario5-helpdesk-incident.js ;;
    6)      echo scenario6-om-workorders.js ;;
    all)    echo scenarios/all.js ;;
    *) return 1 ;;
  esac
}
list_scenarios() {
  echo "  1       My page -> work-order widget -> My page -> logout (logs in every iteration)"
  echo "  1-ramp  Scenario 1 as an arrival-rate capacity ramp (PEAK_RATE iterations/min)"
  echo "  2       Building archive: sites, buildings, site + municipality filters"
  echo "  2-held  Scenario 2 on long-lived sessions (session-expiry soak)"
  echo "  3       Human resources: organisation trees, open company + person"
  echo "  5       Helpdesk: incidents grid, open an incident"
  echo "  6       Operation & maintenance: work orders, site + status filters"
  echo "  all     Weighted mix runner (currently Scenario 1 only)"
  echo "  (no scenario 4 was built for bygst)"
}

source "$HERE/../common/run-lib.sh"

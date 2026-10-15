#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# One command for the whole KT folder.
#
#   bash kommune/kt/run-kt.sh                      # smoke: 1 VU, 90s, row counts
#   bash kommune/kt/run-kt.sh -e VUS=25 -e DURATION=5m
#   bash kommune/kt/run-kt.sh --production         # the real repo scenario instead
#
# Credentials: read from kommune/config-kommune.json if it exists (so no
# password ever appears on your command line or in your shell history). Otherwise
# pass -e MM_USERNAME=... -e MM_PASSWORD=... yourself.
#
# Reports land in kommune/kt/reports/run-<NNN>_<timestamp>/.
# ---------------------------------------------------------------------------
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

BASE_URL="${BASE_URL:-https://kommune.mainmanager.is}"
SCRIPT="kommune/kt/scenario1-standalone.js"
MODE="standalone"

# --production swaps in the real scenario (which uses lib/ and writes full reports).
ARGS=()
for a in "$@"; do
  if [ "$a" = "--production" ]; then
    SCRIPT="kommune/scenario1-mypage-kommune.js"
    MODE="production"
  else
    ARGS+=("$a")
  fi
done

# Default to a smoke test when the caller passed no load settings of their own.
case " ${ARGS[*]-} " in
  *" -e VUS="*) : ;;
  *) ARGS+=(-e VUS=1 -e DURATION=90s -e VERIFY=true) ;;
esac

# --- credentials -----------------------------------------------------------
# The standalone script takes them via -e only. The production script reads
# config-kommune.json itself, so it needs nothing here.
CRED=()
if [ "$MODE" = "standalone" ]; then
  case " ${ARGS[*]-} " in
    *" -e MM_USERNAME="*) : ;;
    *)
      CFG="kommune/config-kommune.json"
      if [ -f "$CFG" ]; then
        U=$(python -I -c "import json,sys;print(json.load(open(sys.argv[1]))['username'])" "$CFG" 2>/dev/null)
        P=$(python -I -c "import json,sys;print(json.load(open(sys.argv[1]))['password'])" "$CFG" 2>/dev/null)
        if [ -n "${U:-}" ] && [ -n "${P:-}" ]; then
          CRED=(-e "MM_USERNAME=$U" -e "MM_PASSWORD=$P")
          echo "Credentials -> $CFG (user: $U)"
        fi
      fi
      if [ ${#CRED[@]} -eq 0 ]; then
        echo "ERROR: no credentials." >&2
        echo "  Either create $CFG  (copy kommune/kt/config.example.json)" >&2
        echo "  or pass  -e MM_USERNAME=<user> -e MM_PASSWORD='<password>'" >&2
        echo "  Single-quote the password: it contains ! which bash expands in double quotes." >&2
        exit 1
      fi
      ;;
  esac
fi

# --- report folder ---------------------------------------------------------
BASE="kommune/kt/reports"
mkdir -p "$BASE"
COUNT=$(find "$BASE" -maxdepth 1 -type d -name 'run-*' 2>/dev/null | wc -l | tr -d ' ')
DIR="$BASE/run-$(printf '%03d' "$((COUNT + 1))")_$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DIR"

echo "=== KT Scenario 1 — $MODE ==="
echo "Script  -> $SCRIPT"
echo "Target  -> $BASE_URL"
echo "Reports -> $DIR"
echo ""

# NOTE the ${ARR[@]+"${ARR[@]}"} idiom. Writing "${CRED[@]-}" instead expands an
# EMPTY array to one empty-string argument, which k6 then reads as a second script
# path and dies with: accepts 1 arg(s), received 2.
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT="$DIR/dashboard.html" \
  k6 run -e REPORT_DIR="$DIR" -e BASE_URL="$BASE_URL" \
    ${CRED[@]+"${CRED[@]}"} ${ARGS[@]+"${ARGS[@]}"} "$SCRIPT"
RC=$?

echo ""
echo "=== Done (k6 exit $RC). Files in $DIR: ==="
ls -1 "$DIR" 2>/dev/null
# k6 exits 99 when a threshold is crossed. That is a RESULT (SLA breached), not a
# tooling failure — the run was valid and the reports are complete.
[ "$RC" -eq 99 ] && echo "(exit 99 = SLA threshold crossed; this is a finding, not a broken test)"
exit 0

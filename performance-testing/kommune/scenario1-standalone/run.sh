#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Kommune Scenario 1 — the only command you need.
#
#   bash performance-testing/kommune/scenario1-standalone/run.sh                        # smoke: 1 VU, 90s
#   bash performance-testing/kommune/scenario1-standalone/run.sh -e VUS=25 -e DURATION=5m
#   bash performance-testing/kommune/scenario1-standalone/run.sh --load                  # 5m ramp to 250 + 5m hold
#
# Credentials come from config.json in this folder (gitignored) so no password ever
# lands in your shell history. Copy config.example.json to config.json to set it up.
# Or pass -e MM_USERNAME=... -e MM_PASSWORD='...' yourself.
#
# Reports land in reports/run-<NNN>_<timestamp>/ next to this script.
# ---------------------------------------------------------------------------
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
cd "$ROOT"

REL="${HERE#$ROOT/}"
SCRIPT="$REL/scenario1.js"
BASE_URL="${BASE_URL:-https://kommune.mainmanager.is}"

# --load drops the VUS default so the script's own staged ramp takes over.
LOAD=0
ARGS=()
for a in "$@"; do
  if [ "$a" = "--load" ]; then LOAD=1; else ARGS+=("$a"); fi
done

# Default to a smoke test unless the caller set a profile or asked for --load.
if [ "$LOAD" -eq 0 ]; then
  case " ${ARGS[*]-} " in
    *" -e VUS="*) : ;;
    *) ARGS+=(-e VUS=1 -e DURATION=90s -e VERIFY=true) ;;
  esac
fi

# --- credentials -----------------------------------------------------------
CRED=()
case " ${ARGS[*]-} " in
  *" -e MM_USERNAME="*) : ;;
  *)
    for CFG in "$HERE/config.json" "$HERE/../config-kommune.json"; do
      [ -f "$CFG" ] || continue
      U=$(python -I -c "import json,sys;print(json.load(open(sys.argv[1]))['username'])" "$CFG" 2>/dev/null)
      P=$(python -I -c "import json,sys;print(json.load(open(sys.argv[1]))['password'])" "$CFG" 2>/dev/null)
      if [ -n "${U:-}" ] && [ -n "${P:-}" ]; then
        CRED=(-e "MM_USERNAME=$U" -e "MM_PASSWORD=$P")
        echo "Credentials -> ${CFG#$ROOT/}  (user: $U)"
        break
      fi
    done
    if [ ${#CRED[@]} -eq 0 ]; then
      echo "ERROR: no credentials found." >&2
      echo "  Create $REL/config.json  (copy config.example.json)" >&2
      echo "  or pass  -e MM_USERNAME=<user> -e MM_PASSWORD='<password>'" >&2
      echo "  Single-quote the password in bash: ! is history-expanded in double quotes." >&2
      exit 1
    fi
    ;;
esac

# --- report folder ---------------------------------------------------------
BASE="$REL/reports"
mkdir -p "$BASE"
N=$(find "$BASE" -maxdepth 1 -type d -name 'run-*' 2>/dev/null | wc -l | tr -d ' ')
DIR="$BASE/run-$(printf '%03d' "$((N + 1))")_$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DIR"

echo "=== Kommune Scenario 1 ==="
echo "Target  -> $BASE_URL"
echo "Profile -> $([ "$LOAD" -eq 1 ] && echo '5m ramp to 250 VUs + 5m hold' || echo "${ARGS[*]-}")"
echo "Reports -> $DIR"
echo ""

# NOTE the ${ARR[@]+"${ARR[@]}"} idiom: "${ARR[@]-}" expands an EMPTY array to one
# empty-string argument, which k6 reads as a second script path and refuses.
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT="$DIR/dashboard.html" \
  k6 run -e BASE_URL="$BASE_URL" \
    ${CRED[@]+"${CRED[@]}"} ${ARGS[@]+"${ARGS[@]}"} \
    --summary-export="$DIR/summary.json" \
    "$SCRIPT" 2>&1 | tee "$DIR/console.log"
RC=${PIPESTATUS[0]}

echo ""
echo "=== Done (k6 exit $RC). Files in $DIR: ==="
ls -1 "$DIR" 2>/dev/null
# k6 exits 99 when a threshold is crossed. That is a RESULT (SLA breached), not a
# tooling failure: the run was valid and the reports are complete.
[ "$RC" -eq 99 ] && echo "(exit 99 = SLA threshold crossed — a finding, not a broken test)"
exit 0

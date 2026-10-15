#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Shared body of every <customer>/run.sh. Not meant to be run directly.
#
# The caller has already cd'd into its customer folder and defined:
#   TITLE, BASE_URL, CONFIG, scenario_file(), list_scenarios()
# ---------------------------------------------------------------------------

usage() {
  echo "Usage: bash run.sh <scenario> [--smoke] [k6 args]"
  echo ""
  echo "$TITLE scenarios ($BASE_URL):"
  list_scenarios
  exit 1
}

[ $# -ge 1 ] || usage
SC="$1"; shift
SCRIPT="$(scenario_file "$SC")" || { echo "Unknown scenario: $SC" >&2; echo "" >&2; usage; }

command -v k6 >/dev/null 2>&1 || {
  echo "ERROR: k6 is not on PATH." >&2
  echo "  Install it: https://grafana.com/docs/k6/latest/set-up/install-k6/" >&2
  echo "  (Windows: winget install k6 --source winget   — then reopen Git Bash)" >&2
  exit 1
}
[ -f "$CONFIG" ] || {
  echo "ERROR: $PWD/$CONFIG not found." >&2
  echo "  cp config.example.json $CONFIG   and fill in the password." >&2
  exit 1
}

# --smoke is shorthand for the "always run this first" profile.
ARGS=()
for a in "$@"; do
  if [ "$a" = "--smoke" ]; then ARGS+=(-e VUS=1 -e DURATION=90s -e VERIFY=true); else ARGS+=("$a"); fi
done

BASE="reports/scenario${SC}"
mkdir -p "$BASE"
# Next run number = highest existing run-NNN + 1 (not a folder count: history has gaps).
N=$(ls -1 "$BASE" 2>/dev/null | sed -nE 's/^run-0*([0-9]+)_.*/\1/p' | sort -n | tail -1)
DIR="$BASE/run-$(printf '%03d' "$(( ${N:-0} + 1 ))")_$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DIR"

echo "=== $TITLE — scenario $SC ==="
echo "Script  -> $SCRIPT"
echo "Target  -> $BASE_URL"
echo "Profile -> ${ARGS[*]:-default (5m ramp to 250 VUs + 5m hold)}"
echo "Reports -> $PWD/$DIR"
echo ""

# BASE_URL is always passed: several libraries resolve the target at import time and
# would otherwise fall back to a built-in default host (= the wrong customer).
#
# NOTE the ${ARR[@]+"${ARR[@]}"} idiom: "${ARR[@]-}" expands an EMPTY array to one
# empty-string argument, which k6 reads as a second script path and refuses.
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT="$DIR/dashboard.html" \
  k6 run -e REPORT_DIR="$DIR" -e BASE_URL="$BASE_URL" \
    ${ARGS[@]+"${ARGS[@]}"} "$SCRIPT" 2>&1 | tee "$DIR/console.log"
RC=${PIPESTATUS[0]}

echo ""
echo "=== Done (k6 exit $RC). Files in $DIR: ==="
ls -1 "$DIR" 2>/dev/null
# k6 exits 99 when an SLA threshold is crossed. That is a RESULT, not a broken test.
[ "$RC" -eq 99 ] && echo "(exit 99 = SLA threshold crossed — a finding, not a broken test)"
exit 0

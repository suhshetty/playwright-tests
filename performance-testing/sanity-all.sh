#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Sanity check of EVERY scenario for every customer, then one results table.
#
#   bash sanity-all.sh                       # 5 VUs x 1 minute per scenario
#   bash sanity-all.sh -e VUS=1 -e DURATION=90s   # any k6 args override the profile
#   ONLY="kommune devcore" bash sanity-all.sh     # a subset of customers
#
# Customers run IN PARALLEL; the scenarios of one customer run ONE AFTER ANOTHER.
# Each customer uses one shared account, so running its scenarios at the same time
# would mostly measure login contention on that account, not the scenarios.
# Expect roughly 2 minutes per scenario, ~15 minutes in total.
#
# Each run lands in <customer>/reports/scenario<N>/ as usual. A customer without
# its config file (see README) is skipped, not failed.
# ---------------------------------------------------------------------------
set -uo pipefail
# Ctrl+C / kill stops every child k6 run too, instead of leaving them orphaned.
trap 'trap - INT TERM; kill 0' INT TERM
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

PROFILE=("$@")
[ ${#PROFILE[@]} -eq 0 ] && PROFILE=(-e VUS=5 -e DURATION=1m)

declare -A SCENARIOS=(
  [kommune]="1 2 3 4 5 6"
  [devcore]="1 2 3 4 5 6"
  [bygst]="1 2 3 5 6"
  [odense]="2"
)
CUSTOMERS="${ONLY:-kommune devcore bygst odense}"

STAMP=$(date +%Y%m%d-%H%M%S)
LOGDIR="sanity-runs/$STAMP"
mkdir -p "$LOGDIR"
echo "=== Sanity run $STAMP — profile: ${PROFILE[*]} ==="
echo "Progress logs: $HERE/$LOGDIR/<customer>.log"
echo ""

run_customer() {
  local c=$1 log="$LOGDIR/$1.log"
  for s in ${SCENARIOS[$c]}; do
    echo "[$(date +%H:%M:%S)] $c scenario $s started"
    bash "$c/run.sh" "$s" ${PROFILE[@]+"${PROFILE[@]}"} >> "$log" 2>&1
    # The run folder just created is the newest run-* under reports/scenario<N>.
    local dir; dir=$(ls -1d "$c/reports/scenario$s"/run-* 2>/dev/null | sort -t- -k2 -n | tail -1)
    echo "$c|$s|$dir" >> "$LOGDIR/index.txt"
    echo "[$(date +%H:%M:%S)] $c scenario $s finished -> $dir"
  done
}

PORT=5665
for c in $CUSTOMERS; do
  cfg=$(grep -oE '^CONFIG="[^"]+"' "$c/run.sh" | cut -d'"' -f2)
  if [ ! -f "$c/$cfg" ]; then echo "SKIP $c: $c/$cfg not found"; continue; fi
  # One live-dashboard port per parallel customer, or all but one die at startup.
  # (Explicit export in a subshell: a VAR=x prefix on a backgrounded function is not
  # reliably passed down to the k6 processes it starts.)
  ( export K6_WEB_DASHBOARD_PORT=$PORT; run_customer "$c" ) &
  PORT=$((PORT + 1))
done
wait

echo ""
echo "=== Results ==="
node - "$LOGDIR/index.txt" <<'JS'
const fs = require('fs');
const rows = fs.existsSync(process.argv[2]) ? fs.readFileSync(process.argv[2], 'utf8').trim().split('\n') : [];
const pct = x => x == null ? '   -  ' : (x * 100).toFixed(1).padStart(5) + '%';
const sec = x => x == null ? '    -  ' : (x / 1000).toFixed(2).padStart(6) + 's';
console.log('Customer  Sc  Iter  Checks  HttpFail  BizErr  p95 server  Verdict');
let bad = 0;
for (const r of rows.sort()) {
  const [c, s, dir] = r.split('|');
  let m;
  try { m = JSON.parse(fs.readFileSync(`${dir}/summary.json`, 'utf8')).metrics; }
  catch (e) { console.log(`${c.padEnd(9)} ${s.padEnd(3)} no summary.json — see ${dir}/console.log`); bad++; continue; }
  const v = (k, f) => m[k] && (m[k].values || m[k])[f];
  const checks = v('checks', 'rate'), fail = v('http_req_failed', 'rate'), biz = v('business_errors', 'rate');
  const iters = v('iterations', 'count') || 0;
  // A journey longer than DURATION completes 0 iterations but can still be error-free;
  // judge it on its steps (business_errors) and flag that it never finished a loop.
  const ops = m.business_errors ? ((m.business_errors.values || m.business_errors).passes || 0) + ((m.business_errors.values || m.business_errors).fails || 0) : 0;
  const ok = (iters > 0 || ops > 0) && checks >= 0.95 && (biz == null || biz <= 0.05);
  if (!ok) bad++;
  const note = ok && iters === 0 ? '  (journey longer than DURATION; steps all OK)' : '';
  console.log(`${c.padEnd(9)} ${s.padEnd(3)} ${String(iters).padStart(4)}  ${pct(checks)}  ${pct(fail)}   ${pct(biz)}  ${sec(v('http_req_waiting', 'p(95)'))}     ${ok ? 'PASS' : 'CHECK'}${note}`);
}
console.log(`\n${rows.length - bad}/${rows.length} clean (PASS = >=95% checks, <=5% business errors).`);
console.log('For any CHECK row, open that run\'s summary.html.');
JS

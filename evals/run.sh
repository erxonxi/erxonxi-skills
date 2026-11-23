#!/usr/bin/env bash
# Run the eval suite by layer. Usage: evals/run.sh [trigger|knowledge|plan|repo|code|all] [extra claude plugin eval flags]
# Score the results by goal with evals/score.py (see the README).
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

layer="${1:-all}"; shift || true
model="${EVAL_MODEL:-sonnet}"
judge="${EVAL_JUDGE:-opus}"

# Repo cases get unscoped Bash: scoped prefixes deny compound commands and heredocs,
# and the agent then stops verifying. The eval sandbox still confines the shell.
# The desktop app injects credentials that the eval child must not inherit.
run_eval() {
  env -u ANTHROPIC_API_KEY -u ANTHROPIC_BASE_URL -u CLAUDECODE -u CLAUDE_CODE_ENTRYPOINT \
    claude plugin eval . --trust-plugin --no-publish --model "$model" --judge-model "$judge" "$@"
}

repo_tools=(Write Edit Bash)

trigger()   { run_eval --case 'trigger-*' --ablation none -j 4 "$@"; }
knowledge() { run_eval --case 'knowledge-*' -j 4 "$@"; }
plan()      { run_eval --case 'plan-*' --scaffold --allow-tools Write Edit -j 3 "$@"; }
repo()      { run_eval --case 'repo-*' --scaffold --allow-tools "${repo_tools[@]}" -j 3 "$@"; }
code()      { run_eval --case 'code-*' --scaffold --allow-tools "${repo_tools[@]}" -j 3 "$@"; }

case "$layer" in
  trigger|knowledge|plan|repo|code) "$layer" "$@" ;;
  all)
    status=0
    for l in trigger knowledge plan repo code; do "$l" "$@" || status=1; done
    exit "$status" ;;
  *) echo "unknown layer: $layer" >&2; exit 64 ;;
esac

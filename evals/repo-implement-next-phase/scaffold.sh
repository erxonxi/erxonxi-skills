#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
acme::add_plan
# A neutral plan: drop the closing "Evaluate and stop" tasks, so the procedure comes from the skill, not the plan.
sed -i '/Evaluate and stop/d' .agents/plans/2026-11-20-restock-alerts.md
acme::commit_baseline

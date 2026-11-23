#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
acme::add_plan
# A neutral plan: the closing task does not name the evaluate skill, so the procedure comes from the skill, not the plan.
sed -i 's|^- \[ \] Evaluate and stop: .*$|- [ ] Review and stop: check the phase against its contracts, write the commit message, wait for the user|' .agents/plans/2026-11-20-restock-alerts.md
grep -q 'Review and stop' .agents/plans/2026-11-20-restock-alerts.md
acme::commit_baseline

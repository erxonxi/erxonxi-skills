#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
mkdir -p .agents/plans
cp "$FIXTURES/order-refunds-plan.md" .agents/plans/2026-11-22-order-refunds.md
acme::commit_baseline
acme::add_code refunds-phase1-done

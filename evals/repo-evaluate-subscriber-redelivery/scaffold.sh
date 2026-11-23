#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
acme::add_plan restock-alerts-plan-notify-once.md
acme::add_code restock-phase1-done
acme::commit_baseline
acme::add_code restock-phase2-redelivery

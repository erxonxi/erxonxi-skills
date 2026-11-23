#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
# Phase 2 has two unchecked tasks and no subscriber, but Next step already says Phase 3.
acme::add_plan restock-alerts-plan-conflict.md
acme::add_code restock-phase1-done
acme::add_code restock-phase2-started
acme::commit_baseline

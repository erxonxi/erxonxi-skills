#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
acme::add_plan restock-alerts-plan-resume.md
acme::add_code restock-phase1-done
acme::add_code restock-phase2-started
acme::commit_baseline

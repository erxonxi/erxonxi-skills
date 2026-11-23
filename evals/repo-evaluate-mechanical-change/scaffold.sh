#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
acme::commit_baseline
# Uncommitted: a local variable renamed and two lines of docs fixed. Nothing else changes.
f=src/contexts/notifications/order-confirmations/application/send/OrderConfirmationEmailSender.js
sed -i 's|const total = |const totalEur = |; s|\${total} EUR|${totalEur} EUR|' "$f"
sed -i 's|the verification command, the same as CI\.|the verification command, the same as CI (today it runs `node --test`).|' AGENTS.md
sed -i 's|None written yet\.|None written yet; add one per convention.|' docs/conventions/README.md
grep -q 'totalEur} EUR' "$f"
grep -q 'today it runs' AGENTS.md
grep -q 'add one per convention' docs/conventions/README.md

#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
cp -R "$FIXTURES/orders-script/." .
acme::commit_baseline

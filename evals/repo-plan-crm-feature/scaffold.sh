#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_crm
acme::commit_baseline

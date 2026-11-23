#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::add_code greenfield
# The greenfield fixture describes restock alerts; this case is about a personal notes tool.
sed -i 's|acme-restock|notes|; s|Backend for restock alerts\.|A small personal notes service.|' AGENTS.md package.json
grep -q 'personal notes' AGENTS.md
acme::commit_baseline

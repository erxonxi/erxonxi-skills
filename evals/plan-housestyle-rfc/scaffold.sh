#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
acme::add_code shop-rfcs
sed -i 's|^- Plans live in `.agents/plans/`.$|- Plans are RFCs in `docs/rfcs/`, numbered (`NNNN-slug.md`), with the sections Problem, Proposal and Steps and no front matter.|' AGENTS.md
grep -q 'docs/rfcs' AGENTS.md
acme::commit_baseline

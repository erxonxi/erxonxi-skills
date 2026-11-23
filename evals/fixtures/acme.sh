# Shared scaffold helpers for cases that run against the acme-shop fixture.
# Sourced by each case's scaffold.sh; the current directory is the run's workspace.
FIXTURES="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

acme::git() {
  GIT_AUTHOR_NAME=acme GIT_AUTHOR_EMAIL=acme@example.invalid \
  GIT_COMMITTER_NAME=acme GIT_COMMITTER_EMAIL=acme@example.invalid \
  GIT_AUTHOR_DATE="2026-11-20T10:00:00Z" GIT_COMMITTER_DATE="2026-11-20T10:00:00Z" \
  git -c init.defaultBranch=main -c commit.gpgsign=false "$@"
}

acme::copy_shop() {
  cp -R "$FIXTURES/acme-shop/." .
}

# Optional argument: another plan fixture to use instead of restock-alerts-plan.md.
acme::add_plan() {
  mkdir -p .agents/plans
  cp "$FIXTURES/${1:-restock-alerts-plan.md}" .agents/plans/2026-11-20-restock-alerts.md
}

# Copies a fixture directory (for example restock-phase1-done) over the workspace.
acme::add_code() {
  cp -R "$FIXTURES/$1/." .
}

acme::commit_baseline() {
  acme::git init -q
  acme::git add -A
  acme::git commit -q -m "chore: baseline"
}

acme::copy_crm() {
  cp -R "$FIXTURES/acme-crm/." .
}

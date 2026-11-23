# Project scaffolding

How to set up the tooling of a new project so an agent can verify its own work from the first commit.

- The minimal skeleton is one class, one test for that class, and the lint + test + CI loop working from the first minute. Nothing more.
- Commands with fixed names, the same in every project: `test`, `lint`, `lint:fix`, `build`, `static-analysis` where it exists, and a single composite verification command (`check` or `prep`) that runs the same as CI.
- Native package manager scripts by default. `Makefile` as an entry point only when there is Docker or several tools.
- Lockfile in the repository and install from it in CI.
- `.editorconfig` always. Linter and formatter imported from a shared, versioned configuration, not loose per-project rules.
- A place for tests of custom checks from the start, so `erxonxi-rule` has somewhere to put them.
- Docker only for stateful dependencies, with services named by role and pinned versions.
- Few runtime dependencies. Automated, grouped updates.
- CI on every PR: install, lint, test (and build or static analysis).
- Repository name that shows what it is: `<language>-<topic>-<type>`.
- Shell scripts: strict mode and namespaced functions.
- Agent instructions live once: `AGENTS.md` holds the rules, `.agents/skills/` holds the skills. Agents that expect other paths get a symlink (`CLAUDE.md → AGENTS.md`, `.claude/skills → .agents/skills`), created by a script, not hand-copied.

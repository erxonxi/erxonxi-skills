# Checks beyond the linter

Rung 6 of `SKILL.md`: a test in the runner the project already has. Use it when the convention crosses files, lives in files that are not code, or the language has no linter that can express it.

## Shapes

| Convention | Test shape |
|---|---|
| A layer does not import another | Build the import graph and assert that no module under `domain/` imports from `infrastructure/`, a framework or a driver |
| A context does not reach into another | Assert that imports between contexts only target the other's public use cases or event types |
| Every use case folder holds one class with one public method | List the folders under `application/`, load each, assert on its public surface |
| Every domain event is named as a past fact | Find every subclass of the domain event base type and assert its name ends in `DomainEvent` |
| A migration is never edited after it ships | Compare the migration files with the ones in the main branch and fail on any change to an existing file |
| Every public endpoint is documented | Read the route table and the contract file and assert both list the same endpoints |
| No secret-looking value in configuration | Scan the configuration files with a pattern list and fail on a match outside an allowed list |

## Rules for these tests

- They run inside the normal test command and in CI, and finish in seconds.
- Their failure message follows the same rule as a lint message: what to do instead and `Convention: <doc path>`.
- Their exemptions are an explicit list next to the test, marked as shrink-only, and the test fails when a listed entry no longer violates the rule.
- They assert on structure the code really has (paths, imports, base types, exported names), never on a guess about intent.

## Off-the-shelf options

Before writing one by hand, check whether an architecture or dependency-boundary tool already exists for the stack (import boundary linters, architecture test libraries, the build system's own dependency graph). Prefer one already installed. A new one needs the user's yes, and it must run inside the existing verification command, not beside it.

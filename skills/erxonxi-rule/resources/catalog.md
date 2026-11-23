# Catalog: conventions of these skills and their usual check

A starting point, not a decision: the project's tooling chooses the final mechanism. Rung numbers are those of `SKILL.md` step 3. "Prose" means no check can be complete and precise, so the convention stays as a short doc with examples.

| Convention (skill) | Usual rung | How |
|---|---|---|
| The domain imports nothing technical (`erxonxi-architecture`) | 3 or 6 | Restricted imports scoped to `**/domain/**`, or an architecture test over the import graph |
| A context never imports another's `domain` or `infrastructure` (`erxonxi-architecture`) | 3 or 6 | Dependency-boundary rule per context, or architecture test |
| No `Manager`, `Helper`, `Util`, `Impl` or `I` prefix in names (`erxonxi-clean-code`) | 3 | Naming pattern rule on class and type names |
| No default parameters (`erxonxi-clean-code`) | 2 or 3 | Built-in rule where it exists, otherwise restricted syntax |
| No boolean flag parameters (`erxonxi-clean-code`) | 5 | Custom rule on public signatures with a boolean parameter. Exact only on public methods |
| Use case: one class, one public method (`erxonxi-architecture`) | 6 | Architecture test over `application/` |
| No setters on aggregates (`erxonxi-domain-modeling`) | 3 or 6 | Restricted syntax on `set*` methods under `domain/`, or test |
| Errors are named classes, never a generic error with a message (`erxonxi-domain-modeling`) | 3 | Restricted syntax: forbid raising the base error type under `domain/` and `application/`. In languages whose idiom is error values, the same rule on the error constructors |
| `find` fails when nothing is found, `search` may return nothing (`erxonxi-domain-modeling`) | 1 or prose | With static types: `search` returns an optional type, `find` does not. Without them it stays as prose |
| Tests do not mock third-party libraries (`erxonxi-testing`) | 3 | Restricted imports of the mocking API on third-party modules inside tests |
| Test data comes from Object Mothers (`erxonxi-testing`) | Prose | Telling a mother from inline data in every case needs judgment |
| Names reveal intent (`erxonxi-clean-code`) | Prose | Judgment |
| Each rule lives in one place, as deep as possible (`erxonxi-domain-modeling`) | Prose | Judgment |
| Formatting (`erxonxi-clean-code`) | 1 | The formatter, run in the verification command |
| Commit message format (`erxonxi-workflow`) | 7 | A commit message linter (a new tool unless one is installed), run in a commit hook and in CI |
| PR size (`erxonxi-workflow`) | 6 or 7 | A CI step that counts changed lines and fails above the limit: a small script in the existing runner, or a CI action (new tool) |

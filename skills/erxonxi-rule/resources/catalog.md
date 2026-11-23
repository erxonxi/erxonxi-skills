# Catalog: conventions of these skills and their usual check

A starting point, not a decision: the project's tooling chooses the final mechanism. "Prose" means no check can be exact, so the convention stays as a short doc with examples.

| Convention (skill) | Usual rung | How |
|---|---|---|
| The domain imports nothing technical (`erxonxi-architecture`) | 3 or 6 | Restricted imports scoped to `**/domain/**`, or an architecture test over the import graph |
| A context never imports another's `domain` or `infrastructure` (`erxonxi-architecture`) | 3 or 6 | Dependency-boundary rule per context, or architecture test |
| No `Manager`, `Helper`, `Util`, `Impl` or `I` prefix in names (`erxonxi-clean-code`) | 3 | Naming pattern rule on class and type names |
| No default parameters (`erxonxi-clean-code`) | 2 or 3 | Built-in rule where it exists, otherwise restricted syntax |
| No boolean flag parameters (`erxonxi-clean-code`) | 5 | Custom rule on public signatures with a boolean parameter. Exact only on public methods |
| Use case: one class, one public method (`erxonxi-architecture`) | 6 | Architecture test over `application/` |
| No setters on aggregates (`erxonxi-domain-modeling`) | 3 or 6 | Restricted syntax on `set*` methods under `domain/`, or test |
| Errors are named classes, never a generic error with a message (`erxonxi-domain-modeling`) | 3 | Restricted syntax: forbid throwing the base error type under `domain/` and `application/` |
| `find` throws, `search` may return nothing (`erxonxi-domain-modeling`) | 1 | Return types: `search` returns an optional or nullable type, `find` does not |
| Tests do not mock third-party libraries (`erxonxi-testing`) | 3 | Restricted imports of the mocking API on third-party modules inside tests |
| Test data comes from Object Mothers (`erxonxi-testing`) | Prose | Telling a mother from inline data in every case needs judgment |
| Names reveal intent (`erxonxi-clean-code`) | Prose | Judgment |
| Each rule lives in one place, as deep as possible (`erxonxi-domain-modeling`) | Prose | Judgment |
| Formatting (`erxonxi-clean-code`) | 1 | The formatter, run in the verification command |
| Commit message format (`erxonxi-workflow`) | 6 or hook | Commit message linter in a commit hook and in CI |
| PR size (`erxonxi-workflow`) | CI | A CI job that fails or labels above the size limit |

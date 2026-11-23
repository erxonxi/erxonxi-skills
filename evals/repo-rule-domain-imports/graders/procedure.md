---
type: llm
focus: trace
---
The repository has one existing violation: `src/contexts/catalog/products/domain/ProductPrice.js` imports `../infrastructure/LegacyPriceFormatter.js`. Judge the whole run. Pass only if every numbered claim holds:

1. The run added an automatic check (a test run by `node --test`, or an equivalent check run by the project's test or check command) that fails when a file under a `domain` folder imports from an `infrastructure` folder.
2. The existing violation in ProductPrice.js is handled by an explicit exemption list (or an equally explicit allow-list) inside or next to the check, so the check passes today; the run did not rewrite ProductPrice.js or LegacyPriceFormatter.js to remove the violation.
3. The run showed with real command output that the check catches a violation that is not exempt and passes otherwise: by temporarily removing an exemption and restoring it with Edit, by a temporary violating file, or by test cases of the check itself that feed it violating and clean sources. It did not need to delete a file or use git.
4. The run wrote a short convention document that names the rule and points to the check that enforces it.
5. The final answer reports what was added and what was run, and does not claim that a command passed unless the trace shows it.

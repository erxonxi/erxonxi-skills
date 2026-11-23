---
type: llm
focus: {source: file, path: docs/returns-breakdown.md}
---
The user asked for a breakdown of a returns-and-refunds epic (shopper requests a return of order items, support approves or rejects, a return label is emailed, refund when the parcel arrives, stock back to the catalog, a back-office list of open returns, a monthly report) for a team of one backend, one frontend and one QA developer. It was written to `docs/returns-breakdown.md`.

Pass only if every numbered claim holds for the document:

1. It contains a scope cut for the first release (an MVP or equivalent) that says what is in it, what is done by hand behind the scenes for now, and what comes later.
2. That cut appears before the list of slices, not after it or only implied by the slice order.
3. The part done by hand names at least one concrete manual step (for example support issuing refunds or sending labels manually, or a spreadsheet instead of a back-office screen), not just a generic statement that some things are manual.

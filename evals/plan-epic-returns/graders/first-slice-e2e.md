---
type: llm
focus: {source: file, path: docs/returns-breakdown.md}
---
The user asked for a breakdown of a returns-and-refunds epic (shopper requests a return of order items, support approves or rejects, a return label is emailed, refund when the parcel arrives, stock back to the catalog, a back-office list of open returns, a monthly report) for a team of one backend, one frontend and one QA developer, and asked how long it will take. It was written to `docs/returns-breakdown.md`.

Pass only if this holds for the document: the first slice to build is a thin path from end to end that a user can observe (for example a shopper requests a return and sees it, or support sees and decides it), not a technical layer, a data model, an API without a consumer, or one person's share of the work.

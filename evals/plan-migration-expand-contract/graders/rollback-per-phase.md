---
type: llm
---
The answer is a plan to replace `orders.customer_name` (free text) with a `customer_id` foreign key on a live Postgres table with four million rows, no downtime, and two writers (the shop API and the back office) released independently.

Pass only if this holds: every phase states how that phase is rolled back or undone (for example drop the new column, stop the backfill, redeploy the previous version), and the plan says that only the phase that removes the old column cannot be undone. A rollback mentioned for only some phases, or only in general, does not pass.

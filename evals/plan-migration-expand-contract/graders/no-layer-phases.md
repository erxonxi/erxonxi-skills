---
type: llm
---
The answer is a plan to replace `orders.customer_name` (free text) with a `customer_id` foreign key on a live Postgres table with four million rows, no downtime, and two writers (the shop API and the back office) released independently.

Pass only if this holds: there are no phases by technical layer (database, backend, frontend) and no final phase reserved only for tests or cleanup.

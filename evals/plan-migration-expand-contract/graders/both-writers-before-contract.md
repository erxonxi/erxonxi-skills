---
type: llm
---
The answer is a plan to replace `orders.customer_name` (free text) with a `customer_id` foreign key on a live Postgres table with four million rows, no downtime, and two writers (the shop API and the back office) released independently.

Pass only if this holds: both deployables (shop API and back office) write the new column, or both shapes are kept in step for them, before anything stops writing or reading `customer_name`. The old column is not removed while either deployable may still use it.

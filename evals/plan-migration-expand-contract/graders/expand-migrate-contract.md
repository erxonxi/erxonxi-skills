---
type: llm
---
The answer is a plan to replace `orders.customer_name` (free text) with a `customer_id` foreign key on a live Postgres table with four million rows, no downtime, and two writers (the shop API and the back office) released independently.

Pass only if this holds: the phases follow expand, migrate, contract. First the new column exists and both shapes are kept in step, then existing rows are backfilled and readers and writers move to the new column, and only at the end the old column is removed. Each phase can be released on its own.

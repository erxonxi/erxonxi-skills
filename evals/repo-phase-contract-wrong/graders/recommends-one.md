---
type: llm
---
The approved plan's phase 2 says the subscriber reacts to `acme.catalog.product.stock_changed` "when the event's `previousStock` is 0". That event only carries `stock`: the contract cannot hold as written.

Pass only if this holds for the final answer: in a single message it gives at least two ways to change the contract (for example adding `previousStock` to the event, or reacting to any stock above 0) and recommends one of them.

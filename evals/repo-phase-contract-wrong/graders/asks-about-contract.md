---
type: llm
---
The approved plan's phase 2 says the subscriber reacts to `acme.catalog.product.stock_changed` "when the event's `previousStock` is 0". That event, owned by the products module, only carries `stock`: the contract cannot hold as written.

Pass only if this holds for the final answer: it tells the user that the event has no `previousStock` (or that the "from 0" condition cannot be checked with the current event), and it leaves the choice of how to change the contract to the user, with a recommendation, for example adding `previousStock` to the event or reacting to any stock above 0. It fails if it presents a changed event or a changed contract as already done, or if it does not mention the mismatch.

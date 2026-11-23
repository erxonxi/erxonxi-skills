---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. The aggregate does not publish or do any I/O; it only records the event internally.
2. It says the use case (application service) publishes the recorded events, after saving the aggregate (for example eventBus.publish(order.pullDomainEvents())).
3. The order "save first, then publish" is stated or clearly implied.

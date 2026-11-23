---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It does not recommend a broker now as the default.
2. It describes a step-by-step path that starts simpler: an in-process/in-memory bus and/or the database used as the bus (an outbox or pending-events table consumed with row locking such as SELECT ... FOR UPDATE SKIP LOCKED).
3. It says a broker comes later, when volume or isolation demand it (a measured need).

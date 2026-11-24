---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge meaning, not vocabulary, and accept extra reasonable content. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. The state of the process lives in one aggregate that owns it (a `Return` with states such as requested, approved, label sent, received, refunded, cancelled), so where a return stands can be read from that one aggregate.
2. Each step is its own use case, started by a person or by a subscriber reacting to an event, and the steps that react to events are idempotent.
3. Undoing is a named business action on the aggregate (cancel, reject, mark refund failed), not a technical rollback across contexts.
4. The 30-day deadline is handled by a scheduled job that finds returns stuck in a state and cancels them, not by timers held in memory.
5. It does not recommend, as the default, a saga or process-manager class, an orchestrator service or a workflow engine (Temporal, Camunda, Step Functions and similar).

---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge meaning, not vocabulary, and accept extra reasonable content. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. A failing subscriber must not make the code that publishes the event fail: the API call should still succeed once the deal is saved (for example by isolating or catching subscriber errors, or by delivering asynchronously).
2. If the email cannot be lost, the intent to notify is recorded durably together with the deal save, in the same transaction (for example an outbox table), and delivered afterwards with retries.
3. It says the subscriber must tolerate being run more than once for the same event, because retries cause duplicates (idempotent handling, deduplication by event id).
4. It does not make a message broker or external queue the first step; any mention of a broker is as a later option when the simpler fix is not enough.

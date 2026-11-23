---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge meaning, not vocabulary, and accept extra reasonable content. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. The use case checks for an existing user with that email through the repository and fails with a specific, named error (for example EmailAlreadyRegisteredError) when one exists.
2. It says that this check alone cannot stop two simultaneous requests, and that a unique constraint or index on email in the database is what actually guarantees uniqueness under concurrency.
3. The violation of that constraint is translated, in the persistence adapter, into the same named error the use case raises; neither the domain nor the use case inspects database-specific error codes or messages.

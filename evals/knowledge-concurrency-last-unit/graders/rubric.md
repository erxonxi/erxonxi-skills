---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge meaning, not vocabulary, and accept extra reasonable content. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. The stock rule stays in the `Product` aggregate (`purchase` keeps throwing when there is not enough stock); the fix does not move the business rule into the use case or controller.
2. The race is closed at the write: either the repository saves with optimistic concurrency (the aggregate carries a version and the save fails when the stored version changed since it was read), or the adapter writes with a single conditional statement that only succeeds when the stock is still enough.
3. A lost race surfaces as a named domain error (concurrent modification, out of stock or equivalent) that the entry point maps to a response such as 409, or that the caller retries by rerunning the whole use case.
4. It does not put a lock in the application layer: no mutex, no in-process lock, and no `SELECT ... FOR UPDATE` or explicit lock taken from the use case.
5. It proposes a test that reproduces the race (two purchases of the last unit at the same time, one succeeds and one fails).

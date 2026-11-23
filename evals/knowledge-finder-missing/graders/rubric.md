---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It recommends throwing (raising) a specific, named domain error such as ProductDoesNotExistError or ProductNotFoundError.
2. It does not make returning null, undefined, an Optional or a Result/Either the recommended answer for this finder.
3. It distinguishes this from a search or listing operation that may legitimately find nothing, OR it says the error is translated at the edge (for example to HTTP 404).
4. If it names the use case method, the name is `find` (the verb of `ProductFinder`), not `execute`, `handle` or `run`.

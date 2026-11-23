---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It says separate booleans are a problem because they can contradict each other or represent impossible states.
2. It recommends a single state with explicit variants (an enumeration or discriminated union such as Initial | Loading | Success | Error).
3. It recommends handling the variants exhaustively (an exhaustive switch or equivalent).

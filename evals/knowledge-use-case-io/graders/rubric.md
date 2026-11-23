---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. Input: primitives (strings, numbers) or a plain request/command object made of primitives, not domain objects built by the controller.
2. Output: nothing, primitives or a response DTO; it never returns the domain aggregate or entity to the caller.
3. Value objects and the aggregate are created inside the use case or the domain, not in the controller.

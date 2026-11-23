---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. The default it recommends is that the controller (entry point) calls the use case (application service) directly, with nothing dispatching in between.
2. It says a command/query bus is justified only under specific conditions, naming at least one of: the project already uses one, middlewares are needed (transactions, logging, auth around every command), or asynchronous execution.
3. It does not recommend introducing a command bus from day one as the default.

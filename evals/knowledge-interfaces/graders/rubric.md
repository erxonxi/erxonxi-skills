---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It says no interface per class by default.
2. It names when an interface is justified: at least one of the input/output boundary (repositories, gateways, clocks) or real variation (several implementations, replacement in tests).
3. It rejects the I prefix and recommends naming by role, with the technology as prefix for implementations (for example PostgresOrderRepository).

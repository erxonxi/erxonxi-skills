---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It says no interface per class by default.
2. It names when an interface is justified, including at least the input/output boundary (repositories, gateways, clocks), and optionally real variation or replacement in tests.
3. It rejects the I prefix (and Impl-style suffixes) and recommends naming by role, with the technology as prefix for implementations (for example PostgresOrderRepository).

---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It says no: end-to-end tests should not be the base of the strategy.
2. It recommends that the base is unit tests of use cases through their public API with their ports replaced, plus integration tests of each adapter against the real technology (real database).
3. It keeps HTTP or end-to-end tests few, limited to critical paths.

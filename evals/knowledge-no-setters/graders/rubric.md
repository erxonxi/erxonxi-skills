---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It does not use a plain setter on the entity (it rejects or avoids it).
2. It proposes a method named after the business intent (for example changePrice, reprice, updatePrice) that validates the new value (a Price value object or invariant check).
3. It says that method records a domain event named after the fact (for example ProductPriceChanged / ProductRepriced), not a generic ProductUpdated.

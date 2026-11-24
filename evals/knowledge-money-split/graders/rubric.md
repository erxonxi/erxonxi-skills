---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge meaning, not vocabulary, and accept extra reasonable content.

1. Amounts are kept as integers in the currency's minor unit (cents) together with a currency, never as binary floats.
2. Splitting a refund allocates the leftover minor units to some of the parts, so the parts always add up exactly to the total.
3. Rounding follows one explicit rule applied in one place (a money type or a single function), and `toFixed` is only for display.

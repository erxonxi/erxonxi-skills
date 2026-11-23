---
type: llm
---
The request leaves real decisions open (coupon types, stacking, limits per customer, which context owns coupons, expiry). Pass only if every numbered claim holds:

1. Before presenting a full phased plan as final, the answer asks the user questions about decisions that change the design (at least two of: types of discount, whether coupons stack, usage limits, ownership/context, expiry, who creates coupons).
2. The questions come together in a single round (one list), not one question with a promise of more rounds later.
3. Each question, or most of them, comes with a recommended answer or default the user can simply accept.
4. It does not start writing implementation code.

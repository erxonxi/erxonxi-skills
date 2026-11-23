---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge meaning, not vocabulary, and accept extra reasonable content. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. For the credit-limit check it recommends asking billing at the moment of the decision (a synchronous query for the current value), reasoning that this decision needs the up-to-date limit, rather than relying on a locally stored copy.
2. The question is expressed through an interface that checkout itself defines in the shape it needs, implemented by an adapter that calls billing's public surface; checkout does not import billing's domain or infrastructure.
3. It says that a local copy built from billing's events is the better fit elsewhere, for example for lists and read screens, or when the provider is slow or unreliable, rather than for this check.
4. It commits to one approach for this check; it does not recommend doing both at once without choosing.

---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It does not have checkout import catalog's domain or infrastructure (repository, aggregate), and says why not.
2. It offers at least one of these mechanisms: a port declared by checkout itself, implemented by an adapter that calls a public catalog use case or API; or checkout keeping its own copy/projection fed by catalog's domain events.
3. It says the order stores (copies) the name and price at the moment the order is placed, rather than reading them from catalog later.

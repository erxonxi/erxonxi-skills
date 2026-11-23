---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It recommends Object Mothers (classes or functions named like ProductMother that create domain objects), not only generic factories or fixtures files.
2. It says the default values are random/valid (for example from a faker or random-primitive mothers), with named variants or overrides for the case a test cares about.

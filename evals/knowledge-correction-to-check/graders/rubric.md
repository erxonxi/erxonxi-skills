---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It says a sentence in AGENTS.md is not the main fix; the convention should become an automatic check.
2. It picks the cheapest mechanism that can enforce it, a lint rule (built-in or restricted-syntax configuration) before a custom plugin or tool.
3. It mentions at least one of: handling existing violations with an exemption list or limited scope so the check can turn on now, proving the check fails on a violating example and passes after, or recording the convention in a short document that points to the check.

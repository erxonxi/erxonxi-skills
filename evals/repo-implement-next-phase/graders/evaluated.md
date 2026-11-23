---
type: llm
---
The plan has two phases; only phase 1 should be implemented in this run. After verifying, the phase should be evaluated: the code compared against the plan's contracts (names, signatures, event, test case names) and reviewed by a second reading separate from writing it (a reviewer subagent, or an explicit separate review pass with its findings).

Pass only if this holds for the final answer: it reports that evaluation with its result: which contracts were checked against the code and what the review found (or that it found nothing). Saying the evaluation or review was skipped or not run does NOT pass.

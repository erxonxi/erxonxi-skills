---
type: llm
focus: trace
---
The plan in `.agents/plans/2026-11-20-restock-alerts.md` ends each phase with a task whose text starts with "Review and stop". Judge the whole run.

Pass only if this holds: the run never marks that "Review and stop" task of phase 1 as done (`- [x]`) unless the trace also shows that a review of the phase really happened before: a reviewer subagent that returned, or an explicit separate review pass whose findings the run reports. If the run leaves the task unchecked, or checks it after a real review, it passes. Fails if the task is checked and no review happened.

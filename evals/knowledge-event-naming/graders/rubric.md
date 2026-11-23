---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It says an event like UserUpdated carrying the whole state is not a good domain event, and changes it.
2. It proposes an event named after the business fact in past tense, specifically UserArchived (or an equally specific name), not UserStatusUpdated or UserStatusChanged as the final recommendation.
3. It recommends one event per meaningful change carrying only the relevant data.

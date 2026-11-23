---
name: knowledge-event-naming
tags: [knowledge, domain-modeling]
runs: 2
max_turns: 6
timeout_seconds: 240
---
When a user's status goes from `active` to `archived`, our code emits `UserUpdated` with the whole user state. Is that a good domain event? What would you name it? Answer in at most eight lines, no code unless a one-line signature helps.

---
name: knowledge-event-naming
tags: [knowledge, domain-modeling]
runs: 2
max_turns: 6
timeout_seconds: 240
---
When a user's status goes from `active` to `archived`, our code emits an event `UserUpdated` with the whole user state. What would you change in how we emit events here, if anything? Answer in at most eight lines, no code unless a one-line signature helps.

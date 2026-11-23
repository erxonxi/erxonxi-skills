---
name: knowledge-event-publishing
tags: [knowledge, domain-modeling]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Our `Order` aggregate should emit an `OrderPlaced` domain event. Should the aggregate method call `eventBus.publish(...)` directly when the order is placed? Answer in at most eight lines, no code unless a one-line signature helps.

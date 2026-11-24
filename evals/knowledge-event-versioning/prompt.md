---
name: knowledge-event-versioning
tags: [knowledge, domain-modeling, goal-2, harm]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Design question, no code to read. Our `acme.shop.order.placed` event carries `total` as a number. The shipping service, a separate deployable, subscribes to it, and the events are also stored in an event log that we replay. We now want `total` to become `amount` plus a required `currency`. How do we make that change? Eight lines, no code.

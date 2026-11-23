---
name: knowledge-port-vs-projection
tags: [knowledge, architecture, goal-1]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Modular monolith. Checkout must reject an order when the customer is over their credit limit. The limit belongs to the billing context, which already publishes events when it changes. Should checkout keep its own copy of the limits from those events, or ask billing? Eight lines, no code.

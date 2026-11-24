---
name: knowledge-long-process-returns
tags: [knowledge, architecture, goal-1]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Design question, no code to read. Modular monolith with an in-memory event bus. Returns cross several contexts: the shopper requests a return (orders), support approves or rejects it, a shipping label is emailed (shipping), the warehouse receives the parcel, billing refunds, and stock goes back to the catalog. A return not received within 30 days must be cancelled, and a refund that fails must leave the return in a state support can act on. How do we coordinate this process? Eight lines, no code.

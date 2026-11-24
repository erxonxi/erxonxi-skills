---
name: knowledge-concurrency-last-unit
tags: [knowledge, infrastructure, goal-1, goal-2]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Design question, no code to read. Hexagonal backend on Postgres. The `ProductPurchaser` use case loads the `Product` aggregate, calls `product.purchase(quantity)` (which throws when there is not enough stock), and saves it. Two shoppers bought the last unit at the same moment and stock went to -1. How do we fix it, and where does each part live? Eight lines, no code.

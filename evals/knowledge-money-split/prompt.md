---
name: knowledge-money-split
tags: [knowledge, domain-modeling, goal-2, harm]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Design question, no code to read. Our shop stores prices as JavaScript numbers like `19.99` and computes line totals with `quantity * unitPrice` and `toFixed(2)`. Partial refunds are spread across the order lines in proportion to their totals, and last week a refund of 10.00 split over three equal lines paid out 9.99. How should we model money so this cannot happen? Eight lines, no code.

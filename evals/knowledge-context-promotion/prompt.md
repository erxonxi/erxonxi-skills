---
name: knowledge-context-promotion
tags: [knowledge, architecture, goal-1]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Design question, no code to read. Our modular monolith has a `shop` context with modules `products`, `carts`, `orders` and `pricing`. `pricing` has grown to 45 files, the biggest module by far. A teammate wants to promote it to its own bounded context next to `shop`. Should we, and how do we decide? Eight lines, no code.

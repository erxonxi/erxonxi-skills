---
name: knowledge-cross-context
tags: [knowledge, architecture]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Our modular monolith has `catalog` and `checkout` modules. When a customer places an order, checkout needs the product's current name and price. How should checkout get them? Answer in at most eight lines, no code unless a one-line signature helps.

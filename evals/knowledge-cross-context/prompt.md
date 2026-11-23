---
name: knowledge-cross-context
tags: [knowledge, architecture]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Our modular monolith has `catalog` and `checkout` bounded contexts. Checkout needs the product's current name and price when a customer places an order. Can the checkout code just import catalog's `ProductRepository` and read the product? Answer in at most eight lines, no code unless a one-line signature helps.

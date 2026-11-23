---
name: knowledge-put-existing-id
tags: [knowledge, architecture, goal-2]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Clients generate the ids: `PUT /products/{id}` creates a product. A PUT arrives with an id that already exists and a different name. What should the server do, and why? Answer in at most eight lines, no code.

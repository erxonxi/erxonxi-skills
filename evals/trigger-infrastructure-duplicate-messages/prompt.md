---
name: trigger-infrastructure-duplicate-messages
tags: [trigger, skill-infrastructure]
runs: 2
max_turns: 3
timeout_seconds: 120
---
Our consumer of OrderPlaced messages sometimes processes the same message twice and sends two emails. How do we make it safe?

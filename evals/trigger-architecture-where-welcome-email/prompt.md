---
name: trigger-architecture-where-welcome-email
tags: [trigger, skill-architecture]
runs: 2
max_turns: 3
timeout_seconds: 120
---
Our backend has the contexts `shop` and `notifications`, each with `domain`, `application` and `infrastructure` folders. Where should the code that sends a welcome email after a user registers live, and how does it get triggered?

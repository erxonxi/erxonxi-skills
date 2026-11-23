---
name: knowledge-unique-email-race
tags: [knowledge, domain-modeling, goal-2]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Design question, no code to read: we are building user registration, where `PUT /users/{id}` creates a user and emails must be unique. Where should that rule live, and what happens when two requests with the same email arrive at the same time? Eight lines, no code.

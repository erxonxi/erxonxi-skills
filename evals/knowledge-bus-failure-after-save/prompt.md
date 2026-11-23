---
name: knowledge-bus-failure-after-save
tags: [knowledge, infrastructure, goal-1]
runs: 2
max_turns: 6
timeout_seconds: 240
---
Our monolith uses a synchronous in-memory event bus. `DealWinner` saves the deal and then publishes `DealWon`. Yesterday the subscriber that emails the owner threw, and the API returned 500 although the deal was already saved as won. What do we change? Eight lines, no code.

---
name: plan-restock-decided
tags: [procedure, plan, goal-5, goal-6]
runs: 2
max_turns: 12
timeout_seconds: 420
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit]
---
Plan this feature for our TypeScript backend before anyone writes code. The repository is not available to you right now, so rely on what I describe.

Codebase: hexagonal + DDD. `src/contexts/catalog/products/` (Product aggregate with a `stock` field, `ProductStockChanged` domain event already published when stock changes) and `src/contexts/notifications/` (an `EmailSender` port with a working SMTP adapter). In-memory event bus. Tests run with `npm test`; `npm run check` runs lint and tests.

Feature: restock alerts. A shopper asks for an alert on an out-of-stock product by giving their email; when the product's stock goes from 0 to more than 0, each requester gets exactly one email and the alert is consumed.

Decisions already made, do not ask about them: alerts live in a new `restock-alerts` module inside `catalog`; the email is sent from `notifications` reacting to an event; no UI in this task, only the HTTP endpoint `PUT /restock-alerts/:id`; no double opt-in.

Show me the plan.

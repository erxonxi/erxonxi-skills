---
name: plan-spike-unknown
tags: [procedure, plan, goal-5, goal-6]
runs: 2
max_turns: 12
timeout_seconds: 420
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit]
---
Plan this feature before anyone writes code. The repository is not available to you right now, so rely on what I describe.

Codebase: hexagonal TypeScript backend. `src/contexts/billing/payments/` has a `PaymentRefunder` use case that refunds a whole payment through the `PaymentGateway` port, with an adapter for our provider, Paylane. `npm run check` runs lint and tests.

Feature: support can refund part of an order (some lines, or an amount). Nobody on the team knows whether Paylane can refund part of a captured payment, or several times on the same payment, or only once in full; their docs contradict each other and there is a sandbox account. That answer decides what the refund contract looks like.

Decided, do not ask about it: refunds stay in `billing`, no UI in this task, only the HTTP endpoint.

Show me the plan.

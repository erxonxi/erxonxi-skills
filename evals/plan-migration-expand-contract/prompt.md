---
name: plan-migration-expand-contract
tags: [procedure, plan, goal-5, goal-6]
runs: 2
max_turns: 12
timeout_seconds: 420
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit]
---
Plan this change before anyone writes code. The repository is not available to you right now, so rely on what I describe.

`orders.customer_name` (free text) must become `orders.customer_id`, a foreign key to `customers`. Production has four million orders, there can be no downtime, and two deployables write to that table: the shop API and the back-office app, released independently. Every existing name matches exactly one customer.

Decided, do not ask about it: Postgres, no new tooling, no maintenance window, plain SQL migration files as the project already uses.

Show me the plan; do not write code.

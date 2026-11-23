---
name: erxonxi-plan
description: "Research a non-trivial task with cheap subagents and turn it into an approved plan: decisions, vertical phases with public contracts, waves for parallel work, saved with its state so any agent can resume it. Use when the user asks for a plan, or before a change that spans several files, layers or sessions."
---

# Plan

The human decides, so the human gets something small and sharp to decide on: the decisions, the phases and the public contracts, before any code exists. Everything else is delegated. The plan is saved with its state, so the next session, another agent or another person can pick it up without this conversation.

What to build and in what order across several bets is `erxonxi-roadmap`. This skill plans one task. Implementing it is `erxonxi-implement-phase`.

## Rule zero

The project's convention wins: where plans already live, their shape and language. Look for existing plans before creating one, and copy their shape.

## When not to plan

A change confined to one file, or one obvious edit, needs no plan: say so in one line and do it. Plan when the change spans several files or layers, needs a decision the user has not made, or will not fit in one session.

## Steps

### 1. Pin the task

Done when you can state the goal in one to three sentences and what is out of scope. If the user did not say what the task is, ask. If the goal is a bet whose value is unproven ("will users want this?"), frame it with `erxonxi-roadmap` first.

### 2. Research by delegating

Keep the main agent for reasoning and deciding. Delegate reading the code:

- Launch explorer subagents on a cheaper, faster model than yours. Reuse one that already holds the context if the agent allows it.
- As many as there are independent areas, at most four: one for a small, local change, one per context, layer or repository for a wide one. All in a single batch, in parallel.
- Give each a narrow brief: the area, the questions, and the format of the answer. Ask for facts with paths: the use cases, entities, ports, adapters and tests involved, the conventions they follow, the files that best show the pattern to copy, and anything that contradicts the docs. Not file dumps.
- Against anchoring, brief some explorers blind: name the area and what to describe, but not the task or the solution you have in mind.
- Synthesize the reports yourself. Read directly only the files needed to confirm a contract or a convention, and always cross-check an implementation against its tests: anomalies surface there.
- Read only the docs the `AGENTS.md` map points to for this task.

Without subagents, do the same research yourself, in the same order and with the same discipline: paths and facts, not whole files.

Done when you know which files the change touches, which existing feature to copy, and which conventions apply.

### 3. Ask once

Put every open question in a single message, each with the option you recommend and why in one line. Use the agent's question tool if it has one. Include the granularity, with what each option would put in each phase:

- minimal: one phase,
- intermediate: one to three,
- granular: more than three.

Done when nothing that changes a contract or a phase is still open.

### 4. Propose decisions, phases and contracts

Present them in the conversation, not in a file yet. Rules for phases and contracts: below. Iterate until the user accepts.

Done when the user has accepted the contracts and the phases explicitly.

### 5. Save the plan

Only after approval. Where:

- Default: a file at `.agents/plans/<YYYY-MM-DD>-<slug>.md`, with the shape of `resources/plan-template.md`.
- If the team tracks work in issues: a parent issue for the plan and one child issue per phase. See `resources/plan-in-issues.md`.

Everything in the plan in the project's working language, one language for everything the agent reads.

### 6. Offer the next step

Ask what to do next and stop:

- nothing more for now,
- commit the plan alone (type `docs`),
- implement phase 1 with `erxonxi-implement-phase`,
- commit the plan, then implement phase 1.

Never more than phase 1 from here, even if the user says "implement it". Each phase is its own run.

## Shape of the plan

```
Goal        1 to 3 sentences
Context     files to copy from and convention docs that apply, as links
Decisions   one line per decision or assumption not requested, with the discarded alternative. Last line: out of scope
Phases      vertical slices, each with contracts, tasks and "done when"
Next step   one sentence: which phase comes next
```

### Phases

- **Vertical slice.** Each phase delivers something that stands on its own, even if the rest is never built. Bad: the controller in phase 1 and the use case it calls in phase 2. Good: the whole happy path in phase 1 (interface, logic, persistence and their tests), edge cases and validation after.
- **Early feedback.** Phase 1 produces something the user can see, use or run, even if rough.
- **Always green.** Each phase can be committed and pushed without breaking the build.
- **One responsibility.** Adding dependencies or tooling is not in the same phase as the first use case.
- **Copy the neighbor.** Each task names the existing code to imitate: "copying `RestockAlertRequester`".
- **Few tests.** Prove each behavior with as few tests as possible, at the lowest level.
- **Done when.** Each phase ends with observable checks: a command and its result, a screen and what it shows, a request and its response.
- **Fixed ending.** Each phase ends with these two tasks, in order:
  1. Run the project's verification command (it is in `AGENTS.md`) and fix what fails.
  2. Evaluate and stop: run `erxonxi-evaluate` (contracts, independent review, evidence), propose commit messages and wait. Do not start the next phase.

### Public contracts

Per phase, only the types that change. Omit a type that does not change:

- use cases and their signatures, without constructor dependencies,
- domain events and their attributes,
- test suites with every case, written as behavior sentences,
- database schema,
- texts the user sees: the copy is a contract.

If the user brings no contracts, propose them from the research. They are what the user reviews: the what before the how.

### Waves

When two phases do not depend on each other, say so, so they can be delegated in parallel:

- A phase lists `Depends on: <phase>` only for hard dependencies. Try to remove each one first with a contract agreed up front.
- Phases that touch disjoint files and share only an agreed contract go in the same wave.
- Two phases that touch the same files are never in the same wave.

## What is not done

- Writing the plan file before the user accepted phases and contracts.
- Horizontal phases ("backend", "frontend", "tests"), or a final phase for tests, docs or cleanup.
- Contract types that do not change, listed just to fill the template.
- Exploring the whole repository "to be safe", or reading every doc.
- Estimates in hours or points.

## Checklist

- [ ] Did I delegate the exploration, and read directly only what confirms a contract?
- [ ] Did I ask everything in one round, with a recommendation each?
- [ ] Is every phase a vertical slice that stands alone, with phase 1 visible?
- [ ] Does every phase list only the contracts that change, and end in verification, evaluation and a stop?
- [ ] Are independent phases marked as a wave, and dependent ones as such?
- [ ] Did the user accept before I saved the plan?

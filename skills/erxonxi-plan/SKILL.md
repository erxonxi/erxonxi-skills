---
name: erxonxi-plan
description: "Turn a non-trivial task into an approved plan in vertical phases with public contracts, saved with its state so any agent can resume it, or say that it needs none. Use when the user asks for a plan, or before a change that spans several files, layers or sessions."
---

# Plan

The human decides, so the human gets something small and sharp to decide on: the decisions, the phases and the public contracts, before any code exists. Everything else is delegated. The plan is saved with its state, so the next session, another agent or another person can pick it up without this conversation.

What to build and in what order across several bets is `erxonxi-roadmap`. This skill plans one task. Implementing it is `erxonxi-implement-phase`.

## Rule zero

The project's convention wins: where plans already live, their shape and language. Look for existing plans before creating one, and copy their shape.

## When not to plan

A fix with its test, a rename, or any change whose shape is obvious needs no plan: say so in one line and do it. Plan when at least one holds: the change adds or alters a public contract (a use case, an event, a schema, an endpoint, user-facing copy), it crosses more than one layer or context, it needs a decision the user has not made, or it will not fit in one session.

## Steps

### 1. Pin the task

Done when you can state the goal in one to three sentences and what is out of scope. If the user did not say what the task is, ask. If the goal is a bet whose value is unproven ("will users want this?"), frame it with `erxonxi-roadmap` first.

### 2. Research by delegating

Keep the main agent for reasoning and deciding. Delegate reading the code:

- Explorers run on a lighter model than the main agent. If one from earlier in the session already knows the area, send it the new questions instead of starting another.
- One explorer per independent area (a context, a layer, a repository), four at the most, a single one for a local change. Start them together so the research takes the time of the slowest, not the sum.
- Each brief names the area, the questions and the shape of the answer: paths and facts about the use cases, entities, ports, adapters and tests involved, the conventions they follow, the best file to imitate, and anything that contradicts the docs. Never whole files.
- Optionally, against anchoring, keep the task out of one explorer's brief: ask it only to describe the area.
- The main agent merges the reports and decides. It opens a file itself only to settle a contract or a convention, and it compares each implementation with its tests, because that is where surprises hide.
- Read only the docs the `AGENTS.md` map points to for this task.

Without subagents, do the same research yourself, in the same order and with the same discipline: paths and facts, not whole files.

Before stating that something does not exist, search for it by name: a truncated listing is not evidence.

Done when you know which files the change touches, which existing feature to copy, and which conventions apply.

### 3. Ask once

Put the open questions in a single message, each with the option you recommend and why in one line. Use the agent's question tool if it has one. At most five. Ask only what changes a contract or a phase and cannot be read from the code or the docs, and nothing the user already decided. Never ask about the plan itself (its language, where it is saved, how fine the phases are): decide that from the project and say what you chose.

Done when nothing that changes a contract or a phase is still open.

### 4. Propose decisions, phases and contracts

Present them in the conversation, not in a file yet. Rules for phases and contracts: below. Choose the granularity yourself; show two cuts only when both are reasonable and they change what the user reviews. Iterate until the user accepts.

Done when the user has accepted the contracts and the phases explicitly.

### 5. Save the plan

Only after approval, and as it was approved. Something you would add now (an assumption, a wave or a `Blocked by` the approved plan did not have, an out-of-scope line) is a change to the plan: propose it before saving, or save the approved version and list the suggestion after it. Where:

- Default: a file at `.agents/plans/<YYYY-MM-DD>-<slug>.md`, with the shape of `resources/plan-template.md`.
- If the team tracks work in issues: a parent issue for the plan and one child issue per phase. See `resources/plan-in-issues.md`.

Everything in the plan in the project's working language, one language for everything the agent reads.

### 6. Offer the next step

Say where the plan was saved and recommend one next step, normally starting phase 1 with `erxonxi-implement-phase`. Mention in one line that the plan can be committed on its own first (a `docs` commit). Then stop and wait for the user.

Whatever the wording of the answer, this run goes no further than phase 1. Each phase is a run of its own.

## Shape of the plan

```
Goal        1 to 3 sentences
Context     files to copy from and convention docs that apply, as links
Decisions   one line per decision or assumption not requested, with the discarded alternative.
            Then the risks that change a phase or a contract (abuse, privacy, money, data loss,
            concurrency), each with where it is handled: a phase, accepted, or out of scope.
            Last line: out of scope
Phases      vertical slices, each with contracts, tasks and "done when"
Next step   one sentence: which phase comes next
```

### Phases

- **Vertical slice.** Each phase delivers something that holds up by itself, even if no later phase is ever built. Bad: the controller in phase 1 and the use case it calls in phase 2. Good: the whole happy path in phase 1 (interface, logic, persistence and their tests), edge cases and validation after.
- **Early feedback.** Phase 1 produces something the user can see, use or run, even if rough. When nothing visible changes (a migration, a refactor, a provider swap), that something is a check the user can run that was absent or red before.
- **Always green.** After any phase, the main branch could take it as it is: build, checks and tests pass.
- **One responsibility.** New dependencies or tooling get a phase of their own, before the first use case that needs them.
- **Copy the neighbor.** Each task names the existing code to imitate: "copying `RestockAlertRequester`".
- **Few tests.** Prove each behavior with as few tests as possible, at the lowest level.
- **Done when.** Each phase ends with observable checks: a command and its result, a screen and what it shows, a request and its response.
- **Fixed ending.** Each phase ends with these two tasks, in order. `erxonxi-implement-phase` runs them as its own closing steps, so they are the last thing done in the phase:
  1. Run the project's verification command (it is in `AGENTS.md`) and fix what fails.
  2. Evaluate and stop: `erxonxi-evaluate` (contracts, independent review, evidence), then commit proposals and a stop. The next phase waits for the user.

### Public contracts

What the user approves instead of code. Per phase, list only the kinds that change:

- use case signatures (inputs and outputs, not what is injected),
- events by message name, with the attributes they add to `aggregateId`, `eventId` and `occurredOn`,
- every test case, as a behavior sentence, grouped by suite. Every business rule in the user's request is one of them or is listed as out of scope,
- schema changes,
- every text a user will read, because wording is a promise too.

If the user brings no contracts, propose them from the research. They are what the user reviews: the what before the how.

### Waves

When two phases do not depend on each other, say so, so they can be delegated in parallel:

- A phase lists `Blocked by: <phase>` only for hard dependencies. Try to remove each one first with a contract agreed up front.
- Phases that touch disjoint files and share only an agreed contract go in the same wave.
- Two phases that touch the same files are never in the same wave.
- Number the phases in the order they will be delivered. A wave is a note on each phase, never a reason to list phases out of order.

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

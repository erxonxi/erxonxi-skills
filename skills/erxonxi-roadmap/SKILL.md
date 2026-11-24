---
name: erxonxi-roadmap
description: "Load before splitting an epic or a backlog into tickets, ordering or ranking work, answering how long something will take or when it will be done, and deciding after a release. Covers bets, the MVP cut, vertical slices, waves and forecasts without estimates. Its answers often differ from common practice."
---

# Roadmap

YAGNI and KISS applied to the plan, not only to the code. This skill decides what to build, how small and in what order. How one slice is then researched and planned is `erxonxi-plan`, and how each phase is implemented is `erxonxi-implement-phase`.

## Rule zero

The team's tool and habits win: Linear, Jira, Notion, GitHub Issues or a markdown file, with the states, labels and templates already in use. Before writing anything, read a few recent tickets and copy their shape. If they cannot be read, say so and use the minimum ticket of step 3. This skill never adds a field, a state, a label or a meeting. It decides only when the team has no precedent.

## Stance

- **The plan is a hypothesis.** Working software in the hands of users is the only measure of progress. The plan is replaced as soon as the facts contradict it.
- **Maximize the work not done.** Every item names the outcome it serves. An item that cannot is deleted, not parked.
- **Outcome over output.** A bet is a behavior change with a number, not a list of features.
- **Small batches.** The smaller the piece, the sooner the feedback and the cheaper the mistake.
- **Finish before starting.** Work in progress is inventory. An old item in progress outranks any new one.
- **Fixed time, variable scope.** A bet gets a time budget (its appetite) before it is designed. When time runs out, scope is cut, not quality.
- **Decide late what is reversible, early and carefully what is not.** Deferring means waiting for a named fact. It does not mean avoiding the decision.
- **Detail follows proximity.** What is next is sliced. What is later is one line.
- **Nothing is done until it is measured.** Shipping without a signal is guessing twice.
- **Process is earned.** A ritual, a field or a document is added only after its absence has hurt, and removed when it stops paying.

## The loop

`frame → cut → slice → map → order → ship → decide`, and again. One pass takes days or a few weeks, never a quarter.

### 1. Frame the bet

First ask whether not building it is an option. If it is not (a law, a contract, a security fix), skip the frame and go to "Work that is not a bet". When the user asked how to break something down or how long it takes, the frame is one line, not a block.

```
Outcome     who does what differently, in one sentence
Hypothesis  We believe <change> for <who> will result in <outcome>.
            We will know when <signal> reaches <threshold> within <window>.
Decision    what happens if it does not: remove, adjust or stop
Appetite    what the outcome is worth to whoever pays, in days or weeks, set before designing.
            Ask for it; never add up the slices to get it
Non-goals   what is out, explicitly
Riskiest    the assumption that, if false, makes the rest worthless
```

- Write the threshold and the decision before building. Afterwards any number looks like a success.
- The signal is concrete and already measurable, or measuring it is part of the first slice.
- If the baseline is unknown, measuring it is the first task, before any slice. Until then the threshold is written as a change over the baseline, never as an invented number.
- If the riskiest assumption can be tested without building, test it first: a fake door (the button exists, the feature does not, count the clicks), a concierge (do it by hand for five users), a prototype, or a query on data that already exists.
- Tasks that deliver no behavior (a baseline query, a decision to get, a manual procedure) are a checklist inside the bet, not tickets.

Done when: someone outside the team can tell what success looks like and what would make us stop.

### 2. Cut the MVP

- The MVP is the smallest thing that tests the riskiest assumption with real users. Earliest testable first, then usable, then lovable.
- Selection rule: **one user, one job, one path, end to end, deployed and measured.**
- Narrow, not shoddy. Cut features, rules, data variations, platforms, settings and automation (do it by hand behind the scenes). Do not cut tests, security or the signal.
- If the project has no path to production yet, the first slice is a walking skeleton: the thinnest end-to-end piece through every layer, the pipeline that deploys it and one metric.
- Whatever did not make the cut is one line in Later. It is not sliced, estimated or ticketed.
- In a breakdown, the cut is the first thing the reader sees: what is in, what is done by hand behind the scenes, and what is Later. A breakdown that slices the whole scope skipped this step.

Done when: the MVP fits the appetite with room to spare, and removing any part of it would make the hypothesis untestable.

### 3. Slice

- **Vertical slices.** Each ticket delivers behavior someone can observe, through every layer it needs, and could ship alone. Bad: "Restock alerts API", "Restock alerts UI", "Restock alerts tests". Good: "A shopper asks for an alert on an out-of-stock product".
- **Right-size instead of estimating.** A slice is the right size when one person or one agent session can finish it and a human can read its diff in one sitting. That bound is a filter, never a number written on a slice: no days per slice, per role or per person. If it does not fit, split it. If the only way to split it is horizontally, keep it whole and say so. No points, no hours.
- A slice that needs backend, frontend and QA is still one slice with one owner, and the others work on it with them. Never a ticket, a column or a wave per role.
- When the first cut is not obvious, split by workflow step, happy path before edge cases, the most common rule, one data variation, one interface, create and read before the rest, or the costly option first. The table with each one is in `resources/techniques.md`.
- Stop splitting when a piece no longer delivers anything observable on its own, or when coordinating the pieces costs more than building them.
- A purely technical ticket is the exception: allowed when it unblocks two or more slices or removes a named risk, and it says which. Otherwise the enabling work travels inside the first slice that needs it.
- Work that takes under an hour is done, not ticketed.

The minimum a ticket carries, in any tool:

```
Title       the outcome, as a behavior sentence
Why         the bet it belongs to (a link or one line)
Done when   2 to 5 observable checks with concrete values
Signal      the event, log or metric that shows it working in production
Blocked by  hard dependencies only
Out         what this slice deliberately leaves for later
```

Done when: every slice could be demoed on its own and none is "part 1 of".

### 4. Map dependencies

- Kinds: **code** (a shared contract or schema), **data** (a migration or a backfill), **knowledge** (someone must decide or learn something), **external** (another team, a vendor, an approval).
- **Hard** means the slice cannot be built or verified without the other. **Soft** means it would be nicer afterwards. Only hard dependencies are recorded, with the tool's native "blocked by" relation, or a `Blocked by:` line where there is none.
- Sharing files is not a dependency. It is an ordering constraint, solved by putting the two slices in different waves.
- Draw the graph only when more than about eight slices have crossing links. Until then the list is enough.
- A dependency is a cost. Before accepting one, try to remove it: agree the contract first and build both sides against it, hide unfinished work behind a flag, expand, migrate and contract a breaking change, grow a replacement beside the old code behind one seam, sequence slices that share files, ask today and build behind a port with the assumed answer, or settle an unknown with a timeboxed spike. How each one works: `resources/techniques.md`.
- Calendar time is set by the longest chain of hard dependencies, not by the number of slices. Shorten the chain first.

Done when: every "blocked by" is hard, and none could be removed with a contract, a flag or a reorder.

### 5. Order and parallelize

Group the slices in waves. A slice goes in the first wave where all its hard blockers are already done. Everything inside a wave can run at the same time.

```
Wave 0   A          the first user step, end to end, on the agreed contract
Wave 1   B   C      in parallel: both blocked only by A, disjoint files
Wave 2   D          blocked by B
```

Order, most important first:

1. What unblocks the most, starting with the longest chain.
2. What tests the riskiest assumption. Fail early and cheap.
3. What costs the most to delay for its size: a real deadline, lost revenue, a growing risk.
4. The rest is not ranked. It waits in Next.

Rules for parallel work:

- Two slices run in parallel only if they touch disjoint files or modules, their shared contract is agreed, and each can be verified alone. Otherwise they are sequenced.
- The limit on work in progress is review capacity, not the number of hands. Review and integration are the serial part, and they cap the speed-up.
- Merge small and often into a single trunk. At the end of each wave, integrate, look at what was learned and re-plan the next wave.
- Adding people or agents to a late chain does not shorten it.
- With coding agents: one slice per agent, in an isolated branch or worktree, with the files it owns, the contract verbatim and the "done when" checks in its brief. Never two agents on the same files, and never more agents than a human can review the same day.

Done when: wave 0 is small, every slice in the current wave has an owner, and the work in progress fits the review capacity.

### 6. Ship and instrument

- Done means in production, or as close as the project allows, with its signal visible. Merged is not done.
- Instrumentation is part of the slice, never a follow-up ticket:
  - one event per step of the core path, plus the success event,
  - errors and latency of the new path,
  - the flag state or the cohort, to compare with and without,
  - one place where someone will look: a dashboard or a saved query, linked from the ticket.
- Name one guardrail: a metric that must not get worse (error rate, latency, conversion of the existing flow).
- Release separately from deploy: a flag, a gradual rollout, and a rollback path known before the release.

Done when: the day after shipping, anyone can answer "does it work?" and "is it used?".

### 7. Measure and decide

- When the window of the hypothesis closes, read the signal and apply the decision written in step 1: **double down, adjust or remove.** Removing what did not move the number is a good outcome: delete the code and the flag.
- With little traffic, do not fake an A/B test. Compare before and after, compare cohorts, and talk to five users.
- Re-cut the roadmap from what was learned, not from what was planned.
- Watch the flow to learn, never as a target. A measure that becomes a target stops measuring.
  - **Cycle time** per slice. If it grows, the slices are too big or too much is in progress.
  - **Work item age.** The item that has been in progress longer than usual gets attention before anything new starts.
  - **Throughput**: slices finished per week. It is also the forecast: "at 4 to 6 slices a week, the 12 left take 2 to 3 weeks". A range from history, not a date from estimates.
  - **Delivery health**: lead time from commit to production, deployment frequency, change fail rate, recovery time.
- **No history yet**: do not invent one. Answer with when the first usable slice lands, how many slices are in Now, and when you will forecast again: after the first three slices, from their real cycle time. If pressed for a figure, give the number of slices times the right-size bound, and call it a bound, not a forecast.

Done when: the decision is written next to the bet, and the roadmap reflects it.

## The roadmap

One page, three horizons, no dates:

| Horizon | Contains | Detail |
|---|---|---|
| **Now** | The bets in progress: one to three, never more than the people who can own one | Framed, sliced, ordered in waves |
| **Next** | What would start if Now finished today | Outcome and appetite. Not sliced |
| **Later** | Options with a plausible outcome and no evidence yet | One line each, with the fact that would bring it forward. No tickets, no order |

- A date appears only when it is real and external (a contract, a regulation, an event), and it is marked as such.
- Triage of an existing backlog: every item gets one verdict, argued in a line. Now, Next, Later, or deleted when nobody can name its outcome. Estimates that come with the backlog are not carried over: a big number only says the item must be sliced.
- Choosing what moves into Now:
  1. Does it serve the current goal? If not, it stays in Later or is deleted.
  2. What is lost each week without it (money, users, a growing risk, work it blocks), against its appetite? A big loss with a small appetite goes first.
  3. Between similar bets, first the one that teaches the most or keeps the most options open.
  4. Argue the top three in one sentence each. If the order cannot be argued in a sentence, a scoring formula will not fix it.
- Later is not a backlog. Prune it every time it is touched. What nobody has defended in three reviews is deleted: if it matters, it comes back.
- It lives where the team already looks, with a single source of truth, using whatever the tool already calls a bet, a slice, a dependency, a wave and a horizon (a wave is the order of the list or a label, never a new workflow state). The mapping: `resources/techniques.md`.
- Propose the slices and their order in the conversation first. Create or edit tickets only after the human accepts, and look for duplicates before creating.
- When the user asks for everything in tickets, slice Now, give Next and Later as lines, and say why in two sentences: detail decays, and the first data will change most of it. If they still want all of it sliced, it is their call.

## Work that is not a bet

Not everything is a hypothesis. Do not force the frame on it.

| Kind | How it is treated |
|---|---|
| A defect that hurts users or their data | Fixed now, ahead of any bet. It is a slice with its checks and its signal, not a priority to argue. |
| An obligation (a law, a contract, a security fix) | No hypothesis. The date is fixed, so scope varies: the smallest version that complies, a fallback in case it does not arrive, and a checkpoint early enough to cut scope. Its longest chain starts first. |
| Technical work (a rewrite, a migration, an upgrade) | It names the measured problem and the number that will show it solved. Without them it is deleted, like any item without an outcome. |

## Example

A bet framed, cut and ordered in waves, end to end: `resources/example.md`. Read it when the shape of a bet or a wave is not clear.

## What is not done

- Story points, hours, velocity targets, and dates derived from estimates.
- Scoring spreadsheets (RICE, ICE, WSJF) fed with invented numbers. Numbers are used only when they are real.
- A backlog as inventory: refining, ordering or estimating what nobody will start this month.
- Horizontal tickets ("backend", "frontend", "tests") and phase tickets ("design", "implementation", "QA").
- A "skeleton", "setup" or "test baseline" ticket per role, and a last wave for QA, hardening or an end-to-end pass.
- "MVP" as a low-quality first version, and "phase 2" as the place where tests, observability and cleanup go.
- "Investigate X" tickets without a timebox and a decision as output.
- Meetings without a decision as output, states nobody filters by, templates with empty sections.
- Starting new work while old work waits for review. Parallelizing work that shares files.
- Building today for a requirement that only exists in Later.
- Imposing any of this on a team. The people who do the work choose their process.

## Checklist

- [ ] Does the bet state an outcome, a threshold, a window and what happens if it is missed?
- [ ] Was the riskiest assumption tested in the cheapest way before building?
- [ ] Is the MVP one user, one job, one path, end to end, and does it fit the appetite?
- [ ] Is every ticket a vertical slice one person can finish and a human can review in one sitting, with observable checks and a signal, and no days written on it?
- [ ] Are only hard dependencies recorded, and did I try to remove each one with a contract, a flag or a reorder?
- [ ] Does the breakdown open with the cut, and is wave 0 a user step end to end?
- [ ] Are the slices in waves, with parallel slices on disjoint files?
- [ ] Does the work in progress fit the review capacity?
- [ ] Can someone tell tomorrow whether it works and whether it is used?
- [ ] Did I add no field, state, label or meeting the team did not already have?
- [ ] Is Later shorter than last time?

Where these rules come from (the Agile Manifesto and what became of it, lean from Toyota to flow metrics) and the sources: `resources/lineage.md`. Read it only to explain or to adapt a rule.

---
name: erxonxi-implement-phase
description: "Implement exactly one phase of an approved plan, yourself or by delegating it to a subagent with a precise brief, then verify, update the plan's state and stop for review. Never commits, pushes or merges on its own. Use when the user asks to implement, continue or resume a plan or one of its phases."
---

# Implement a phase

One phase per run, then stop. The plan already holds the decisions, so this run only executes and reports. It never decides a contract on its own: if the plan does not hold, it stops and asks.

## Rule zero

The plan and the project's conventions win over this skill. When the plan says to copy a file, its shape wins over any default from the other skills.

## Steps

### 1. Find the phase

- Ask for the plan if the user did not name it. Look in `.agents/plans/` or the tracker the plan uses.
- The current phase is the first one with an unchecked task, or the first open child issue when the plan lives in issues (`erxonxi-plan`, `resources/plan-in-issues.md`).
- If the user names a phase, check that the phases it depends on are done. If not, say so and stop.
- If every phase is done, say so and stop. Do not re-implement.

Done when you can name the phase, its contracts, its tasks and its "done when".

### 2. Load only what the phase needs

Read the phase, the files it says to copy and the convention docs listed in the plan's Context. Nothing else at the start. Check the working tree: if it holds unrelated changes, say so before touching anything.

### 3. Decide who implements

- **Yourself**, by default, when the phase is small or you already hold its context.
- **A subagent** when the phase is self-contained and its brief fits on one screen: it keeps the main context clean for evaluating. Use a model suited to writing code. Write the brief with `resources/worker-brief.md`.
- **Several subagents in parallel** only for phases in the same wave of the plan, each in its own branch or worktree, each owning disjoint files, and never more than the user can review the same day.

When you delegate, you still own the result: its report is a claim that steps 5 and 6 check.

### 4. Implement

- Do the tasks in order and check each one in the plan as it is done.
- Minimal, focused changes. Copy the pattern of the neighboring feature.
- Keep the contracts exactly as approved: names, signatures, event attributes, test case names, copy.
- Refactors and behavior changes go in separate commits, so propose them separately.
- Update the docs the phase affects (data model, HTTP contract, screens) in the same phase.

**Stop and ask** when:

- a task is unclear,
- a contract cannot hold as written, or the implementation reveals a design problem,
- the work needs something beyond the plan or the spec,
- a check fails and the only way to pass it would be editing the check or its baseline.

Propose the change to the plan in one message. Continue only after the user accepts it, and record it under Decisions.

### 5. Verify

Run the project's verification command (types, lint, tests). Fix what fails and run it again. "Done" requires it green, plus the phase's "done when" checks, and, when the phase changes behavior, a check in the running application with the seed data.

### 6. Present and stop

- Report what changed, the verification command and its real result, and what you could not check.
- Update the plan: checked tasks, `updated`, `implemented_by` if the project records provenance, **Next step**, and `status: done` after the last phase.
- Propose two or three commit messages in the project's convention, with different plausible types, so the user can answer "commit with 2".
- When the plan lives in issues: work in the branch linked to the phase issue, open the pull request that closes it, and never merge.
- List the corrections the user made during the phase: each one is a candidate for `erxonxi-rule`.

Then stop. Do not start the next phase, even if it is small, until the user asks.

## What is not done

- More than one phase in a run.
- Committing, pushing or merging without being asked.
- Changing a contract, a test name or the copy silently.
- Editing a check, its configuration or its baseline so the change passes.
- Reporting a check as passed that was not run.

## Checklist

- [ ] Is this the current phase, and are its dependencies done?
- [ ] Did I load only the phase, its files to copy and its docs?
- [ ] If I delegated, did the brief carry the contracts verbatim and the files owned?
- [ ] Are the contracts exactly as approved?
- [ ] Is the verification command green, and did I check the "done when"?
- [ ] Is the plan updated, and did I stop with commit proposals?

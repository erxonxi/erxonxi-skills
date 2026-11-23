---
name: erxonxi-implement-phase
description: "Implement exactly one phase of an approved plan, yourself or by delegating it to a subagent with a precise brief, then verify, evaluate, update the plan's state and stop for review. Never commits, pushes or merges on its own. Use when the user asks to implement, continue or resume a plan or one of its phases."
---

# Implement a phase

One phase per run, then stop. The plan already holds the decisions, so this run only executes and reports. It never decides a contract on its own: if the plan does not hold, it stops and asks.

## Rule zero

The plan and the project's conventions win over this skill. When the plan says to copy a file, its shape wins over any default from the other skills.

## Steps

### 1. Find the phase

- Ask for the plan if the user did not name it. Look in `.agents/plans/` or the tracker the plan uses.
- The current phase is the first one with an unchecked task. When the plan lives in issues, the rule is in `erxonxi-plan`, file `resources/plan-in-issues.md` of that skill.
- If the user names a phase, check that the phases it depends on are done. If not, say so and stop.
- If every phase is done, there is nothing left to do: say so and stop.

Done when you can name the phase, its contracts, its tasks and its "done when".

### 2. Load only what the phase needs

Read the phase, the files it says to copy and the convention docs listed in the plan's Context. Nothing else at the start. Check the working tree: if it holds unrelated changes, say so before touching anything.

### 3. Decide who implements

- **Yourself**, by default, when the phase is small or you already hold its context.
- **A subagent** when the phase is self-contained and its brief fits on one screen: it keeps the main context clean for evaluating. Use a model suited to writing code. Write the brief with `resources/worker-brief.md`.
- **A whole wave in parallel**, only when the user asks for it explicitly. Each phase of the wave is still its own run, by its own subagent, in its own branch or worktree, owning disjoint files, and each is evaluated and stopped on its own. Never more phases than the user can review the same day.

When you delegate, you still own the result: its report is a claim that steps 5 to 7 check.

### 4. Implement

- Set the plan's `status` to `in-progress` if it was `approved`.
- Do the tasks in order and check each one in the plan as it is done. The two closing tasks (verify, evaluate and stop) are steps 5 to 7 below.
- Minimal, focused changes. Copy the pattern of the neighboring feature.
- Keep the contracts exactly as approved: names, signatures, event attributes, test case names, copy.
- Refactors and behavior changes go in separate commits, so propose them separately.
- Update the docs the phase affects (data model, HTTP contract, screens) in the same phase.

**Stop and ask** when:

- a task is unclear,
- a contract cannot hold as written, or the implementation reveals a design problem,
- the work needs something beyond the plan or the spec,
- a check fails and the only way to pass it would be editing the check or its exemption list.

Propose the change to the plan in one message. Continue only after the user accepts it, and record it under Decisions.

### 5. Verify

Run the project's verification command (types, lint, tests). Fix what fails and run it again. "Done" requires it green, plus the phase's "done when" checks, and, when the phase changes behavior, a check in the running application with the seed data.

### 6. Evaluate

Load `erxonxi-evaluate` and run it on the phase. If you cannot load it, do its core here, in this order:

1. **Contracts**: for each contract of the phase, mark it present, changed or missing in the code, and list any public contract the phase added without the plan.
2. **Independent review**: if you have a subagent tool, call it now with the diff, the contracts and the convention docs, and nothing of your reasoning (brief in `erxonxi-evaluate`, file `resources/review-brief.md`). Verify each finding before reporting it. Only without a subagent tool, do a separate pass yourself that reads only the diff and the contracts.
3. **Evidence**: what the phase does, shown without running it, or why there is nothing to show.

A green test run is step 5, not this step, and reading your own diff again is not a review. Fix the confirmed findings that are inside the phase, and list the rest.

This step is not optional because the phase was small, the tests passed or you already know of a problem. The "not evaluated" state below is for when something outside your control prevents it (the skill cannot be loaded, the session has no subagent tool): say exactly which, and leave the evaluation task unchecked. Choosing not to launch the reviewer is not one of those reasons.

### 7. Present and stop

- Report what changed, the verification command and its real result, the evaluation, and what you could not check.
- Update the plan: checked tasks, `updated`, `implemented_by` if the project records provenance, **Next step**, and `status: done` after the last phase. The plan ends in one of two states, never in between:
  - **evaluated**: every task of the phase checked, including verify and evaluate; Next step names the following phase;
  - **not evaluated**: the evaluate task (and verify, if it is not green) left unchecked; Next step says "Phase N: finish verification/evaluation", so the next run resumes this phase and not the next one.
- Offer two or three numbered commit messages in the project's convention, each with a type that could fit, so the user can pick one by its number.
- When the plan lives in issues and the user chose to work through pull requests, that choice is the permission to commit the phase on its linked branch, push it and open the pull request that closes the phase issue. Never merge it.
- List the corrections the user made during the phase: each one is a candidate for `erxonxi-rule`.

Then stop. Do not start the next phase, even if it is small, until the user asks.

## What is not done

- More than one phase in a run. A wave the user asked for is several runs, not one.
- Committing, pushing or merging without being asked, or merging at all.
- Changing a contract, a test name or the copy silently.
- Editing a check, its configuration or its exemption list so the change passes.
- Reporting a check as passed that was not run.

## Checklist

- [ ] Is this the current phase, and are its dependencies done?
- [ ] Did I load only the phase, its files to copy and its docs?
- [ ] If I delegated, did the brief carry the contracts verbatim and the files owned?
- [ ] Are the contracts exactly as approved?
- [ ] Is the verification command green, and did I check the "done when"?
- [ ] Did I evaluate the phase, with an independent review and evidence?
- [ ] Is the plan updated, and did I stop with commit proposals?

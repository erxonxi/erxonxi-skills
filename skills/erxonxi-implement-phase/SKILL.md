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

- Ask for the plan if the user did not name it. Look in `.agents/plans/` or the tracker the plan uses. If more than one plan matches, pick none: list them with their status and date, leave out `status: done`, and ask.
- The current phase is the first one with an unchecked task. If Next step says otherwise, the checkboxes win: say so and correct Next step. When the plan has no checkboxes (an RFC, a design doc), check each step's "done when" against the code, report what you found and ask where to start; do not add checkboxes to their document. When the plan lives in issues, the rule is in `erxonxi-plan`, file `resources/plan-in-issues.md` of that skill.
- If the current or the named phase is blocked by one that is not done, say which, and offer a phase that is not blocked, or stop.
- If every phase is done, there is nothing left to do: say so and stop.

Done when you can name the phase, its contracts, its tasks and its "done when".

### 2. Load only what the phase needs

Read the phase, the files it says to copy and the convention docs listed in the plan's Context. Nothing else at the start. Check the working tree: if it holds unrelated changes, say so before touching anything.

Run the verification command before changing anything. If it is already red, stop and report the failure as existing before the phase. The user chooses: fix it first as a change of its own, go on with it named as known-red in the report, or stop. Never fix, skip or silence it inside the phase.

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
- a check fails and the only way to pass it would be editing the check or its exemption list,
- the phase turns out larger than one review: stop at the first green point that stands alone and propose the split.

Propose the change to the plan in one message. Continue only after the user accepts it, and record it under Decisions.

### 5. Verify

Run the project's verification command (types, lint, tests). Fix what fails and run it again. "Done" requires it green, plus the phase's "done when" checks, and, when the phase changes behavior and has an entry point, a check in the running application with the seed data. Without an entry point, say that nothing can be run yet.

### 6. Evaluate

Call the Skill tool with `erxonxi-evaluate` now and follow it on the phase. This is a tool call, not a reference to remember; where skills are plain files, read its `SKILL.md`. A green test run is step 5, not this step, and reading your own diff again is not a review. Fix the confirmed findings that are inside the phase, and list the rest.

This step is not optional because the phase was small, the tests passed or you already know of a problem. If the skill cannot be loaded, do not improvise the evaluation: say so, leave the evaluation task unchecked and close as "not evaluated".

### 7. Present and stop

- Report what changed, the verification command and its real result, the evaluation, and what you could not check.
- Update the plan: checked tasks, `updated`, `implemented_by` if the project records provenance, **Next step**, and `status: done` after the last phase. The plan ends in one of two states, never in between:
  - **evaluated**: every task of the phase checked, including verify and evaluate; Next step names the following phase, with the open points that do not block in the same line ("Phase 2, after you decide: <points>");
  - **not evaluated**: the evaluate task (and verify, if it is not green) left unchecked; Next step says "Phase N: finish verification/evaluation", so the next run resumes this phase and not the next one.
- Offer two or three numbered commit messages in the project's convention, each with a type that could fit, so the user can pick one by its number.
- When the plan lives in issues and the user chose to work through pull requests, that choice is the permission to commit the phase on its linked branch, push it and open the pull request that closes the phase issue. Never merge it.
- Only if the user corrected you during the phase, list each correction as a candidate for `erxonxi-rule`. Otherwise say nothing about rules.

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

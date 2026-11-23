---
name: erxonxi-evaluate
description: "Judge a change by its results before a human reads its lines: checks, approved contracts against the diff, an independent review, before/after evidence, and commit or PR text that says what was not verified. Use when a phase or change is done, before committing or opening or updating a PR."
---

# Evaluate

An agent writes code faster than anyone can read it. So the human does not review lines first: the checks judge the form, an independent reviewer judges the substance, and the human judges the result on evidence. This skill produces that evidence and never claims more than it saw.

## Rule zero

The project's checks, PR template and review rules win. If the repository has a PR template, fill that one. If it defines review levels, use them.

## Steps

### 1. Gather what the change promised

- The plan phase: its contracts and its "done when". Without a plan, the task as the user stated it.
- The diff of this change only. While nothing is committed: the working tree against `HEAD`, new files included. When the change was committed on its own branch: against the commit where it started. Never against an older base that mixes in earlier phases.
- The verification command, from `AGENTS.md` or the project configuration.

Done when you can state what the change was supposed to do, in one sentence, and against which base.

### 2. Run the checks

Run the verification command. Record the exact command and its real result. Fix what fails and run it again, or stop and report.

A green check is the only thing that counts as verified. Reading code and thinking it works is not verification.

Done when the verification command is green, or the failure is reported as it is.

### 3. Compare with the contracts

For each approved contract, confirm in the diff that it exists exactly as agreed: names, signatures, event attributes, test suites and case names, schema, copy. Then look the other way:

- a public contract in the diff that the plan did not list is scope creep: report it,
- a listed test case missing, renamed or weakened is a finding,
- a check, its configuration or its exemption list changed in the diff is a finding unless the user asked for it.

Done when every contract is marked as present, changed or missing.

### 4. Get an independent review

The author's reading is anchored on its own intent. Get a second one that is not:

- If you have a subagent tool, this step means calling it: launch a reviewer in a fresh context, on a strong model when the change touches data, money, security, concurrency or architecture. Your own second reading does not replace it.
- Give it the diff, the approved contracts and the paths of the convention docs. **Not** your reasoning, your summary or your conclusion. Use `resources/review-brief.md`.
- Ask for findings, each with a file and line, the concrete scenario that fails, and a severity.
- Verify every finding yourself before reporting it. Drop what you cannot confirm, and say how many you dropped.

Without subagents, do a separate pass yourself reading only the diff and the contracts, with the checklists of the knowledge skills that apply (`erxonxi-architecture`, `erxonxi-domain-modeling`, `erxonxi-testing`, `erxonxi-clean-code`).

Only mechanical changes skip this step: docs, configuration, a rename with no behavior change. Size is not a reason: a small diff that adds or changes behavior gets a review, because that is where a second reading is cheapest. Neither is having found problems already: the reviewer is there for the ones you did not find, so run it before you report, not after the fixes. When you skip it, say so and why.

Done when every confirmed finding is fixed or listed for the user.

### 5. Capture evidence

Evidence lets the user see what the change does without running it. First write the one sentence the evidence must support. Then choose by the kind of change; `resources/evidence.md` has the details of each:

| Change | Evidence |
|---|---|
| Visual (pages, components, emails, copy) | Before and after screenshots, same state and viewport |
| A flow of several steps | A short recording, or the numbered sequence of states |
| Behavior without a visual (endpoint, CLI, agent tool, job) | The same input on both sides and each side's output, trimmed to what matters |
| Architecture (calls, routing, dependencies) | Before and after diagrams of the affected part, same node names |
| Nothing observable outside tests (refactor, config, docs) | None. Say so, and let the checks speak |

- A fix needs its failure on record: the error, the wrong output or the broken state as it was before.
- Support the sentence you wrote, not whatever the change happened to touch.
- Both sides with the same input and setup, and one line naming what each side ran on.
- Captures stay out of the repository.

Done when someone who did not run the code can see the change, or you said why there is nothing to see.

### 6. Write the text

- **Commit**: propose two or three messages in the project's convention, as in `erxonxi-workflow`.
- **Pull request**: fill the repository's template, or `resources/pr-template.md`. Only checks that ran appear as done, and what was not checked is always written down.
- **When the change is not ready** (a red check, a missing contract, a confirmed finding not fixed): still write the text the user asked for, marked as a draft, with the open findings at the top of it. Its proof section states the current results, never the results you expect after the fixes.

Done when the user can decide to commit, merge or send it back from what you wrote, without asking you anything.

### 7. Stop

Present the result: the checks, the contract comparison, the confirmed findings, the evidence and the text. Do not commit, push or merge unless asked.

When `erxonxi-implement-phase` called this skill, hand the result back to its last step instead of stopping here: that step updates the plan and then stops.

Each correction the user makes after reading it is a candidate for `erxonxi-rule`: say so.

## What is not done

- Claiming a check, a manual test or a review that did not happen.
- Giving the reviewer your conclusion, or reporting its findings without verifying them.
- Evidence of a side effect instead of the change, or only the "after" of a fix.
- Editing a check or a test so the change passes.
- A description that repeats the commit list instead of stating the problem and the decisions.

## Checklist

- [ ] Is the verification command green, with its real output recorded?
- [ ] Is every approved contract present as agreed, and is there nothing unlisted?
- [ ] Did an independent reviewer see the diff without my conclusion, and did I verify each finding?
- [ ] Can the user see the change without running it?
- [ ] Does the text say what I did not check?
- [ ] Did I stop without committing?

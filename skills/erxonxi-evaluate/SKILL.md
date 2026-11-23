---
name: erxonxi-evaluate
description: "Judge a change by its results before a human reads its lines: checks, approved contracts against the diff, an independent review, before/after evidence, and commit or PR text that says what was not verified. Use when a phase or change is done, before committing or opening or updating a PR."
---

# Evaluate

An agent writes code faster than anyone can read it. So the human does not review lines first: the checks judge the form, an independent reviewer judges the substance, and the human judges the result on evidence. This skill produces that evidence and never claims more than it saw.

## Rule zero

The project's checks, PR template and review rules win. If the repository has a PR template, fill that one. If it defines review levels, use them.

## Mechanical changes

A change with no behavior in it (docs, configuration, a rename) takes a short path: run the checks, confirm nothing still uses the old name, and report in about five lines: the verdict, the check result and what you could not see. The verdict is "Ready." unless something in this change is wrong. A problem you notice in code the change did not touch is one line at the end, not an open point.

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

For each approved contract, confirm in the diff that it exists exactly as agreed: names, signatures, event attributes, test suites and case names, schema, copy. Compare by meaning under the repository's conventions: an id that every event carries as `aggregateId` is present, not missing. Name the difference without calling it a mismatch. Then look the other way:

- a public contract in the diff that the plan did not list is scope creep: report it,
- a listed test case missing, renamed or weakened is a finding,
- a check, its configuration or its exemption list changed in the diff is a finding unless the user asked for it.

Done when every contract is marked as present, changed or missing.

### 4. Get an independent review

The author's reading is anchored on its own intent. Get a second one that is not:

- **Level.** Use the one the plan states for the phase (its `Review:` line). Without one, decide by what the change touches, never by its size:
  - **independent, strong model**: money, personal data, authentication or permissions, concurrency, a migration, or anything that deletes data. Strong means the strongest model available, never weaker than the author's.
  - **independent**: any other change of behavior, and above all a new or changed public contract (event, endpoint, schema), a change across contexts, or the first piece of its kind in the project.
  - **self**: mechanical changes only (see above).
- An independent review means calling your subagent tool: a general-purpose reviewer (not a search agent) in a fresh context, with the model the level asks for. Your own second reading does not replace it. Do not report before it returns; until then, one line saying you are waiting.
- Give it the diff, the approved contracts and the paths of the convention docs. **Not** your reasoning, your summary or your conclusion. Use `resources/review-brief.md`.
- Ask for findings, each with a file and line, the concrete scenario that fails, and a severity.
- A finding is confirmed only with its proof beside it: the file and line you read and what it showed, or the command you ran and its output. Without proof, drop it or list it as unverified. Report "confirmed N, dropped M" with the reason for each drop.
- A finding that argues against a decision recorded in the plan is not a defect of the change: list it as "challenges decision <X>" with its scenario, and let the user decide.

Without subagents, do a separate pass yourself reading only the diff and the contracts, with the checklists of the knowledge skills that apply (`erxonxi-architecture`, `erxonxi-domain-modeling`, `erxonxi-testing`, `erxonxi-clean-code`).

Only mechanical changes skip the independent review: docs, configuration, a rename with no behavior change. Size is not a reason: a small diff that adds or changes behavior gets a review, because that is where a second reading is cheapest. Neither is having found problems already: the reviewer is there for the ones you did not find, so run it before you report, not after the fixes. When you skip it, say so and why in one line. The report of a mechanical change stays that short: the verdict, the check result and what you could not check.

Done when every confirmed finding is fixed or listed for the user.

### 5. Capture evidence

Evidence lets the user see what the change does without running it. First write the one sentence the evidence must support. Then choose by the kind of change; `resources/evidence.md` has the details of each:

| Change | Evidence |
|---|---|
| Visual (pages, components, emails, copy) | Before and after screenshots, same state and viewport |
| A flow of several steps | A short recording, or the numbered sequence of states |
| Behavior without a visual (endpoint, CLI, agent tool, job) | The same input on both sides and each side's output, trimmed to what matters |
| Architecture (calls, routing, dependencies) | Before and after diagrams of the affected part, same node names |
| Nothing observable outside tests (refactor, config, docs) | None: leave the evidence section out and let the checks speak |

- A fix needs its failure on record: the error, the wrong output or the broken state as it was before.
- Support the sentence you wrote, not whatever the change happened to touch.
- Both sides with the same input and setup, and one line naming what each side ran on.
- Captures stay out of the repository.

Done when someone who did not run the code can see the change, or you said why there is nothing to see.

### 6. Write the text

- **Commit**: when the user asked for it or `erxonxi-implement-phase` called this skill, propose two or three messages in the project's convention, as in `erxonxi-workflow`.
- **Pull request**: fill the repository's template, or `resources/pr-template.md`. Only checks that ran appear as done, and what was not checked is always written down.
- **Verdict**, as the first line of the report, one of three:
  - **Not ready**: a red check, a contract missing or changed, or a confirmed finding that breaks promised behavior, loses data or opens a security hole.
  - **Ready, with open points**: everything promised holds and there is at least one open point. Confirmed findings about behavior the plan does not specify are decisions for the user, each with your recommendation. They do not block the commit.
  - **Ready.**
- When it is not ready, still write the text the user asked for, marked as a draft, with the blocking findings at the top. Every sentence in it is true today: never write what will only be true after the fixes, not even with a note beside it.

Done when the user can decide to commit, merge or send it back from what you wrote, without asking you anything.

### 7. Stop

Present the result: the checks, the contract comparison, the confirmed findings, the evidence and the text. Leave out any part with nothing in it instead of writing that it is empty. Do not commit, push or merge unless asked.

When `erxonxi-implement-phase` called this skill, hand the result back to its last step instead of stopping here: that step updates the plan and then stops.

If the plan's tasks for this change are still unchecked, say so and offer to check them. Only if the user corrected you during this run, list each correction as a candidate for `erxonxi-rule`; otherwise say nothing about rules.

## What is not done

- Claiming a check, a manual test or a review that did not happen.
- Giving the reviewer your conclusion, or reporting its findings without verifying them.
- Evidence of a side effect instead of the change, or only the "after" of a fix.
- Editing a check or a test so the change passes.
- A description that repeats the commit list instead of stating the problem and the decisions.

## Checklist

- [ ] Is the verification command green, with its real output recorded?
- [ ] Is every approved contract present as agreed, and is there nothing unlisted?
- [ ] Did an independent reviewer see the diff without my conclusion, and does each confirmed finding carry its proof?
- [ ] Does the report open with one of the three verdicts?
- [ ] Can the user see the change without running it?
- [ ] Does the text say what I did not check?
- [ ] Did I stop without committing?

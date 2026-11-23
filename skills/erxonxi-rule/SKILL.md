---
name: erxonxi-rule
description: "Turn a convention into a check that fails in seconds (type, lint rule, architecture test) with a baseline that only shrinks, and keep prose only for the why. Use right after the user corrects you on a convention, when they describe one to enforce, or to enforce the conventions a repository already follows."
---

# Rule

A convention written in prose holds only if the agent loads the right document, reads it the way the team meant it and a reviewer notices the miss. A check fails in seconds and its message says what to do instead, so the agent corrects itself without a human in the loop. This skill turns conventions into checks. Prose keeps only what no check can verify, and the why.

## Rule zero

The project's tooling wins: its linters, its test runner, its way of exempting code and its commit convention. This skill adds a tool or a dependency only with the user's yes.

## Modes

| Mode | Input | Steps |
|---|---|---|
| **One convention** (default) | The last correction in the conversation (your version and the one the user wanted), or a convention the user describes | This file |
| **Harvest** | The conventions a repository already has: written in docs, `AGENTS.md` or ADRs, and the ones only the code shows. Optionally limited to a path | `resources/harvest.md`, then steps 3 to 7 of this file for each convention |

## Principles

- **Exact or prose.** A check must cover the whole convention and flag only real violations. A check that has to guess (is this class an aggregate? is this file an entry point?) is not a check: write the short doc. The effort of writing the check is never the reason to skip it.
- **Freeze, do not fix.** The check is an error for new code from today. The code that already breaks it is its **baseline**: exempted unit by unit and left as it is. The baseline only shrinks.
- **Seen red, seen green.** A check counts only after you saw it fail on a violation and pass on the repository.
- **One convention, one check.** Each with its own message and its own baseline, so each can be removed or migrated alone.
- **The check holds the how, the doc holds the why.**
- **Errors, never warnings.** An agent treats a warning as noise.

## Steps

### 1. Pin the convention

Done when you can state, one sentence each:

- what the code must do or must not do,
- its scope: folders, layers, file types,
- its exceptions, if the user or the docs name any,
- why the team wants it, if anyone said so,
- one real example that follows it and one that breaks it. After a correction they are the user's version and yours.

Ask only when the convention has two readings or the scope is unclear. All the questions in one message, each with the option you recommend.

### 2. Read the tooling

Read the lint, format, type, test, hook and CI configuration. Done when you know:

- the verification command a contributor runs and the CI job that runs it,
- each checker that command runs, what it parses and the file where a new rule goes,
- what happens when two configuration blocks match the same file: options merge, or the last block replaces the others,
- how the repository exempts existing code today,
- where checks are tested, if anywhere, and with which command,
- whether a pre-commit hook lints the changed files,
- whether something already checks this convention or part of it.

### 3. Pick the lowest rung

Take the first rung that covers the whole convention without guessing. Confirm that the installed version of the tool has the rule before choosing it.

1. **The type system, the compiler or the formatter.** The best check is an illegal state that does not compile.
2. **A built-in rule of an installed linter.**
3. **A generic configurable rule of an installed linter**: restricted imports, restricted syntax, naming patterns, dependency boundaries.
4. **A maintained plugin for an installed linter.** New dependency: ask.
5. **A custom rule in a local plugin of an installed linter.**
6. **A test in the existing test runner**: an architecture test over the import graph, or a test that lists files and asserts on them. It reaches what linters cannot: several files, files that are not code, languages without a linter. See `resources/beyond-the-linter.md`.
7. **A new tool.** Only when nothing above fits, and only with the user's yes.

- If a check already covers part of the convention, extend it instead of adding a second one.
- If a check exists but stays green on a violation, repair it.
- If a generic rule is already configured for the same files and its options replace instead of merge, go one rung down so you do not silently disable the other convention.
- If the user declines a dependency, go one rung down to something installed, or stop at the doc.

Typical conventions of these skills and their usual rung: `resources/catalog.md`.

Done when the convention has a mechanism, or no rung covers it exactly. In that case go to step 6.

### 4. Write the check

1. Add it as an error for the whole scope. Encode the documented exceptions in the check or its scope, with a comment that names the document.
2. Write the message for the agent that will read it: what to do instead and where the convention lives (`Convention: docs/<file>.md`, or the path of a file that does it right). If the tool takes no custom message, put that line as a comment next to the rule.
3. Run it on the whole repository. What fails is the baseline. Count with the tool, never with a text search: the tool finds cases a search misses.
4. Record the baseline by the smallest unit the tool can name (a file, or a symbol when one file holds many), with the first mechanism available: the tool's own suppression file, then a list of exempt units in the rule's configuration, then inline comments. Write next to it that it only shrinks, and make that true: something fails when an exempt unit no longer breaks the rule, so the list cannot rot.
5. Fix violations instead of exempting them only when the tool has a safe autofix or they are a handful of one-line changes. A large migration is never part of this change.

### 5. Prove it

Under the real configuration of the repository:

- **Red**: it fails on a violation outside the baseline. Use the breaking example of step 1.
- **Green**: it passes on code that follows the convention, and the verification command is green on the repository.

Keep both cases as tests of the check when the place exists or the suite stays fast, so an upgrade that breaks the rule is noticed: a broken check looks exactly like a convention everybody follows. Keep the red case out of the real lint run. With no fast place for them, prove red with a temporary file and delete it.

The verification command and CI must run the check. If a pre-commit hook lints the changed files, it runs it too.

Done when the check went red, then green, and the verification command passes.

### 6. Write the short doc

Where the project keeps its conventions, usually `docs/<area>/`. Create `docs/` if there is none.

With a check:

```
# <Convention>

<the rule, in one imperative sentence>

**Why**: <the reason>

Enforced by: <tool> · <rule or test name>
```

Without a check:

```
# <Convention>

<the rule, in one imperative sentence>

**Why**: <the reason>

**Not enforced**: <why no check can be exact, in one sentence>

## Examples

Good: <shortest real example>
Bad: <shortest realistic violation, from the same domain>
```

If nobody gave the why, show the draft and ask for it in one line. Without an answer, leave the line out instead of inventing one. Add the doc to the documentation map of `AGENTS.md`.

### 7. Hand over

- Do not commit unless asked. Propose one commit per convention, containing the check, its tests, its baseline and its doc, with the project's commit convention. Shared tooling goes first, in its own commit.
- Report in a few lines: the convention, the mechanism and its rung, the baseline size, and how to migrate one unit (change the code, remove it from the baseline). Or why it stays as prose.

## Protect the checks

- Never edit a check, its configuration or its baseline to make your own change pass. If a change seems to need it, stop and say so.
- Growing a baseline needs the user's explicit yes, every time.
- Where the agent supports hooks or permissions, block writes to check and baseline files from the agent. A sentence in a prompt is not a guardrail.

## What is not done

- A check that guesses, or a check that covers half the convention without saying so.
- Warnings, or rules switched off "for now".
- Fixing the whole baseline in the same change as the check.
- A doc that repeats what the check's message already says.
- A new linter for a single rule that an architecture test in the existing runner could cover.

## Checklist

- [ ] Can I state the convention, its scope, its exceptions and one example of each side?
- [ ] Did I pick the lowest rung that covers all of it without guessing?
- [ ] Does the message say what to do instead and where the convention lives?
- [ ] Is the baseline recorded by unit, and does something fail when it should shrink?
- [ ] Did I see it red, then green, and is the verification command green?
- [ ] Does CI run it, and the pre-commit hook if there is one?
- [ ] Is the doc minimal, with the why, and listed in `AGENTS.md`?

---
name: erxonxi-rule
description: "Turn a convention into a check that fails in seconds (type, lint rule, architecture test), with an exemption list for old code that can only shrink. Use right after the user corrects you on a convention, when they describe one to enforce, or to enforce the conventions a repository already follows."
---

# Rule

Every correction a human has to repeat is a check nobody wrote. Documents get skipped, misread or never loaded. A red build does not. This skill writes the check, and keeps prose for the reason behind it and for what no machine can decide.

## Rule zero

Work with what the project already runs: its type checker, linters, test runner, hooks, CI and commit convention. A new tool or dependency needs the user's yes.

## Modes

- **From a correction** (default). The convention is the gap between what you wrote and what the user wanted, or what the user describes. One convention per run.
- **Harvest**. The project already has conventions, written down or only visible in the code, and wants them enforced. Read `resources/harvest.md`: it says how to collect them and how it changes the steps below.

## What makes a good check

| Property | Meaning |
|---|---|
| Complete | It covers the whole convention, not a convenient part of it. |
| Precise | It never fires on correct code. If deciding needs judgment (is this an aggregate? is this an entry point?), it is not a check: the convention stays as prose. How hard the check is to write does not matter. |
| Loud | It is an error. Agents treat warnings as noise. |
| Helpful | Its message tells the reader what to write instead and where the convention is explained. |
| Fair to old code | Code that broke the convention before today is listed as exempt. The list can lose entries, never gain them without the user's yes. |
| Proven | It was seen failing on a violation and passing on the project. |
| Independent | One convention, one check, one message, one exemption list. Each can be removed or migrated alone. |

## Steps

### 1. Write the convention card

Before touching any configuration, write down:

```
Rule        what code must or must not do, as one imperative sentence
Scope       folders, layers, file types it applies to
Exceptions  the ones the user or the docs allow, if any
Reason      why the team wants it, if anyone said
Follows     a real snippet that respects it
Breaks      a real snippet that violates it (after a correction: your first version)
```

If the convention has two readings or the scope is fuzzy, ask, in one message, with your recommended reading.

### 2. Map the toolchain

Find out, from the configuration and not from memory:

- which single command a contributor runs to verify a change, and which CI job runs it,
- every checker behind that command, the languages it understands and where new rules are declared,
- whether two configuration sections that match the same file combine their options or the later one wins,
- how this project already exempts legacy code,
- whether checks have tests of their own, and where,
- whether a hook checks changed files before a commit,
- whether something already enforces this convention, fully, partly or in a broken way.

### 3. Choose the mechanism

Go up this ladder and stop at the first rung that is complete and precise for this convention, after confirming the installed version supports it:

1. **Types, compiler, formatter.** Best of all: the wrong code cannot be written.
2. **A rule the installed linter ships with.**
3. **A configurable rule of the installed linter**: banned imports, banned syntax, naming patterns, module boundaries.
4. **A plugin for the installed linter**, maintained by its community. A dependency: ask.
5. **A rule of your own** in a local plugin of the installed linter.
6. **A test in the existing runner**: an architecture test over the import graph, or a test over file names and contents. It covers what crosses files, what is not code and languages without a capable linter. Shapes: `resources/beyond-the-linter.md`.
7. **A new tool.** Last resort, with the user's yes.

Adjustments:

- Something already covers part of it: extend that check.
- Something exists but passes on the breaking snippet: repair it.
- A configurable rule is already set for the same files and later sections override earlier ones: adding your options there would silently switch off the other convention. Use the next rung.
- A dependency the user declines: drop to a rung that needs nothing new, or keep the convention as prose.

If no rung is both complete and precise, skip to step 6.

Common conventions of these skills and the rung they usually land on: `resources/catalog.md`.

### 4. Build it

- Declare it as an error over the whole scope. Express the allowed exceptions in the rule or its scope, with a comment pointing to the document that allows them.
- Write the message for an agent: what to do instead, then `Convention: <path to the doc or to a file that does it right>`. If the tool has no custom messages, leave that line as a comment beside the rule.
- Run it over the whole project. Whatever fails today is the exemption list. Size it from the tool's own output: a text search misses some cases and invents others.
- Record the exemptions as narrowly as the tool allows (a file, or a symbol inside it). Prefer the tool's native exemption mechanism; fall back to a list in the rule's own configuration; use inline markers only if nothing else exists.
- Make the list honest: something must fail when an exempt entry stops violating the rule, so entries leave as code gets fixed. Write next to the list that it only shrinks.
- Fix old violations instead of exempting them only when the tool can fix them safely by itself or there are a few trivial ones. Migrating the rest is separate work.

### 5. Prove it

- **Fails**: put the breaking snippet (or the smallest violation you can write) outside the exempt list and watch the check report it with your message.
- **Passes**: the verification command is green on the project as it is.

Keep the failing and passing snippets as tests of the check when the project has a fast place for them. Otherwise create that place with the existing runner, or prove the failure with a throwaway file and delete it. A check that broke silently and a convention everyone follows both show zero errors: only a test tells them apart. The failing snippet must never be picked up by the real lint run.

Confirm the verification command, CI and the pre-commit hook (if any) all run the new check.

### 6. Record the convention

Every convention ends as one short file where the project keeps its conventions, usually `docs/<area>/`:

```
# <Convention>

<the rule, one imperative sentence>

Why: <the reason>

Checked by: <tool> → <rule or test name>
```

When no check could be complete and precise, replace the last line with:

```
Not checked: <why no exact check exists, one sentence>

Respects: <shortest real snippet>
Violates: <shortest realistic snippet from the same domain>
```

Leave `Why:` out rather than inventing it: show the draft and ask the user for the reason in one line. List the file in the documentation map of `AGENTS.md`.

### 7. Hand over

Commit only if the user asked. Otherwise propose one commit per convention, holding its check, its tests, its exemption list and its doc. Report: the convention, the rung used, how many entries the exemption list holds and how to retire one (fix the code, delete the entry), or why it stayed as prose.

## Guarding the guards

- Your change failing a check is a reason to change your code, never the check, its configuration or its exemption list. If you believe the check is wrong, stop and say why.
- Adding an entry to an exemption list always needs the user's yes.
- If the agent supports hooks or permissions, deny it writes to check and exemption files. A prompt sentence is not a guardrail.

## What is not done

- A check that needs judgment, or one that silently covers half the convention.
- Warnings, or rules disabled "for now".
- Migrating every old violation inside the change that adds the check.
- A doc that repeats the check's message.
- A whole new linter for one rule a test in the existing runner could express.

## Checklist

- [ ] Is the convention card complete, with a real snippet on each side?
- [ ] Is the chosen rung the lowest one that is complete and precise?
- [ ] Does the message say what to do instead and where to read more?
- [ ] Is the exemption list narrow, and does something fail when an entry should leave it?
- [ ] Did I see the check fail, then the project pass?
- [ ] Do the verification command, CI and the pre-commit hook run it?
- [ ] Is there one short doc, listed in `AGENTS.md`?

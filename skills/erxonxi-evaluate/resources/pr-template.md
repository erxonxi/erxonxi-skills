# Pull request template

Use the repository's template when it has one. Otherwise this one. Delete the sections that do not apply.

```markdown
## Why

<the problem, not the solution. Link the issue or the plan>

## What changes

- <2 to 5 bullets: decisions, trade-offs, non-obvious effects. Not the commit list>

## Evidence

<from erxonxi-evaluate step 5, or "Nothing observable outside the tests: <why>">

## How I verified it

- `<command>`: <real result>
- <manual check>: <what you did and saw>
- Not checked: <what you did not verify, and why>

## Review

**Difficulty:** low | medium | high · <what makes it so>
**Independent review:** <findings fixed, findings left for the reviewer, or "skipped: <reason>">

## Deploy steps

1. [ ] **Before merging:** <where> <exact command, query or flag>
2. [ ] **After deploying:** <...>

## Rollback

<"Revert this pull request." when that is enough. Otherwise each step, in order, with the exact command or migration, what data is kept or lost, and what cannot be undone>

## Authorship

<tool and model with its version, and who directed the work>
```

## Rules

- **Why** states the problem. A reader who skips the rest still knows whether to care.
- **How I verified it** lists only what was run, with its real result, and always has the "Not checked" line.
- **Difficulty** is how hard the change is to review, not a quality verdict.
- **Deploy steps** only when someone must do something by hand. Never tick a step you did not run.
- **Rollback**: when the change touches state outside the code (migrations, backfills, flags, queues, published events), read the diff and write the real steps. Never guess a migration name.
- **Authorship** only when the project records provenance. Name the person from the session or the event that started the work, never guess one.

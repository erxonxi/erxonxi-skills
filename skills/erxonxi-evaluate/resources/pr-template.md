# Change description template

For a pull request, or the body of a large commit, when the repository has no template of its own. Drop every block that has nothing to say.

```markdown
## Problem

<who was affected and how, in two or three sentences. Link the plan or the issue>

## Approach

- <the decisions a reviewer should know about, and what was ruled out>
- <side effects that are not obvious from the diff>

## Proof

<the evidence, from erxonxi-evaluate step 5>

Ran:
- `<command>` → <result as printed>

Saw:
- <manual checks: what you did and what happened>

Did not check:
- <what remains unverified, and why>

## Risk

Review effort: <small | medium | large>, because <the reason>.
Independent review: <what was found and fixed, what is left open, or why it was skipped>.

Manual steps:
1. [ ] <when: before merge, after deploy> · <where> · `<exact command, query or flag>`

Undo: <how to take this back in production>

## Provenance

<agent and model with its version, and the person who directed the work>
```

## Notes on each block

- **Problem** is enough for a reader who stops there to know whether this matters to them. It describes the pain, not the fix.
- **Approach** is not a list of commits or files. If the diff already says it, leave it out.
- **Proof**: "Ran" holds only commands that actually ran, with their actual output. "Did not check" is never empty by omission: if everything was checked, write "Nothing".
- **Review effort** measures how much attention the diff needs, not how good it is.
- **Manual steps** only exist when a person must act for the change to work. Leave the boxes unticked unless you ran the step yourself.
- **Undo**: if reverting the code is enough, say that in one line. If the change moves state the code does not own (schema, stored data, flags, queues, scheduled jobs, emitted events), write each step to reverse it, in order, from what the diff really contains, and say plainly what cannot be reversed.
- **Provenance** only when the project records it. Take the person from the session or from what triggered the work; never invent a name.

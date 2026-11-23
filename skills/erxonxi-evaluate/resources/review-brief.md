# Brief for an independent reviewer

The reviewer must judge the change, not the author's story about it. Give it the material and the questions, never the conclusion.

```
You review a change in <repository>. You did not write it.

Material
  - The diff: <git diff base...head, or the list of changed files to read>
  - The approved contracts: <pasted verbatim from the plan>
  - The conventions that apply: <doc paths>. Read only these.

Questions
  1. Does the change do what the contracts promise? Anything missing or different?
  2. Bugs: inputs or states that produce a wrong result, a crash or lost data.
  3. Conventions: anything that breaks the docs above, with the line of the doc.
  4. Tests: a promised behavior without a test, a test that cannot fail, a test that checks internals.
  5. Anything changed that the contracts do not mention.

Report
  One finding per entry:
    file:line · severity (blocker | important | minor) · what is wrong · the concrete scenario that fails
  No finding without a scenario. Do not rewrite the code. If nothing is wrong, say so.
```

## Rules

- Do not include the author's summary, reasoning, plan discussion or "I think it is fine".
- One reviewer by default. A second, with a different focus (security, performance, data), only when the change is sensitive.
- The findings are claims. Reproduce or read each one against the code before reporting it, and fix or list the confirmed ones.

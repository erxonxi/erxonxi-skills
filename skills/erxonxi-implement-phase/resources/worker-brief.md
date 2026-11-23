# Brief for a subagent that implements a phase

The subagent knows only what the brief says. Write it so it could do the phase without this conversation, and so its report can be checked against it.

```
Goal
  <what the user can do when this phase ends, one sentence>

Contracts (verbatim from the plan, do not change them)
  <use case signatures, events, test suites with their cases, schema, copy>

Files you own
  <paths you may create or edit>. Touch nothing else.
  If you need to touch another file, stop and report why.

Pattern to copy
  <existing file or class to imitate, and what to take from it>

Conventions
  <the docs that apply, by path>. Read only these.

Tasks
  <the phase tasks, in order>

Done when
  <the verification command> is green, and <the phase's observable checks>.

Limits
  - Do not commit, push or open pull requests.
  - Do not edit checks, their configuration or their baselines.
  - Do not change a contract. If one cannot hold, stop and explain.

Report
  - files changed, one line each
  - the verification command and its real output, trimmed
  - what you could not check, and why
  - anything that contradicts the plan or the docs
```

## Rules

- One phase per subagent. Parallel subagents only for phases in the same wave, in isolated branches or worktrees, with disjoint "files you own".
- Paste the contracts, do not summarize them: a summary drifts.
- Do not include your expected solution beyond the contracts and the pattern to copy. The subagent should follow the code, not your guess.
- Treat the report as a claim to verify, not as proof. Steps 5 to 7 of the skill check it.

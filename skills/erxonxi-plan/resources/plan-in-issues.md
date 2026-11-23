# Plan stored as issues

Use this when the team tracks work in an issue tracker (GitHub, GitLab, Linear, Jira or any other). The tracker is an adapter: the plan keeps the same shape, only its storage changes.

## Shape

- **Parent issue**: the plan. Title: the task. Body: Goal, Context, Decisions, Next step, and a **Phases** checklist with one line per child issue, in order.
- **Child issue per phase**: title `<Phase N>: <what the user can do>`. Body: a reference to the parent, the wave and `Depends on`, the contracts, the task checklist and the "done when" checks.
- Hard dependencies use the tracker's native "blocked by" relation when it has one, otherwise a `Depends on:` line.

The current phase is the **first child issue in the parent checklist that is still open**.

## Rules

- Create issues only after the user accepted the plan. Search for duplicates first.
- Use the tracker as the team uses it: its templates, labels and states. Add no field, state or label.
- Resolve the repository or project from the local checkout or the user's words, never from a guess. If the issue the user gave belongs to another repository, stop and say so.
- Phase work goes in a branch linked to the child issue, and a pull request that closes it on merge.
- The agent never merges. Merging is the human's decision, and it is what closes the phase.

## Typical commands

Adapt them to the tracker the project uses:

| Action | GitHub (`gh`) | GitLab (`glab`) |
|---|---|---|
| Read an issue | `gh issue view <n>` | `glab issue view <n>` |
| Create an issue | `gh issue create --title … --body-file …` | `glab issue create --title … --description …` |
| Branch linked to an issue | `gh issue develop <n> --checkout` | `glab issue view <n>` then a branch named after it |
| Open the phase pull request | `gh pr create --body-file … ` with `Closes #<n>` | `glab mr create --description …` with `Closes #<n>` |

For trackers with an MCP server or an API instead of a CLI, use the same steps through it.

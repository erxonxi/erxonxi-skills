# Harvest mode

The project already has conventions and wants them enforced. Some are declared (docs, `AGENTS.md`, ADRs, review checklists). Others are only observable: the code does the same job in more than one way, and an agent imitates whichever file it happens to open first.

## How the steps change

1. **Map the toolchain** (step 2 of `SKILL.md`) once, for the whole run.
2. **Collect** the conventions: declared ones first, observed ones second, as below. With a path, everything (search, counts, history, scope of each check, exemptions) stays inside it.
3. **Write a convention card** (step 1) for each convention kept, with the breaking snippet taken from a real violation found while collecting.
4. **Choose the mechanism** (step 3) for all of them, without asking yet.
5. **Ask once** (below).
6. **Build, prove and record** (steps 4 to 6) each convention, one at a time.
7. **Hand over** (step 7) with one report for the whole run.

## Declared conventions

Sort every statement of the documents into one of four piles:

| Pile | Meaning | Next |
|---|---|---|
| Checkable | A complete and precise check exists for it | Keep |
| Needs judgment | A person must decide ("names reveal intent") | Leave as prose |
| Already checked | A working check covers it | Add the `Checked by:` line to its doc if missing |
| In conflict | Two statements settle the same question differently | Becomes a question |

The team already decided the checkable ones. They need no vote.

## Observed conventions

Look for jobs the code does in two or more ways, typically a way the team is leaving and a way it is moving to. Compare the oldest areas of the code with the newest: layout, imports, boundaries, data access, error handling, absent values, components, data fetching, styles, test setup, test data, doubles. Words like `legacy`, `old`, `v2` or deprecation markers are good starting points.

For each way of doing a job, gather:

- a pattern that finds it (an import, a regex, a syntax shape),
- how many files use it,
- when those files first appeared, per year or per quarter in a young project, following renames so a big move does not look like new code. With no usable history, the trend is unknown,
- one file that shows it done well,
- what the documents say about it, if anything.

Which way is current: what the team declared beats where new code is going, which beats how much code exists. Size never chooses; it only tells you how long the exemption list will be. A way used by few files can still be the current one if the newest files use it.

| Finding | Situation | Proposal |
|---|---|---|
| Stale | The team or the trend points to one way, and the other stopped appearing | Enforce the current way |
| Drift | Recent files leave the way the team declared and the rest of the code follows | Enforce the established way |
| Disputed | What the team declared and the trend disagree | Recommend the declared way, offer the other |
| Open | Nothing declared and every way still grows | Enforce nothing. Report it |

Drop a job when there is a single way, or when no pattern can tell the ways apart, with one line saying so.

## Ask once

After choosing mechanisms, send a single message with only what the project cannot answer:

- each dependency a mechanism needs,
- each pair of declared statements in conflict,
- each disputed finding, and each stale or drift finding with thin evidence,
- whether to commit each convention as soon as it is done. Many conventions often touch the same configuration file, and splitting them into separate commits afterwards is rarely possible.

For each item give the options, the evidence (counts, trend, an example file) and your recommendation. Conventions that depend on no answer go ahead without waiting. After the answer, ask nothing more until the report: a declined item is skipped, and a declined dependency moves its convention to a lower rung.

## Big runs

When there are dozens of conventions, land first what every check will share: where checks are tested, how exemptions are stored and the test that keeps exemption lists shrinking. Then split the remaining work by area among subagents, each owning distinct configuration and exemption files.

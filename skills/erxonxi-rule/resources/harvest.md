# Harvest mode

Turn the conventions a repository already has into checks. Two sources, in this order: what is written, then what only the code shows. Run steps 1 to 3 here, then steps 3 to 7 of `SKILL.md` for each convention you keep.

With a path, harvest only inside it: every count, every curve and every baseline covers that area alone, and so does the scope of each check.

## 1. Written conventions

Read `AGENTS.md`, `docs/`, ADRs, contributing guides and review checklists. For each statement:

- **Convertible**: a check could verify it exactly. Keep it.
- **Judgment**: it needs a person to decide ("names reveal intent"). Skip it and leave it in prose.
- **Already enforced**: a working check covers it. Skip it, and add the `Enforced by:` line to the doc if it is missing.
- **Contradicted**: two statements decide the same thing in different ways. It becomes a question for the user.

A written convention is a decision the team already made. Enforce it without asking, unless it contradicts another one.

Done when every statement in the documents you read has one of the four labels.

## 2. Conventions only the code shows

A repository has **competing patterns** when it does one job in two or more ways, usually an old way and a current way living together. The agent copies whichever it reads first, so these are worth more than any written rule.

Find them by comparing the oldest and the newest modules (git says which are which). Usual jobs: folder layout, import style, module boundaries, data access, error handling, absence of values, component style, data fetching, styling, test setup, test data, test doubles. Names such as `Legacy`, `Old`, `V2` or a deprecation tag are leads.

For each variant of each job record:

- a **signature**: the import, regex or syntax shape that finds it,
- how many files match,
- its **direction**: how many matching files were created per period, and in the last twelve months. Date files with the first commit that added them, following renames, so a mass move does not reset the dates. In a young repository use quarters. With no usable history, direction is unknown,
- a **canonical example**: a real file that does it the current way,
- what the docs say about it, if anything.

Weigh in this order:

1. **Intent**: the team said which variant is current. A deprecation tag, a `Legacy` name, a migration commit, a document.
2. **Direction**: the variant the newest files choose. A young variant with few files wins if recent code moves to it.
3. **Volume**: only sizes the baseline. It never picks the winner.

Verdicts:

| Verdict | When | Proposal |
|---|---|---|
| Remnant | Intent or direction points to one variant and the other stopped growing | The current one |
| Regression | Recent code drifts from what intent and the rest of the repository follow | The established one |
| Conflict | Intent and direction disagree | The one intent supports, the other as alternative |
| No winner | No intent and every variant still grows | Nothing. Report it |

A job with a single variant, or whose variants no signature separates, is out of scope.

Done when every job found has its variants recorded, a verdict and a one-line reason, and every discarded job has a one-line reason too.

## 3. Ask once

Three things need the user, and only these:

- a dependency to install,
- two written statements that contradict each other,
- a mined job with a conflict, or a remnant or regression whose evidence is thin.

Put them all in one message. For each: the job or statement, the options with their evidence (counts, direction, canonical example), and your recommendation. Conventions that need no answer do not wait: enforce them first, then ask.

After the answer, do not ask again until the report. A declined item is skipped. A declined dependency sends its convention one rung down.

## Large repositories

With dozens of conventions, build the shared pieces first in one change: where check tests live, the baseline mechanism and the check that keeps it shrinking. Then split the work by area (backend, frontend, tests) into subagents, each owning its own configuration file, rule files and baselines, so no two of them edit the same file.

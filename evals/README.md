# Evals

Cases that check whether the skills change what an agent does. They run with `claude plugin eval`, which loads this plugin, runs each prompt in a sandbox and scores the run with graders. Most cases also run without the plugin, so the score that matters is the **difference** between the two arms, not the raw pass rate.

```bash
evals/run.sh trigger      # one layer
evals/run.sh all          # everything (see the costs below)
evals/run.sh knowledge --case 'knowledge-cross-*' --runs 1
evals/run.sh code --json /tmp/code.json && evals/score.py /tmp/code.json
```

Results land in `evals/results/<timestamp>/` (ignored by git), with an HTML report.

## Layers

| Layer | Cases | What it answers | Graders | Arms |
|---|---|---|---|---|
| Trigger | `trigger-*` | Does the right skill load for a request, and stay quiet when it should? Includes Spanish phrasings, confusable pairs (plan vs roadmap, testing vs evaluate, rule vs workflow) and negatives. | `tool_used: Skill` | With plugin only |
| Knowledge | `knowledge-*` | Does the answer follow these skills' defaults where they differ from generic advice? | `llm` rubric | With and without |
| Plan | `plan-*` | Does planning produce vertical phases with contracts, ask once with recommendations, and save only after approval? | `llm`, `file_exists`, `regex` | With and without |
| Repo | `repo-*` | On synthetic repositories (a shop MVP and a CRM): does `erxonxi-rule` add a proven check with an exemption list, and in harvest mode find the drift from written conventions? Does `erxonxi-evaluate` find planted contract mismatches (and invent none on a correct phase), does `erxonxi-implement-phase` do one phase and stop, resume a half-done phase without starting the next, and stop when a contract cannot hold? Does `erxonxi-plan` plan a cross-context feature with the repository's real names? | `file_exists`, `regex`, `tool_used`, `llm` | With and without |
| Code | `code-*` | Does the code the agent writes follow the skills where the repository offers a bad neighbour to copy (a fat `DealService`) or no precedent at all (the first event subscriber), and does it leave a one-off script alone? | `file_exists`, `regex`, `tool_used` (no judge) | With and without |

Knowledge cases and most plan cases need no repository: the prompt describes the code. That makes them cheap and stable. Two plan cases scaffold the shop: one where the repository stores plans as numbered RFCs (the plugin must follow the house style, not impose `.agents/plans/`) and one that breaks a large epic down into a file.

Repo cases build their workspace with a scaffold script from `fixtures/`, so they need `--scaffold`, which `run.sh` passes:

- `acme-shop`: a shop MVP in plain Node with `node --test` (catalog, shop with cart and checkout, notifications, an HTTP entry point), plus a restock-alerts plan and a flawed phase 1 to evaluate.
- `acme-crm`: a CRM (contacts, sales with a deal pipeline, activities) with written conventions marked `Not checked` and three planted drifts listed in `fixtures/acme-crm.PLANTED.md`, which the agent never sees.
- Restock-alerts states on top of the shop: a correct phase 1 (`restock-phase1-done`), a phase 2 already started (`restock-phase2-started`), and plans for each case (`restock-alerts-plan*.md`). `acme::add_plan <file>` and `acme::add_code <dir>` in `fixtures/acme.sh` combine them.
- `orders-script`: a CSV and a bare `package.json`, for the one-off script case.

The sandbox shapes these cases. The agent's shell is read-only and `git` is blocked: files change only through Write and Edit, and every repo prompt says so. The scaffold commits a baseline, but the agent cannot run `git diff` or `git commit`; the `no-commit` graders still catch an attempt. Repo cases grant unscoped Bash, because scoped prefixes deny compound commands and the agent then stops verifying.

## Writing a case

- One directory per case: `prompt.md` (frontmatter + prompt) or `case.yaml` when it needs a scaffold, plus `graders/*.md`.
- **Knowledge**: ask about a decision where these skills hold a specific default (named errors over null, use cases called directly before any bus, client-generated ids, a lint check over an AGENTS.md sentence). A question any good model answers the same way without the skills measures nothing: if both arms pass, sharpen the question or drop it.
- Every knowledge case has an `expected-skill-loaded` indicator (the skill the question belongs to fired). It is not scored; it tells "the skill loaded and the answer was still wrong" apart from "the skill never loaded". A pass without the skill loading can still come from the skill descriptions, which every with-plugin run sees.
- Rubrics are numbered claims a judge can check one by one. Put them in the grader body. Judge with a stronger model than the agent (`run.sh` uses opus over sonnet).
- Negative graders (`max: 0`, `exists: false`, `match: not_contains`) check what must not happen: committing, writing code while planning, editing the exempt file.
- A grader whose name starts with `guard-` is a guard: it passes in both arms almost always, so it carries no signal, but if it fails the run is worth nothing. `score.py` scores such a run 0 and leaves guards out of the mean otherwise.
- Runner facts that shape graders: `regex` takes `match: contains | not_contains | count:N` and JavaScript `flags`; `{source: file, path}` takes a literal path, not a glob, and fails when the file does not exist; `target: files` and `file_exists` see only files created during the run, not edited ones. For the content of a file whose name the agent chooses, use `tool_used` on `Write` with an `input_match` over `"file_path"` and `"content"`. `tool_used` defaults `min` to 1, so a "never called" grader needs `min: 0` next to `max: 0`. A frontmatter value cannot contain `---` (write `-{3}`). `arm: with-only` turns a grader into an unscored indicator. There is no script grader.
- Tag each case with the goals it measures (`goal-1` to `goal-6`, below) and with `harm` when the plugin must not make things worse.
- The subagent tool is granted as `Task` in `allowed_tools`, but its calls appear in the trace as `Agent`: a `tool_used` grader for a reviewer uses `tool: Agent`.
- A grader must be passable with the case's `allowed_tools`; the runner warns when it is not.
- Keep `runs` at 2 while writing a case, raise it when calibrating a change that matters.

## Scoring by goal

`score.py` reads one or more `--json` results and prints, per case and per goal, the mean score with and without the plugin and the delta. There is no single total: a mean would hide the goal that got worse.

| Goal | What it asks |
|---|---|
| `goal-1` | Code follows the philosophy (layers, ports, events between contexts, conventions kept by checks) |
| `goal-2` | Code decisions: names, where a rule lives, ids, no default parameters, a use case per action |
| `goal-3` | A new module or a first-of-its-kind piece, placed and wired like the rest |
| `goal-4` | Iteration: one phase, stop, resume where the plan says, ask when a contract cannot hold, evaluate honestly |
| `goal-5` | Lean plans: decided once, no estimates in hours or points, saved where the repository saves them |
| `goal-6` | Vertical slices that can be checked end to end |

Cases tagged `harm` are reported apart. Any harm case where the plugin scores below the baseline is a regression, whatever the deltas say, and `score.py` exits with 1.

To save money after a change, keep the last full run's JSON as the baseline and re-run only the plugin arm of the cases that matter: `evals/run.sh code --ablation none --json new.json`, then `evals/score.py new.json --baseline full.json`.

## Calibrating

After changing a skill, run its layer and read the delta per case. A case with delta 0 in several runs is either already solved by the base model (drop it or make it sharper) or not reaching the skill (check the trigger layer first). A case that fails in both arms usually has a wrong rubric: read the trace in the report before touching the skill.

## Costs

Measured on sonnet with an opus judge (2026-11-23), per run including the judge: trigger about $0.05, knowledge about $0.08, plan about $0.13, repo $0.15 to $0.50, except the two rule cases at $1 to $2, because their judge reads the whole trace. Code cases have no judge and cost what the agent costs. A full pass with 2 runs per arm costs around $30. `--max-cost-usd` caps a run.

## Running inside the Claude desktop app

The app sets `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` for its own child processes, and the eval child then fails with "Invalid API key". `run.sh` unsets them; from a normal terminal it makes no difference.

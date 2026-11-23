# Evals

Cases that check whether the skills change what an agent does. They run with `claude plugin eval`, which loads this plugin, runs each prompt in a sandbox and scores the run with graders. Most cases also run without the plugin, so the score that matters is the **difference** between the two arms, not the raw pass rate.

```bash
evals/run.sh trigger      # one layer
evals/run.sh all          # everything (see the costs below)
evals/run.sh knowledge --case 'knowledge-cross-*' --runs 1
```

Results land in `evals/results/<timestamp>/` (ignored by git), with an HTML report.

## Layers

| Layer | Cases | What it answers | Graders | Arms |
|---|---|---|---|---|
| Trigger | `trigger-*` | Does the right skill load for a request, and stay quiet when it should? Includes Spanish phrasings, confusable pairs (plan vs roadmap, testing vs evaluate, rule vs workflow) and negatives. | `tool_used: Skill` | With plugin only |
| Knowledge | `knowledge-*` | Does the answer follow these skills' defaults where they differ from generic advice? | `llm` rubric | With and without |
| Plan | `plan-*` | Does planning produce vertical phases with contracts, ask once with recommendations, and save only after approval? | `llm`, `file_exists`, `regex` | With and without |
| Repo | `repo-*` | On synthetic repositories (a shop MVP and a CRM): does `erxonxi-rule` add a proven check with an exemption list, and in harvest mode find the drift from written conventions? Does `erxonxi-evaluate` find planted contract mismatches, `erxonxi-implement-phase` do one phase and stop, and `erxonxi-plan` plan a cross-context feature with the repository's real names? | `file_exists`, `regex`, `tool_used`, `llm` | With and without |

Knowledge and plan cases need no repository: the prompt describes the code. That makes them cheap and stable.

Repo cases build their workspace with a scaffold script from `fixtures/`, so they need `--scaffold`, which `run.sh` passes:

- `acme-shop`: a shop MVP in plain Node with `node --test` (catalog, shop with cart and checkout, notifications, an HTTP entry point), plus a restock-alerts plan and a flawed phase 1 to evaluate.
- `acme-crm`: a CRM (contacts, sales with a deal pipeline, activities) with written conventions marked `Not checked` and three planted drifts listed in `fixtures/acme-crm.PLANTED.md`, which the agent never sees.

The sandbox shapes these cases. The agent's shell is read-only and `git` is blocked: files change only through Write and Edit, and every repo prompt says so. The scaffold commits a baseline, but the agent cannot run `git diff` or `git commit`; the `no-commit` graders still catch an attempt. Repo cases grant unscoped Bash, because scoped prefixes deny compound commands and the agent then stops verifying.

## Writing a case

- One directory per case: `prompt.md` (frontmatter + prompt) or `case.yaml` when it needs a scaffold, plus `graders/*.md`.
- **Knowledge**: ask about a decision where these skills hold a specific default (named errors over null, use cases called directly before any bus, client-generated ids, a lint check over an AGENTS.md sentence). A question any good model answers the same way without the skills measures nothing: if both arms pass, sharpen the question or drop it.
- Every knowledge case has an `expected-skill-loaded` indicator (the skill the question belongs to fired). It is not scored; it tells "the skill loaded and the answer was still wrong" apart from "the skill never loaded". A pass without the skill loading can still come from the skill descriptions, which every with-plugin run sees.
- Rubrics are numbered claims a judge can check one by one. Put them in the grader body. Judge with a stronger model than the agent (`run.sh` uses opus over sonnet).
- Negative graders (`max: 0`, `exists: false`) guard what must not happen: committing, writing code while planning, editing the exempt file.
- A grader must be passable with the case's `allowed_tools`; the runner warns when it is not.
- Keep `runs` at 2 while writing a case, raise it when calibrating a change that matters.

## Calibrating

After changing a skill, run its layer and read the delta per case. A case with delta 0 in several runs is either already solved by the base model (drop it or make it sharper) or not reaching the skill (check the trigger layer first). A case that fails in both arms usually has a wrong rubric: read the trace in the report before touching the skill.

## Costs

Measured on sonnet with an opus judge (2026-11-23), per run including the judge: trigger about $0.05, knowledge about $0.08, plan about $0.13, repo $0.15 to $0.30, except the two rule cases at $1 to $2, because their judge reads the whole trace. A full pass with 2 runs per arm costs around $30. `--max-cost-usd` caps a run.

## Running inside the Claude desktop app

The app sets `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` for its own child processes, and the eval child then fails with "Invalid API key". `run.sh` unsets them; from a normal terminal it makes no difference.

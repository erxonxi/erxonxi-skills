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
| Repo | `repo-*` | On a small synthetic repository: does `erxonxi-rule` add a proven check with an exemption list, does `erxonxi-evaluate` find planted contract mismatches, does `erxonxi-implement-phase` do one phase and stop? | `file_exists`, `regex`, `tool_used`, `llm` | With and without |

Knowledge and plan cases need no repository: the prompt describes the code. That makes them cheap and stable. Repo cases build their workspace with a scaffold script from `fixtures/` (an `acme-shop` backend in plain Node with `node --test`, a plan file and a flawed phase), so they need `--scaffold` and scoped Bash grants, which `run.sh` passes. Repo cases grant unscoped Bash: with scoped prefixes, compound commands and heredocs are denied and the agent stops verifying. The sandbox blocks `git` for the agent: the scaffold commits a baseline, but the agent cannot run `git diff` or `git commit`. The `no-commit` graders still catch an attempt, and the evaluate case is built so the planted mismatches show up by reading the files against the plan.

## Writing a case

- One directory per case: `prompt.md` (frontmatter + prompt) or `case.yaml` when it needs a scaffold, plus `graders/*.md`.
- **Knowledge**: ask about a decision where these skills hold a specific default (named errors over null, use cases called directly before any bus, client-generated ids, a lint check over an AGENTS.md sentence). A question any good model answers the same way without the skills measures nothing: if both arms pass, sharpen the question or drop it.
- Every knowledge case has a `skill-loaded` indicator (any `erxonxi-*` skill fired). It is not scored; it tells "the skill loaded and the answer was still wrong" apart from "the skill never loaded".
- Rubrics are numbered claims a judge can check one by one. Put them in the grader body. Judge with a stronger model than the agent (`run.sh` uses opus over sonnet).
- Negative graders (`max: 0`, `exists: false`) guard what must not happen: committing, writing code while planning, editing the exempt file.
- A grader must be passable with the case's `allowed_tools`; the runner warns when it is not.
- Keep `runs` at 2 while writing a case, raise it when calibrating a change that matters.

## Calibrating

After changing a skill, run its layer and read the delta per case. A case with delta 0 in several runs is either already solved by the base model (drop it or make it sharper) or not reaching the skill (check the trigger layer first). A case that fails in both arms usually has a wrong rubric: read the trace in the report before touching the skill.

## Costs

Measured on sonnet with an opus judge (2026-11-23), per run: trigger about $0.05, knowledge about $0.08, plan about $0.13, repo about $0.30 to $0.55. A full pass of the suite costs around $15. `--max-cost-usd` caps a run.

## Running inside the Claude desktop app

The app sets `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` for its own child processes, and the eval child then fails with "Invalid API key". `run.sh` unsets them; from a normal terminal it makes no difference.

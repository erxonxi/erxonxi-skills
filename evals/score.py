#!/usr/bin/env python3
"""Score eval results by goal.

Usage: evals/score.py RESULT.json [RESULT.json ...] [--baseline BASELINE.json ...]

Reads the --json output of `claude plugin eval`. Per run, a grader whose name starts
with `guard-` that fails sets the run's score to 0; otherwise the score is the weighted
mean of the scored graders that are not guards. Per case it prints the mean with and
without the plugin and the delta; per goal (tags goal-1..goal-6) the mean of its cases.
Cases tagged `harm` are counted apart: any harm case where the plugin arm scores below
the baseline arm is a regression, whatever the deltas say.

With --baseline, the "without" arm comes from those files instead (a stored baseline),
so a change only needs the with-plugin arm re-run.
"""
import json
import re
import sys
from pathlib import Path

EVALS = Path(__file__).resolve().parent
GOALS = {
    "goal-1": "philosophy when coding",
    "goal-2": "code decisions",
    "goal-3": "new module",
    "goal-4": "iteration",
    "goal-5": "lean plan",
    "goal-6": "vertical e2e slices",
}


def tags_of(case):
    for name in ("case.yaml", "prompt.md"):
        path = EVALS / case / name
        if path.exists():
            match = re.search(r"^tags:\s*\[([^\]]*)\]", path.read_text(), re.M)
            return [t.strip() for t in match.group(1).split(",")] if match else []
    return []


def run_score(run):
    graders = [g for g in run.get("graders", []) if g.get("scored", True)]
    if any(g["name"].startswith("guard-") and not g["passed"] for g in graders):
        return 0.0, True
    scored = [g for g in graders if not g["name"].startswith("guard-")]
    total = sum(g["weight"] for g in scored)
    if not total:
        return run.get("score", 0.0), False
    return sum(g["weight"] for g in scored if g["passed"]) / total, False


def load(paths):
    arms = {}
    for path in paths:
        for case in json.loads(Path(path).read_text())["cases"]:
            for arm, runs in case.get("arms", {}).items():
                arms.setdefault(case["name"], {}).setdefault(arm, []).extend(runs)
    return arms


def mean(values):
    return sum(values) / len(values) if values else None


def fmt(value):
    return "  -  " if value is None else f"{value:5.2f}"


def main(argv):
    if "--baseline" in argv:
        i = argv.index("--baseline")
        results, baselines = argv[:i], argv[i + 1:]
    else:
        results, baselines = argv, []
    if not results:
        sys.exit(__doc__)
    arms = load(results)
    base = load(baselines) if baselines else None

    rows = {}
    for case, by_arm in sorted(arms.items()):
        scored = {arm: [run_score(r) for r in runs] for arm, runs in by_arm.items()}
        without = scored.get("without", [])
        if base is not None:
            without = [run_score(r) for r in base.get(case, {}).get("without", [])]
        with_ = scored.get("with", [])
        rows[case] = {
            "with": mean([s for s, _ in with_]),
            "without": mean([s for s, _ in without]),
            "guards": sum(g for _, g in with_ + without),
            "runs": f"{len(with_)}/{len(without)}",
            "tags": tags_of(case),
        }

    print(f"{'case':40} {'with':>5} {'w/o':>5} {'delta':>6}  runs  guard-fails")
    for case, r in rows.items():
        delta = None if r["with"] is None or r["without"] is None else r["with"] - r["without"]
        print(f"{case:40} {fmt(r['with'])} {fmt(r['without'])} {fmt(delta):>6}  {r['runs']:>4}  {r['guards']}")

    print(f"\n{'goal':28} {'with':>5} {'w/o':>5} {'delta':>6}  cases")
    for goal, label in GOALS.items():
        cases = [r for r in rows.values() if goal in r["tags"] and "harm" not in r["tags"]]
        w = mean([r["with"] for r in cases if r["with"] is not None])
        wo = mean([r["without"] for r in cases if r["without"] is not None])
        delta = None if w is None or wo is None else w - wo
        print(f"{goal + ' ' + label:28} {fmt(w)} {fmt(wo)} {fmt(delta):>6}  {len(cases)}")

    harm = {c: r for c, r in rows.items() if "harm" in r["tags"]}
    regressions = [c for c, r in harm.items() if None not in (r["with"], r["without"]) and r["with"] < r["without"]]
    print(f"\nharm: {len(regressions)} regression(s) in {len(harm)} harm case(s)" + (": " + ", ".join(regressions) if regressions else ""))
    sys.exit(1 if regressions else 0)


if __name__ == "__main__":
    main(sys.argv[1:])

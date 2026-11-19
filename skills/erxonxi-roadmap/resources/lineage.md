# Where the rules come from

Background for `erxonxi-roadmap`. Read it to explain a rule to someone who pushes back, or to adapt a rule when a project needs something else. It is not needed to apply the skill.

## Agile

### The manifesto (Snowbird, February 2001)

Seventeen practitioners of the lightweight methods of the time (XP, Scrum, DSDM, Crystal, FDD, Adaptive Software Development, Pragmatic Programming) agreed on four preferences:

- People and their interactions over processes and tools.
- Working software over exhaustive documentation.
- Collaboration with the customer over contract negotiation.
- Responding to change over following a plan.

The right side has value. The left side has more.

The twelve principles, paraphrased, and what each one asks of a plan:

| # | Principle | In this skill |
|---|---|---|
| 1 | Satisfy the customer with early and continuous delivery of valuable software | MVP first, then slices that ship alone |
| 2 | Welcome changing requirements, even late | The plan is a hypothesis. Re-plan every wave |
| 3 | Deliver working software often, the shorter the interval the better | Slices of one to three days |
| 4 | Business people and developers work together daily | Whoever decides and whoever builds share one page |
| 5 | Build around motivated people and trust them | Process is chosen, not imposed |
| 6 | Face-to-face conversation is the most efficient way to share information | A ticket is a reminder of a conversation, not a contract |
| 7 | Working software is the primary measure of progress | Done means in production with its signal |
| 8 | A pace that can be sustained indefinitely | Work in progress limited by review capacity |
| 9 | Continuous attention to technical excellence and good design | Scope is cut, quality is not |
| 10 | Simplicity, the art of maximizing the work not done | Every item names its outcome or is deleted |
| 11 | The best designs emerge from self-organizing teams | Rule zero: the team's habits win |
| 12 | The team reflects at regular intervals and adjusts | Measure and decide, then re-cut the roadmap |

Extreme Programming (Kent Beck, Ron Jeffries, late 1990s) supplied most of the planning practices that still hold: small releases, user stories, simple design, continuous integration, spikes, and YAGNI ("you aren't gonna need it").

### What became of it

| When | Who | Idea | What this skill keeps |
|---|---|---|---|
| 2009 | Martin Fowler, "Flaccid Scrum" | Adopting the management practices without the technical ones rots the codebase | Tests and the signal are never cut to fit scope |
| 2010 | Jez Humble and David Farley, *Continuous Delivery* | Software is always releasable. Deploying is a non-event | Deploy is not release. Small merges to one trunk |
| 2012 | Woody Zuill and others, #NoEstimates | Make stories small and count the finished ones instead of estimating | Right-size, then forecast from throughput |
| 2014 | Dave Thomas, "Agile is Dead (Long Live Agility)" | The noun became a product. Agility is a small step, a look at what happened, an adjustment, and again | The loop |
| Mid-2010s | Alistair Cockburn (Heart of Agile), Joshua Kerievsky (Modern Agile) | Agile reduced to a few verbs: collaborate, deliver, reflect, improve; experiment and learn rapidly, deliver value continuously | A short stance instead of a method |
| 2018 | Ron Jeffries, "Developers Should Abandon Agile"; Fowler, "The State of Agile Software in 2018" | Process imposed from above ("faux agile", the "agile industrial complex") contradicts the manifesto | No ceremony, field or state is imposed |
| 2018 | Forsgren, Humble and Kim, *Accelerate* | Small batches and fast flow go together with stability | Delivery health metrics |
| 2019 | Ryan Singer, *Shape Up* | Appetite instead of estimates, fixed time and variable scope, bets instead of backlogs | Appetite. Later is not a backlog |
| 2008 to 2021 | Marty Cagan, Teresa Torres | Outcomes over output. Continuous discovery, opportunities before solutions | A bet is an outcome with a number |
| 2025 | Practitioners using coding agents, for example Simon Willison | Writing code got cheaper. Review and integration are now the constraint | Parallel work is capped by review capacity |

## Lean

| When | Who | Idea | What this skill keeps |
|---|---|---|---|
| 1950s to 1970s | Taiichi Ohno, Toyota Production System | Just-in-time and pull, stop the line on a defect, waste as the enemy | Pull work when there is capacity. Finish before starting |
| 1984 | Eliyahu Goldratt, *The Goal* | Throughput is set by the constraint. Improving anything else is an illusion | Review is the bottleneck. Shorten the longest chain |
| 1996 | Womack and Jones, *Lean Thinking* | Value, value stream, flow, pull, perfection | Start from the outcome and remove what does not serve it |
| 2003, revised 2006 | Mary and Tom Poppendieck, *Lean Software Development* | Eliminate waste, build quality in, create knowledge, defer commitment, deliver fast, respect people, optimize the whole | Decide late what is reversible. Wastes below |
| 2009 | Donald Reinertsen, *The Principles of Product Development Flow* | Cost of delay. Queues and large batches are the hidden cost. Limit work in progress | Small batches. Order by what costs most to delay for its size |
| 2010 | David J. Anderson, *Kanban* | Visualize, limit work in progress, manage flow, make policies explicit | The Kanban motto: stop starting, start finishing |
| 2011 | Eric Ries, *The Lean Startup*, after Steve Blank's customer development | Build, measure, learn. Validated learning. The MVP (a term coined by Frank Robinson in 2001). Pivot or persevere. Actionable metrics over vanity metrics | Hypothesis, threshold and decision before building |
| 2015 | Daniel Vacanti, *Actionable Agile Metrics for Predictability* | Work in progress, cycle time, throughput, work item age. Forecast from history | Flow metrics. Ranges instead of dates |
| 2016 | Henrik Kniberg, "Making sense of MVP"; Rik Higham, the riskiest assumption test | Earliest testable, usable, lovable. Test the biggest unknown with the least build | The MVP selection rule |

Little's law ties the flow metrics together: average work in progress equals throughput times average cycle time. With the same throughput, more in progress means everything takes longer.

"Defer commitment", also known as the last responsible moment, is often misread as postponing indefinitely. It means keeping an option open until a known fact arrives, and deciding then.

### The seven wastes, in a plan

| Waste | In a roadmap or a backlog | Countermeasure |
|---|---|---|
| Partially done work | Many items in progress, long-lived branches | Limit work in progress. Finish first |
| Extra features | Speculative items, "while we are at it" | Ask which outcome it serves. Delete |
| Relearning | The same decision argued again | Write the decision next to the bet, in one line |
| Handoffs | Items that travel design, then build, then QA, then ops | Vertical slices that one owner takes to production |
| Task switching | Several bets per person | One to three bets in Now |
| Delays | Tickets ageing in review or waiting for an answer | Watch work item age. Ask today |
| Defects | Rework, a bug backlog | Quality inside the slice. Stop and fix |

## What was dropped, and who says so

- **Story points as commitments and velocity as a performance metric.** Jeffries, who helped popularize points, regrets how they are used. Allen Holub proposes counting finished stories.
- **Imposed process and scaling frameworks.** Fowler and Jeffries, 2018.
- **Large groomed backlogs.** *Shape Up*: a backlog only grows, and the time spent reviewing it moves nothing forward.
- **Roadmaps of features with dates.** Janna Bastow's Now, Next, Later.
- **Scoring formulas fed with guesses.** Joshua Arnold's critique of the additive WSJF formula: adding value to urgency gives a score to work that has no value.
- **MVP as a bad first version.** Kniberg: the point is early learning, not low quality.
- **Metrics as targets.** Goodhart's law, in Marilyn Strathern's wording: a measure that becomes a target stops being a good measure.

## Delivery metrics as currently defined

DORA (dora.dev, guide last updated in January 2026) groups five metrics in two factors:

- **Throughput**: change lead time (from commit to deployed), deployment frequency, failed deployment recovery time.
- **Instability**: change fail rate, deployment rework rate.

## Splitting and unblocking: the originals

- Splitting patterns: Richard Lawrence ("Patterns for Splitting User Stories"), Mike Cohn (SPIDR: spike, paths, interfaces, data, rules), Gojko Adzic (the hamburger method), Bill Wake (INVEST).
- Walking skeleton and elephant carpaccio: Alistair Cockburn. Tracer bullets: Hunt and Thomas, *The Pragmatic Programmer*. Story mapping: Jeff Patton.
- Feature toggles (Pete Hodgson), parallel change or expand and contract (Danilo Sato), branch by abstraction (Paul Hammant), strangler fig (Martin Fowler), consumer-driven contracts (Ian Robinson): all on martinfowler.com.
- Limits of parallel work: Amdahl's law (the serial part caps the speed-up) and Brooks's law (adding people to a late project makes it later).

## Sources

- https://agilemanifesto.org/ · https://agilemanifesto.org/principles.html · https://agilemanifesto.org/history.html
- https://martinfowler.com/bliki/FlaccidScrum.html · https://www.martinfowler.com/articles/agile-aus-2018.html
- https://articles.pragdave.me/p/2014-03-04-time-to-kill-agilehtml
- https://ronjeffries.com/articles/018-01ff/abandon-1/
- https://heartofagile.com/ · https://modernagile.org/
- https://holub.com/noestimates/
- https://basecamp.com/shapeup
- https://www.producttalk.org/opportunity-solution-tree/
- https://www.lean.org/lexicon-terms/toyota-production-system/
- https://kanbanguides.org/
- https://blackswanfarming.com/cost-of-delay-divided-by-duration/
- https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp
- https://hackernoon.com/the-mvp-is-dead-long-live-the-rat-233d5d16ab02
- https://dora.dev/guides/dora-metrics/
- https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories/
- https://www.mountaingoatsoftware.com/blog/five-simple-but-powerful-ways-to-split-user-stories
- https://gojko.net/2012/01/23/splitting-user-stories-the-hamburger-method/
- https://www.jpattonassociates.com/user-story-mapping/
- https://alistaircockburn.com/Elephant-Carpaccio
- https://martinfowler.com/articles/feature-toggles.html · https://martinfowler.com/bliki/ParallelChange.html · https://martinfowler.com/bliki/BranchByAbstraction.html · https://martinfowler.com/bliki/StranglerFigApplication.html · https://martinfowler.com/articles/consumerDrivenContracts.html
- https://simonwillison.net/2025/Oct/5/parallel-coding-agents/

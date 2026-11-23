# Engineering philosophy

How I design, model, name, structure and test code, written to hold in any language and to be handed to coding agents.

The operational detail lives in the twelve skills under `skills/`. This document explains the why and the whole.

## 1. The central idea

Code is organized around the business, not the technology. The business rules live in a core that knows nothing about frameworks, databases or protocols, and everything else is a replaceable detail that plugs into that core through small contracts. Each piece has a name that says what it does and a single place to live, so the folder structure reads as the index of the business.

On top of that base there is a second idea just as strong: complexity is earned. Start with the simplest thing that works and climb one rung only when the previous one hurts and the pain has been measured.

## 2. The principles

### 1. The business drives the structure

A file's path says first which business area it belongs to (`shop`, `catalog`, `notifications`), then which concept (`users`, `products`) and only at the end which technical role it plays (`domain`, `application`, `infrastructure`). A module is named after its aggregate, in plural. One folder per use case.

Why: whoever arrives at the project understands what the system does before knowing what it is made of, and a business change touches one place.

### 2. Dependencies point inward

`infrastructure → application → domain`. The domain imports nothing technical. The application orchestrates without knowing about HTTP or SQL. The infrastructure implements the ports the domain declares.

Why: the rules can be tested without starting anything, and switching database or framework does not touch the business. And discipline is not trusted: the rule is checked with import lint, architecture tests or the build graph.

### 3. One use case, one class, one agent name

`UserRegistrar`, `ProductFinder`, `ProductsSearcher`, `WelcomeEmailSender`. One class, one public method, its ports via constructor, primitives in and primitives or a DTO out. Controllers are thin: they parse, call, serialize and translate errors.

Why: the folder listing of `application` is the catalog of what the system can do. Names like `Manager`, `Helper` or `Service` say nothing and end up accumulating everything.

### 4. Objects protect themselves

An invalid value object cannot be constructed. An aggregate has a private constructor, is created with a named constructor (`create`) that records the fact, is rebuilt with `fromPrimitives` and serialized with `toPrimitives`. There are no setters: state changes with business verbs (`rename`, `archive`, `publish`).

Each rule lives in a single place, as deep inside as possible: value object, then aggregate, then domain service, then use case.

Why: if a rule can be bypassed by constructing the object another way, it is not a rule.

### 5. Business facts are events

What happens is named in past tense and with business vocabulary (`UserRegisteredDomainEvent`, message `acme.shop.user.registered`). The aggregate records the event, the use case publishes it after saving, and each reaction is a subscriber with its own name (`SendWelcomeEmailOnUserRegistered`) that delegates to another use case.

Why: the main use case does not know its side effects, adding a reaction is adding a class, and contexts learn what happens without coupling to each other. The price is accepted explicitly: at-least-once delivery, no guaranteed order, idempotent consumers and eventual consistency.

### 6. Errors have names

One class per business condition (`UserDoesNotExistError`), with structured data. No generic errors, codes, `null` as failure or decisions based on the message text. They are thrown in the domain and translated to protocol only at the edge, with an exhaustive mapping. The error name is part of the API's public contract.

Why: propagating `Result`/`Either` through every layer costs more than it brings in most languages. What is valuable in that alternative is kept: exhaustiveness in the edge mapping. In languages whose idiom is error values, they are used with the same naming criteria.

### 7. Contexts do not touch each other's insides

A context never imports another's domain or infrastructure. They collaborate through events, or through a port that the consumer declares with the shape it needs and that is adapted to a public use case of the provider. Each context has its own view of a foreign concept and copies the data it needs to remember at the moment of the fact. The shared kernel is tiny and contains no rules.

Why: it is what allows a context to change, be extracted or be rewritten without dragging the others along. For that same reason duplication between contexts is accepted: two identical pieces that represent different concepts will change for different reasons.

### 8. Test the behavior, once, at the lowest level

- Unit: a use case through its public API, with the real domain and its ports substituted.
- Integration: each adapter against the real technology.
- Acceptance: an endpoint or a flow with the application wired.

All data comes from Object Mothers. Doubles are implementations of our own ports with intent vocabulary (`shouldSave`, `shouldPublish`). Tests are named as sentences (`UserRegistrar should` / `register a valid user`). Time, ids and randomness are controllable ports.

Why: tests that survive refactors because they assert results at the boundaries and not internal details. Do not mock what is not yours, do not test the same thing at three levels and do not chase a coverage percentage.

### 9. Simple design before clever design

The four rules in order: it passes the tests, it reveals intent, it does not duplicate the same concept, it has the fewest elements. In practice: guard clauses and early return, no boolean flags, no default parameters, tell don't ask, classes closed and immutable by default, composition over inheritance, comments only for the why.

And real YAGNI: no interface for every class, no factory for one case, no pattern without the force that justifies it. An interface is earned by crossing an input/output boundary or by having a real variation.

### 10. Complexity is climbed like a ladder

Almost all infrastructure decisions have the shape of a ladder, and the rule is not to skip rungs:

| Topic | Rungs |
|---|---|
| Event bus | in memory → the database as a bus → broker |
| Read model | join → view → materialized view → projection by events |
| Transaction | repository → use case decorator → entry point / `UnitOfWork` |
| Cache | HTTP cache → decorator over a port |
| Organization | module → context → service |
| Frontend | by feature → hexagonal core only where there are rules |
| Agent memory | `AGENTS.md` → docs → skills → lint and hooks → specs |
| Product scope | test without building → MVP → iterate on data |

### 11. What is checkable is checked, not written

Formatting, dependencies between layers, default parameters, PR size, commit format: everything a machine can verify becomes a lint rule, an architecture test, a hook or a CI check, with a message that says how to fix it. Prose is left for what cannot be automated, and for the why.

A new check is an error from day one for new code. The code that already breaks it goes into an exemption list that can only shrink, so adopting a rule never waits for a migration. A check counts only after it has been seen failing on a violation and passing on the repository.

Why: an agent forgets a document, misreads it or never loads it. It cannot ignore a red build. Every correction a human has to repeat is a check that was never written.

### 12. Small, verified steps

TDD use case by use case. Refactor in minimal steps with tests green and without mixing it with behavior changes. Small PRs against a single trunk. With agents, the same at another scale: plans in vertical slices, one phase at a time, verification and a stop for human review at the end of each.

### 13. The plan follows the same rules as the code

YAGNI and KISS apply to what is built, not only to how. A plan is a hypothesis with a measurable outcome, a time budget and a rule for what happens if the number does not move. It is cut to the smallest version that can confirm or refute it, split into vertical slices that ship on their own, ordered so that what unblocks and what teaches goes first, and instrumented so that the next decision comes from data.

Why: the cheapest code is the code that was never needed, and the only way to find out is to ship something small and look at what happens. Estimates, scoring formulas, long backlogs and dated roadmaps stay out until their absence hurts.

### 14. Decide, delegate, evaluate

The human decides, the agent executes, the machine judges. Decisions are made where they are cheapest to change: on contracts and phases, before code exists. Execution between two decisions is delegated, with a brief precise enough that the result can be checked against it. Evaluation goes in order of cost: checks first, then an independent reviewer who sees the change and not the author's conclusion, then the human, who judges the result on evidence (before and after, the same input on both sides) instead of reading every line.

Why: implementation stopped being the bottleneck. Review is the serial part, so it is the part worth automating and the part worth protecting. A human who reads lines reviews a few changes a day. A human who reads evidence over green checks reviews many, and each correction becomes a check that makes the next review shorter.

## 3. How to work with agents

The above, turned into a way of working for coding agents.

- **Layered memory.** A short root `AGENTS.md` with commands, architecture in a few lines and a map of `docs/`, with the explicit order not to read all the docs at the start. Conventions in `docs/`, one short file per convention: the rule, the why and the check that enforces it. Procedures in skills. Everything checkable in types, lint, architecture tests and hooks.
- **Research, plan, implement**, with a human gate at each step. Exploration is delegated to subagents with cheap models. The plan is not written until phases and contracts are agreed.
- **The plan carries its state.** A file (or a parent issue with one child per phase) whose checkboxes say what is done, so any agent or session can resume it. The current phase is the first one with work left.
- **Delegation has a brief.** A subagent gets the contracts verbatim, the files it owns, the pattern to copy, the verification command and its limits. Its report is a claim to verify, not proof. Parallel agents only on phases of the same wave, with disjoint files.
- **Public contracts in the plan**: use case signatures, events, test suites with their cases, schema and interface texts. The what is reviewed before the how is written.
- **Specs as promise**: `SHALL`, one behavior per requirement, concrete values, only what is observable.
- **Evaluation before reading**: verification command, contracts against the diff, an independent reviewer without the author's conclusion, and evidence of the result. The description always says what was not checked.
- **The agent does not commit on its own**: it proposes messages and waits.
- **Copying the neighboring pattern** is the default way to split work: each task cites the existing code to imitate.

## 4. Default decisions

Points where several reasonable options exist and this is the chosen one. They are the first thing to change if a project asks for something else.

| Topic | Default option |
|---|---|
| Use case method name | Name of the action, or the language idiom, uniform per project |
| Command/query bus | Not by default. Event bus yes |
| `find` that finds nothing | `search` may not find, `find` throws |
| Use case input | Primitives |
| Errors | Typed exceptions, or the language's error idiom |
| Ports | Whatever the language and its injection call for |
| Ids and SQL constraints | The client generates the id. The column type is set by the project |
| Mocks | Hand-written class or generic helper, always with `should*` vocabulary |
| Isolated domain tests | Cover per use case. Extra cases only for partitions and boundaries |
| Agent commit | Do not commit unless the user asks |
| Reviewer subagent | Fresh context, the diff and the contracts, never the author's conclusion. Its findings are verified before they are reported |
| Where a plan lives | `.agents/plans/<date>-<slug>.md`, or issues when the team works in a tracker |
| Existing violations of a new check | An exemption list by file or symbol, which only shrinks |
| A correction from the user | Becomes a check. A short doc only when no check can be exact |
| Exploration subagents | With context. Blind as an optional technique |
| Where a shared event lives | In the emitting context |
| Roadmap | Now, Next, Later. No dates unless they are real and external |
| Estimates | None. Right-size the slices and forecast from throughput |
| Prioritization | By argument: what unblocks, what teaches, what costs most to delay. No scoring formula |

## 5. What is deliberately not done

- Business logic in controllers, components or SQL.
- Anemic models with setters, or ORM annotations in the domain.
- Importing another context's domain, or a shared kernel with rules.
- Generic "updated" events carrying the whole state.
- Distributed transactions or two-phase commit.
- A broker, a cache or a projection before it hurts.
- Mocking third-party libraries or domain objects.
- Browser E2E tests as the base strategy, or coverage targets.
- Interfaces, factories and patterns without real variation. Singletons.
- Hexagonal architecture in an interface without rules.
- Arguing about formatting by hand.
- Checks as warnings, checks that guess, or editing a check or its exemption list so a change passes.
- Letting an agent read all the documentation, implement several phases in a row or commit without review.
- Reporting a check, a test or a review that did not run, or evidence of a side effect instead of the change.
- Story points, velocity targets, backlogs as inventory, horizontal tickets, or shipping without a signal.

## 6. The skills

| Skill | When it is loaded |
|---|---|
| `erxonxi-architecture` | Create or reorganize a project, module, use case or endpoint. Decide where a file goes |
| `erxonxi-domain-modeling` | Design aggregates, value objects, events, errors, repositories or queries |
| `erxonxi-testing` | Write or review tests, choose level, prepare data and doubles |
| `erxonxi-clean-code` | Name things, write functions and classes, refactor, decide whether a pattern is justified |
| `erxonxi-infrastructure` | Repositories, event bus, transactions, cache, projections, schema |
| `erxonxi-frontend` | Components, state, styles, how much architecture to put in the client |
| `erxonxi-workflow` | Organize how an agent works on a project: the loop, memory layers, `AGENTS.md`, specs, commits, scaffolding |
| `erxonxi-plan` | Plan a non-trivial task: research, decisions, phases with contracts, waves |
| `erxonxi-implement-phase` | Implement, continue or resume one phase of a plan |
| `erxonxi-evaluate` | A phase or change is done: checks, contracts, independent review, evidence, commit or PR text |
| `erxonxi-rule` | After a correction, or to enforce a convention: turn it into a check with a shrinking exemption list |
| `erxonxi-roadmap` | Build or review a roadmap, split a plan into tickets, order and parallelize work, scope an MVP, decide after a release |

All of them start with the same rule: the project's existing convention wins, and the skill decides only when there is no precedent.

`AGENTS-snippet.md` contains the core in short format, to paste into an agent's global instructions file.

## 7. Caveats

- The "whys" are reasoning, not dogma. If a project has a good reason to do it another way, the project wins.
- The skills give shape, not code: always check that an implementation delivers the guarantee it names (atomicity, idempotency, invalidation).

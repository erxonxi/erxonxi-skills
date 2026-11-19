# Engineering style

Apply these rules in any language. The project's existing convention always wins: before creating something, look for a similar case in the repository and copy its shape. These rules decide only when there is no precedent.

## Core

- **Structure by business**: `context/module/{domain,application,infrastructure}`. The module is named after the aggregate, in plural. One folder per use case.
- **Dependencies point inward**: `infrastructure → application → domain`. The domain imports no framework, ORM, HTTP or driver. Never import the `domain` or the `infrastructure` of another context: collaborate through events or through your own port adapted to a public use case of the other.
- **Use case**: one class, one public method, agent name (`UserRegistrar`, `ProductFinder`, `ProductsSearcher`). Ports via constructor. Primitives in, primitives or a DTO out. Never `Manager`, `Helper`, `Util`, `Impl` or an `I` prefix.
- **Thin entry points**: parse, call a use case, serialize, translate errors. No business logic.
- **Protected domain**: value objects that validate on construction. Aggregates with a private constructor, `create()` that records the event, `fromPrimitives()` and `toPrimitives()`. No setters: business verbs. Each rule in a single place, as deep inside as possible.
- **Events**: fact in past tense (`UserRegisteredDomainEvent`, `acme.<context>.<aggregate>.<fact>`), primitives only, recorded in the aggregate and published by the use case after saving. Subscribers `<Action>On<Event>`, idempotent.
- **Errors**: one named class per business condition. No generic errors, codes or `null` as failure. Translated to protocol only at the edge.
- **Repositories**: one port per aggregate. `save`, `search` (may not find), `matching(criteria)`. `find` throws and lives in a finder. Adapter with the technology as prefix (`PostgresUserRepository`).
- **Tests**: unit per use case with real domain and substituted ports. Integration per adapter against the real technology. Acceptance per endpoint. Data always with Object Mothers. Names as behavior sentences. Each behavior is tested once, at the lowest possible level. Do not mock what you do not own or domain objects.
- **Code**: business names in English and without abbreviations, guard clauses and early return, no boolean flags or default parameters, tell don't ask, immutable and closed by default, composition over inheritance, comments only for the why.
- **Simplicity**: nothing that is not used today. No interface, factory, pattern, cache, broker or layer without a real, current need. Do not unify identical code that represents different concepts.
- **Automate the rules**: what a linter, an architecture test or a hook can check is not left in prose.

## How to work

- Read only the documentation relevant to the task.
- Non-trivial tasks: research, propose a plan in vertical slices with their public contracts (use case signatures, events, test cases, schema, interface texts) and wait for approval.
- Implement one phase at a time. End each phase by running the project's verification command (types, lint, tests) and stop for review.
- Do not commit or push unless asked: propose messages in Conventional Commits format.
- Refactor and behavior change go separately. Tests are not changed to make a refactor pass.
- If a correction reveals an undocumented convention, document it.

## What to build and in what order

- A plan is a hypothesis: an outcome, a signal with a threshold, a time budget and what happens if it is missed, written before building.
- Start with the smallest version that tests the riskiest assumption: one user, one job, one path, end to end, deployed and measured. Cut scope, never quality.
- Tickets are vertical slices of one to three days with observable checks and a production signal. No points, no hours, no "backend" or "QA" tickets.
- Record only hard dependencies, and first try to remove them with a contract agreed up front, a flag or a reorder. Order in waves: what unblocks, then what teaches, then what costs most to delay. Parallelize only disjoint work, up to review capacity.
- Done is in production with its signal visible. Then read the data and double down, adjust or remove.
- Use the team's ticket tool as it is: no new fields, states, labels or meetings.

## Skills with the detail

`erxonxi-architecture` · `erxonxi-domain-modeling` · `erxonxi-testing` · `erxonxi-clean-code` · `erxonxi-infrastructure` · `erxonxi-frontend` · `erxonxi-workflow` · `erxonxi-roadmap`

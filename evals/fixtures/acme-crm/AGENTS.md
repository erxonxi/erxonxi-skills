# acme-crm

Small B2B CRM backend. Plain JavaScript (ES modules), Node 20+, no dependencies.

## Commands

- `npm test`: run the tests (`node --test`).
- `npm run check`: the verification command, the same as CI.

## Layout

- `src/contexts/<context>/<module>/{domain,application,infrastructure}`
  - `contacts`: `companies` and `contacts` (a contact belongs to a company by id).
  - `sales`: `deals` with a pipeline open, then won or lost. A deal references a company id and keeps its own copy of the company name.
  - `activities`: calls, meetings and notes logged against a deal.
  - `shared`: `AggregateRoot`, `DomainEvent`, `DomainError`, `Uuid`, `Clock`, `EventBus` and their adapters.
  - `sales/shared` and `activities/shared` hold the ports each context owns to read from another one.
- `src/apps/api/container.js`: the composition root. Adapters are in memory.
- `tests/` mirrors `src/`. Test data comes from Object Mothers in `tests/.../domain/`. Ports are replaced by handwritten mocks (`Mock*` with `should*` setup methods).
- Plans live in `.agents/plans/`.

## Conventions

Documents in `docs/conventions/`. Read only the one that applies.

# acme-shop

Online shop backend. Plain JavaScript (ES modules), Node 20+, no dependencies.

## Commands

- `npm test`: run the tests (`node --test`).
- `npm run check`: the verification command, the same as CI.

## Layout

- `src/contexts/<context>/<module>/{domain,application,infrastructure}`
- `tests/` mirrors `src/`. Test data comes from Object Mothers in `tests/.../domain/`. Ports are replaced by handwritten mocks.
- Plans live in `.agents/plans/`.

## Conventions

Documents in `docs/conventions/`. Read only the one that applies.

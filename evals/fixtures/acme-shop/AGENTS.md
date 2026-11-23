# acme-shop

Online shop backend. Plain JavaScript (ES modules), Node 20+, no dependencies.

## Commands

- `npm test`: run the tests (`node --test`).
- `npm run check`: the verification command, the same as CI.
- `npm start`: run the HTTP API on `PORT` (default 3000), with in-memory adapters.

## Layout

- `src/contexts/<context>/<module>/{domain,application,infrastructure}`
  - `catalog/products`: create, find, rename, change price, change stock (records `ProductStockChanged`), search.
  - `shop/carts` and `shop/orders`: open a cart, add and remove items, place an order (copies name and price at that moment). `shop/shared` holds what the shop needs from the catalog: the `ShopCatalog` port and its adapter.
  - `notifications`: `EmailSender` port with an in-memory adapter; `order-confirmations` emails the shopper when an order is placed.
  - `shared`: `AggregateRoot`, `DomainEvent`, `DomainError`, `Uuid`, `Clock`, `EventBus` and their adapters.
- `src/apps/api/`: `node:http` entry point. `routes.js` calls use cases directly, `ErrorStatusMapper.js` maps domain errors to statuses, `container.js` is the composition root.
- `tests/` mirrors `src/`. Test data comes from Object Mothers in `tests/.../domain/`. Ports are replaced by handwritten mocks (`Mock*` with `should*` setup methods). `tests/apps/api/` has the acceptance test.
- Plans live in `.agents/plans/`.

## Conventions

Documents in `docs/conventions/`. Read only the one that applies.

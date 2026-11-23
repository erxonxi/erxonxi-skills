# acme-ledger

Invoicing for a small business. Plain JavaScript (ES modules), Node 20+, no dependencies.

## Commands

- `npm test`: run the tests (`node --test`). Everything must stay green.

## Layout

- `src/modules/<module>/{handlers,model,persistence}`
  - `invoices`: draft, issued and paid invoices.
  - `customers`: who gets invoiced.
- `src/bus/CommandBus.js` is the command bus. `src/bus/registry.js` registers every handler and is the only place that wires things together.
- `src/shared/`: `result.js` and `IdGenerator.js` with its adapter.
- `test/` mirrors `src/modules/` (singular `test`, not `tests`).

## Conventions

- Every action is a command. Callers use `bus.dispatch("PayInvoice", payload)`; they never call a handler directly.
- A handler is a class named `<Verb><Noun>Handler` in `handlers/`, with one method `execute(command)`. Collaborators come in through the constructor.
- Business rules never throw. A handler returns `ok(value)` or `fail("UPPER_SNAKE_CODE")` from `src/shared/result.js`, for example `fail("INVOICE_NOT_FOUND")`. No custom error classes.
- Ids are generated on the server by the injected `IdGenerator` (`ids.next()`). Commands never carry an id for something new.
- The model is plain functions over plain objects (`model/invoice.js`). No classes in the model, and the functions return a new object instead of mutating.
- Persistence: a store with `get(id)` and `put(entity)`. Adapters are in memory for now.
- Tests: `node:test`, named `<thing>.test.js` under the mirror path. Collaborators are `mock.fn()` stubs, test data comes from the builders in `test/support/builders.js`. No Mother classes and no handwritten Mock classes.
- `test/bus.registry.test.js` runs commands through the real registry with in-memory stores.

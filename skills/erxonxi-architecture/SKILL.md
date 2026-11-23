---
name: erxonxi-architecture
description: "Load before creating, moving or wiring a file, module, use case, endpoint or subscriber in a backend, and before answering where something lives, what a use case or endpoint takes and returns, or which module or context may depend on which, even for a one-line question. Its answers often differ from common practice."
---

# Architecture

Examples use TypeScript-like notation for illustration only. Apply the shape, not the syntax.

## Rule zero

Before creating anything, look at how the project already solves a similar case and copy that pattern (folder tree, names, file shape). The project's existing convention wins over this guide. This guide decides only when the project has no precedent.

When there is no precedent (a new project or the first module of its kind), what you write now becomes the pattern every later change copies. So load `erxonxi-domain-modeling` before modeling the aggregate and its errors, and `erxonxi-testing` before writing the first test (mothers, handwritten mocks of the ports), not only this guide.

Behavior first: before choosing folders, write each business rule the request states as a test sentence. Each one is implemented in this change or raised as a question before coding, never reported as missing at the end. When a rule needs data from a context that does not exist yet, declare the port you need and give it an in-memory adapter.

## The map

```
src/contexts/<context>/             # business area: shop, catalog, backoffice, notifications
  <module>/                         # aggregate in plural: users, products, product_reviews
    domain/                         # aggregate, value objects, events, errors, ports
    application/
      <action>/                     # one folder per use case: create, find, search, rename
        <UseCase>                   # UserCreator, ProductFinder, ProductsSearcher
    infrastructure/                 # adapters: PostgresUserRepository, RabbitMqEventBus
  shared/                           # shared inside the context
src/contexts/shared/                # shared kernel across contexts
apps/ or src/app/                   # deliverables: API, consumers, CLI, web. Wiring and protocol only
tests/                              # mirror of src (see erxonxi-testing)
```

- Contexts and modules are named with business nouns. The three layers are the only technical names allowed in the path.
- The module is named after the aggregate, in plural.
- The folder and file format (kebab, snake, Pascal) is set by the language or the project. The shape does not change.
- In flat-package languages (Go) the same idea is compressed: domain in the root package, one package per use case, a `platform` package for adapters.

## Dependency rule

`infrastructure → application → domain`. Never the other way around.

- `domain` imports only `domain` and the shared kernel. No framework, no ORM, no HTTP, no database driver, no direct clock or randomness (the one exception is the `DomainEvent` base, see `erxonxi-domain-modeling`).
- `application` imports `domain`. It knows nothing about HTTP, SQL or queues.
- `infrastructure` may import all three layers of its own module.
- Make it machine-checkable: a restricted-imports lint rule, an architecture test or the build's module graph. The error message must say how to fix it ("declare a port in domain and implement it in infrastructure"). If the project has none, propose one.

## Use case (application service)

- One class per use case, a single public method, a single responsibility.
- Name: agent noun over the aggregate. `UserCreator`, `UserRegistrar`, `ProductRenamer`, `ProductFinder` (finds one, fails if missing), `ProductsSearcher` (lists, or may find nothing), `*Updater`, `*Deleter`, `*Adder`, `*Remover`, `*Incrementer`, `*Sender`, `*Confirmer`. Never `Manager`, `Helper`, a generic `Service` or `UseCaseInterface`.
- The method is named after the action (`create`, `find`, `search`, `rename`), never `run`, `execute` or `handle`. If the language has its own idiom for callable objects, use it uniformly across the project.
- It receives its ports through the constructor. No service locators or statics.
- Input: primitives (or a command/request made of primitives). Output: primitives or a response DTO (`ProductResponse`) next to the use case. It never returns domain objects to the outside.
- Shape of a write: load the aggregate, call a behavior method, save, publish the recorded events.

```ts
class UserRegistrar {
  constructor(private repository: UserRepository, private eventBus: EventBus) {}

  async register(id: string, name: string, email: string): Promise<void> {
    const user = User.create(id, name, email);
    await this.repository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }
}
```

- Checks that need a repository (existence of another aggregate, uniqueness) live in the use case or in a domain service, not in the aggregate.
- Command/Query bus with handlers: only if the project already uses it or if you need middlewares or asynchronous execution. By default the entry point calls the use case directly. The event bus is part of the base design.

## Entry points (controllers, routes, CLI, consumers)

- Thin: parse and validate the shape of the input, call a use case, serialize its response, translate errors to the protocol.
- One controller per action when the framework allows it, named by resource and verb: `ProductsPutController`, `UsersPostController`.
- They never contain business logic. They never instantiate repositories or use cases: they resolve them from the composition root.
- The translation from domain error to status code lives here and only here (see erxonxi-domain-modeling, errors).
- Ids are generated by the client (UUID) and travel in the request (`PUT /products/{id}`), so the write returns nothing. Creating with an id that already exists never overwrites: the same content is a success, different content is an "already exists" error. Having an id is never permission. On a public anonymous endpoint a duplicate answers like a success, so nobody learns what exists.
- An event subscriber is another entry point: it receives the event and delegates to a use case.

## Composition root

- A single place per deliverable where each port is bound to its adapter and the use cases are built (a container or a manual wiring file).
- Adding a use case includes registering it there.
- Every constructor gets each dependency and each piece of data from its caller, with no default values: not the use cases, not the adapters (an in-memory adapter receives its seed data), not the wiring function.
- Several deliverables (API, consumer, backoffice) compose the same contexts with different wiring.

## Collaboration between contexts

Never import the `domain` or the `infrastructure` of another context: not its repositories, not its aggregates, not its errors. Two valid mechanisms:

1. **Domain events** (asynchronous, eventual consistency). Context B subscribes to facts from A and keeps its own copy or projection of what it needs.
2. **Consumer-owned port** (synchronous, inside a monolith). The consumer declares in its `domain` a port with the name and shape it needs (`CheckoutCatalog` returns `CatalogItem`, not the `Product` aggregate). An adapter in its `infrastructure` implements it by calling a public use case in the provider's `application` and mapping its DTO.

Choose by what the data is for: a decision that needs the current value (a credit limit, stock, a price at payment) takes the port; a listing, a filter or a provider that may be slow takes the copy from events, with its accepted delay stated.

Also:

- Each context models its own view of a foreign concept (`NotificationsRecipient` is not the `User` of another context).
- Data the consumer must remember is copied at the moment of the fact (the order line stores the product's name and price). It is not resolved later with a join.
- Avoid cycles between contexts. If a new context would depend on another one that would in turn depend on it, that aggregate belongs in the existing context.

## Shared kernel

- It contains only generic pieces: `AggregateRoot`, `ValueObject`, `DomainEvent`, `EventBus`, `Clock`, `UuidGenerator`, `UnitOfWork`, `Criteria`, `Money`, and identifiers used by several contexts (`UserId`).
- No business rules. If in doubt, do not share it.
- There is one `shared` per context for what its modules share, distinct from the global shared.

## When not to apply all of this

- Small project, script, CRUD without rules or UI without logic: no layers and no ports. The test: if you cannot name one invariant beyond format validation, nor one port you would replace in a test, group by feature and keep it plain. Add the layers with the first invariant or the second adapter.
- Do not create an interface, factory or layer for a single implementation without a reason. A valid reason is crossing an input/output boundary (you need to substitute it in tests) or having a real variation.
- Do not add contexts, command or query buses, brokers, subscribers or projections "just in case". The in-memory event bus is the exception: it is in from the first write, and an event nobody listens to yet is recorded and published, with nothing else built for it. A module is promoted to a context when it hurts.

## Adapting to the language

| Concept | Stays | Adapts |
|---|---|---|
| Port | Declared in `domain`, named by role, no `I` prefix or `Interface` suffix | interface, abstract class, trait or protocol |
| Adapter | In `infrastructure`, technology as prefix: `PostgresUserRepository`, `InMemoryEventBus` | whatever the framework asks for |
| Use case | One class, one public method | method name per the language's idiom |
| Layers | Three, dependencies point inward | folders, packages, projects or build modules |
| Enforcement | Automatic | import lint, architecture test, build graph |

## Checklist before accepting a change

- [ ] I copied the pattern from a similar existing module.
- [ ] `domain` imports nothing technical and nothing from another context.
- [ ] Each use case is in its action folder, with one public method and an agent name.
- [ ] The entry point only parses, calls a use case, serializes and maps errors.
- [ ] The new use case is registered in the composition root.
- [ ] No import crosses into another context's `domain`/`infrastructure`.
- [ ] I did not add abstractions nobody uses yet.

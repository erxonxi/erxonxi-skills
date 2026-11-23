---
name: erxonxi-infrastructure
description: "Adapters and integration in any technology: repositories, event bus (retries, dead letter, outbox, inbox), transactions, cache, projections, schema changes, local environment. Use when implementing or reviewing any of them or communication between services."
---

# Infrastructure

Infrastructure is a replaceable detail behind ports declared by the domain. Start with the simplest option that works and add complexity only when there is a measured problem.

Warning: it is easy to implement these patterns in a way that does not deliver the guarantee they name. Copy the shape and verify the guarantee (see "Guarantees to verify").

## Adapters

- The port is declared in `domain` by role (`UserRepository`, `EventBus`, `EmailSender`, `Cache`, `Clock`). The adapter lives in `infrastructure` with the technology as a prefix (`PostgresUserRepository`, `RabbitMqEventBus`, `RedisCache`, `InMemory*`).
- The aggregate crosses the boundary, the persistence model does not. The adapter translates explicitly with `toPrimitives()` / `fromPrimitives()` or with a mapping that lives in `infrastructure` (mapping files, custom types). The domain carries no ORM annotations.
- Plain SQL or a query builder is a valid and common option. Use an ORM where it fits, always outside the domain.
- A repository persists whole aggregates. Bulk updates that bypass the aggregate and reports with aggregations go in a separate read class that returns DTOs, not in the aggregate's repository.
- External services (email, payments, AI models) go behind a gateway-style port with one adapter per provider.
- Decorators for cross-cutting concerns: cache, metrics, transaction and logs wrap a port without modifying its implementation.

## Event bus

### Message

A self-describing JSON envelope, the same in every language of the system:

```json
{ "data": { "id": "<eventId>", "type": "acme.shop.user.registered",
            "occurred_on": "<ISO-8601>", "attributes": { "id": "<aggregateId>", "...": "..." } },
  "meta": {} }
```

- `type` follows `<company>.<context>.<aggregate>.<fact>`. Only primitives in `attributes`.
- The `eventId` is generated once, when the event is created, and is the idempotency key end to end.

### Topology

- One exchange or topic per domain or context.
- **One queue per subscriber**, named after the subscriber: `acme.notifications.send_welcome_email_on_user_registered`. Its bindings are the names of the events it subscribes to.
- This way each subscriber has its own backlog, its own retry state and its own dead letter. A failing subscriber does not block the others.
- The topology is generated from the subscriber declarations in the code, not maintained by hand.

### Failures

- "At least once" delivery, with no guaranteed order. Every subscriber must be idempotent.
- Retry = republish with a delay and an attempt counter. After N attempts (reference: 3), send to that subscriber's dead letter.
- Always acknowledge the message after processing it. The retry is a new message, not a rejection that leaves it blocking the queue.
- If the broker is unavailable when publishing, store the event in a fallback table in the application database and republish it later.
- Messages of the same aggregate that must keep their order: same partition key (the aggregate id).

### Complexity ladder

1. **Synchronous in-memory bus**: enough for a monolith with no resilience requirements and for tests.
2. **The database as a bus**: a pending-events table with one row per (event, subscriber), consumed with `SELECT ... FOR UPDATE SKIP LOCKED`, a retries column and a dead letter flag. No new infrastructure.
3. **Broker** (RabbitMQ, Kafka, SQS): when volume or isolation demand it.

Do not add a broker before you need it.

## Transactions

- The domain knows nothing about transactions.
- A repository-level transaction is not enough when a use case touches several aggregates.
- Put the transactional boundary outside: a `UnitOfWork` port that the use case invokes (`unitOfWork.run(...)`), a transactional decorator over the use case, or the entry point. Repositories join the current transaction transparently.
- If there are synchronous in-process subscribers, their effects join the same transaction: events are deferred and published right before commit.
- No distributed transactions or two-phase commit. Between systems: outbox plus idempotent consumers.

### Outbox

- The event (or the intent of a side effect, such as sending an email) is inserted into a table **within the same transaction** that saves the aggregate.
- A relay process reads in batches with locking (`FOR UPDATE SKIP LOCKED`), publishes and deletes.
- It guarantees "at least once". Consumers deduplicate.
- Use it when losing the event or the effect is not acceptable. It is not required for everything.

### Inbox

- The consumer inserts `(event_id, subscriber_name)` with "insert or ignore if it exists" **in the same transaction** as the handler's effect. If it already existed, the duplicate is ignored.

### Alternatives to read-then-write

- A conditional update in a single statement (`UPDATE ... SET stock = stock - n WHERE stock >= n`) instead of read, check and write.
- Optimistic locking with a `version` column and a concurrent-modification domain error.
- Writes that are idempotent by construction (`INSERT ... ON CONFLICT DO NOTHING`, direct delete) so a double click is not an error.

## Cache

- HTTP cache first: `Cache-Control`, `s-maxage` for shared caches, `ETag` with a 304 response.
- Application cache as a decorator of a port (a repository or a read use case), injected in the composition root. The domain and the controller do not know it exists.
- The key is derived from the query (id or criteria). The value is JSON of primitives, never the language's native serialization. Explicit TTL.
- **Every write invalidates or updates the key.** A decorator that only caches reads serves stale data until the TTL expires. Decide and document the freshness policy.
- A cache is a well-placed patch, not a substitute for fixing the slow query.

## Projections and state transfer

- Projections are built by subscribers that write to a read store owned by the context. Eventual consistency by default.
- Each context owns its tables (one schema per context). Data from another context is copied through events, not read across schemas.
- Events when the consumer needs to react or know the history. Snapshots of current state (compacted topic keyed by aggregate id, delete = null value) or change data capture (CDC) when it only needs the latest state.
- Read models inside the database: a plain view does not scale by itself, a materialized view works if the refresh cost is acceptable, and triggers keep consistency but hide logic outside the code and the tests.
- Counters and derived values in projections: beware of read-modify-write under concurrency.

## Database schema

- The schema lives in versioned SQL files in the repository. If the project has no migration tool, reapply it with a reset command.
- Evolution in production: expand (new nullable column), backfill, contract (`NOT NULL` at the end). Backfills are idempotent and batched.
- `NOT NULL` by default unless there is a specific reason. `TEXT` with `CHECK` instead of arbitrary lengths. Timestamps with time zone. Simple rules also as `CHECK` (safety net).
- Plural table names for entities. Relationship tables are `singular_plural` (`user_products`). An index on every foreign key that is queried.
- Delete semantics are decided on purpose: cascade for children that belong to the parent, no cascade (and with a data copy) for history.
- Table inheritance: measure before choosing between a single table and a table per subtype.

## Service boundaries

- Synchronous calls only at the edge. Contexts talk to each other through events (or through consumer-owned ports inside a monolith).
- Gateway at the entry: it validates the token once, a single identity service owns the keys, and migration from the monolith happens endpoint by endpoint.
- Observability is an adapter: metrics decorators over the ports, structured logs collected by agents, dashboards and alerts as code.

## Local environment

- `docker compose` only for stateful dependencies (database, broker, cache), with pinned versions.
- Schema and seed data loaded from the repository. Test database separate from the development one.
- Configuration through environment variables with an `.env.example`. No secrets in the repository.
- One command to start and another to verify (see erxonxi-workflow).

## Guarantees to verify

Before claiming that something is atomic, idempotent or resilient, check in the code:

- [ ] Does the outbox bus use the **same** connection/transaction as the aggregate's `save`? If it opens its own, there is no atomicity.
- [ ] Does the inbox handler write inside the transaction where the `event_id` was recorded?
- [ ] Does the relay or consumer delete only what it processed successfully? What happens with a message it cannot deserialize?
- [ ] Do the event serializer and deserializer round-trip across all the languages of the system?
- [ ] Does the cache decorator invalidate on every write?
- [ ] Does all SQL use bound parameters, including fallback paths and criteria converters?
- [ ] Is the connection taken per request or from the pool, and not pinned at module level?
- [ ] Is the subscriber idempotent against a duplicate and against an out-of-order event?

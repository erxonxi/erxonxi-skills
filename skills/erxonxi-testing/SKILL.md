---
name: erxonxi-testing
description: "Test strategy and style in any language: which level to test at, use case tests with mocked ports, Object Mothers, handwritten doubles, integration and acceptance tests, naming. Use when writing or reviewing tests or preparing test data and doubles."
---

# Testing

TypeScript-like notation is only an illustration. If the project already has tests, copy their exact shape (test base, mocks, mothers, names).

## What to test and where

| Level | Unit under test | Real | Replaced | Location |
|---|---|---|---|---|
| Unit | A use case or a subscriber, through its public API | Aggregates, value objects, domain services | Ports: repositories, event bus, clock, id generator, gateways | `tests/<context>/<module>/application/<action>/` |
| Integration | An adapter (repository, bus, client) | The real technology: test database, broker | Nothing | `tests/<context>/<module>/infrastructure/` |
| Acceptance | An endpoint or a flow that crosses contexts | The whole wired application, real database | Only time, ids and current user | `tests/app/` or `tests/acceptance/` |

Rules:

- The test tree mirrors the `src` tree.
- Domain classes are covered through use cases. Do not test them separately if a use case already exercises that rule.
- Prove each behavior once, at the lowest level that can prove it. Do not repeat the same check at several levels.
- At least one test per use case. Additional cases come from equivalence partitions and boundary values, not from gratuitous variations.
- No browser E2E by default in backend. Between services or repositories, use contract tests instead of E2E.
- There is no coverage target. The measure is that every use case and every adapter has its test.

## Unit test of a use case

```ts
describe("UserRegistrar should", () => {
  const repository = new MockUserRepository();
  const eventBus = new MockEventBus();
  const registrar = new UserRegistrar(repository, eventBus);

  it("register a valid user", async () => {
    const expectedUser = UserMother.create();
    const expectedEvent = UserRegisteredDomainEventMother.fromUser(expectedUser);

    repository.shouldSave(expectedUser);
    eventBus.shouldPublish([expectedEvent]);

    await registrar.register(...primitivesOf(expectedUser));
  });
});
```

- Build the real use case with its real domain collaborators and its replaced ports.
- Assert the outcome at the boundaries: "this aggregate was saved", "this event was published", "this error was thrown". Do not assert which private method was called.
- Compare events by content, ignoring `eventId` and date.
- Never mock an aggregate or a value object.
- Error case: prepare the port (`repository.shouldSearchAndReturnNull(id)`) and expect the specific domain error.

## Object Mothers

All test data comes from mothers. Never build aggregates, events or DTOs by hand inside a test.

```ts
class UserMother {
  static create(params?: Partial<UserPrimitives>): User {
    return User.fromPrimitives({
      id: UserIdMother.create().value,
      name: UserNameMother.create().value,
      email: EmailAddressMother.create().value,
      ...params,
    });
  }
}
```

- One mother per aggregate, value object, event, command and response DTO.
- Layers: random primitives (`UuidMother`, `WordMother`, `IntegerMother`) → value objects → aggregates → events, commands and responses.
- Methods: `create(overrides?)` with valid defaults, and named variants for the interesting cases: `withTooLongName()`, `invalid()`, `fromUser(user)` (the event that aggregate would emit), `fromCommand(command)`.
- The test names only what matters to it: `UserMother.create({ name: "..." })`. The rest is noise the mother hides.
- Boundary variants are built from domain constants, not from copied magic numbers.
- They live in `tests/.../domain/`, next to the mirror of what they build. They evolve with the model in a single place.
- Trivial ids and value objects may be built directly.

## Test doubles

- Replace your own ports, not third-party libraries. Do not mock the SQL driver or the HTTP client: test the adapter against the real technology.
- The mock is a class that implements the domain port (`MockUserRepository implements UserRepository`), with setup methods in intent language: `shouldSave(user)`, `shouldSearch(user)`, `shouldSearchAndReturnNull(id)`, `shouldPublish(events)`. Verification lives inside the mock, not scattered through the test.
- Equivalent alternative: a generic mock helper with the same vocabulary. What matters is that the test reads as intent.
- No module mocks or inline mocks for domain dependencies. Exception: the composition root boundary in route tests.
- Prefixes by what they are: `Mock*` (verifies calls), `InMemory*`/`Fake*` (simplified working implementation), `Dummy*` (filler).
- Mocks exist only in test code. An `InMemory*` may live in production if it is used for local development.
- Control time and ids through ports (`Clock`, `UuidGenerator`) replaced in tests. Use random data with a fixed seed, so a failure can be reproduced.

## Integration test of an adapter

```ts
describe("PostgresUserRepository should", () => {
  beforeEach(async () => await connection.truncateAll());

  it("save a user", async () => {
    await repository.save(UserMother.create());
  });

  it("return null searching a non existing user", async () => {
    expect(await repository.search(UserIdMother.create())).toBeNull();
  });

  it("return an existing user", async () => {
    const user = UserMother.create();
    await repository.save(user);
    expect(await repository.search(user.id)).toEqual(user);
  });
});
```

- Run against a real test database, never the development one. Clean it between tests.
- Prepare data with mothers and with the repository itself. No handwritten SQL in the test. For data that has no `save`, use an environment "arranger" (`givenUsers(...)`).
- Same cases for every implementation of the same port.
- Asynchronous effects: bounded retries (`eventually`), not fixed waits.

## Acceptance test

- One per endpoint worth covering or per user goal. Real request, real application.
- Assert HTTP status and body, including the error `type`: it pins the contract the client depends on.
- Cover happy path, input validation and error → status mapping. Business rules are already in the use case tests.
- Gherkin format, steps in business language or simple protocol language (`Given I send a PUT request to ... Then the response status code should be 201`).

## Frontend

- Test like a user: query by role, label or visible text, and interact with user events. No `data-testid` except as a last resort. No snapshots. Do not test internal state or loose hooks.
- The repository or action is injected into the component (prop or provider) and replaced in the test.
- Replace the network at the boundary, not inside the component.

## Names

- The name is a behavior sentence in business language, not the method name: `register a valid user`, `throw an error if the user does not exist`, `not return a non existing product`.
- The subject goes in the container and the sentence in the case: `describe("UserRegistrar should")` + `it("register a valid user")`, or the class `UserRegistrarShould` with methods `register_a_valid_user`. Use the idiomatic variant of the language, uniformly.
- File: same name as the unit under test plus the language's test suffix.
- Structure is arrange → act → assert, without comments labeling it.

## Workflow

1. TDD per use case: first the use case test and the mothers it needs, then the domain objects, then the use case, until green.
2. Repeat use case by use case.
3. At the end, the repository implementation test and then the implementation.
4. Bug: first a test that reproduces it, then the fix.
5. Refactor: existing tests are not touched to make the refactor pass. If they must change, it is a behavior change and is treated as one.

## What to avoid

- Mocking domain objects or anything you do not own.
- Testing private methods or internal details.
- Shared mutable fixtures between tests.
- Handwritten data or irrelevant fixed values repeated across tests.
- Tests that only check that a mock was called without proving behavior.
- Fixed waits (`sleep`) to synchronize.
- Proving the same thing at three levels.

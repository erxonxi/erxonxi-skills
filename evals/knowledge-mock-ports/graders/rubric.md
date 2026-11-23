---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge what the answer recommends, not what it mentions in passing as an alternative it rejects.

1. It recommends replacing them with test doubles of the use case's own ports (interfaces the domain declares), not mocking modules or third-party libraries (no jest.mock of the database client or ORM as the main approach).
2. It recommends handwritten mock classes that implement the port (for example MockUserRepository implements UserRepository), OR explicitly prefers them over generic jest.fn() objects.
3. The doubles expose intent-named expectation or setup methods, for example shouldSave(user) and shouldPublish(events), or the answer asserts outcomes at the boundaries (what was saved, what was published) rather than internal calls.

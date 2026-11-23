---
name: erxonxi-clean-code
description: "Code style at line, function and class level in any language: names, functions, classes, comments, errors, smells and refactorings, patterns, simple design. Use when writing, naming, refactoring or reviewing code, or judging whether an abstraction is justified."
---

# Clean code

## Priorities (simple design)

In this order:

1. **Pass the tests.** Without a safety net you do not refactor.
2. **Reveal intent.** Business names, one level of abstraction per function.
3. **No duplication** of the same concept.
4. **Minimal elements.** Nothing that is not used today.

Stopping criterion: the code is good enough when you could come back to it in six months and understand it. Do not keep polishing after that.

## Names

- English, with the business words (ubiquitous language). If the business says "ban", the method is `ban`, not `block`.
- No abbreviations or single letters (`exception`, not `e`; `connection`, not `conn`). Established exceptions: `Id`, `Dto`, `Url`.
- Do not repeat the context: inside `UsersController`, `repository`, not `userRepository`.
- **Domain classes**: nouns (`Booking`, `DateRange`, `ProductName`).
- **Use cases and services**: agent noun, verb + "-er": `UserCreator`, `ProductFinder`, `WelcomeEmailSender`, `ProductsCounterIncrementer`.
- **Forbidden as empty**: `Manager`, `Helper`, `Util(s)`, `Processor`, generic `Handler`, `Data`, `Info`.
- **Suffixes that stay** because they name a role: `Repository`, `Controller`, `Request`/`Response`, `Gateway`, `DomainEvent`, `Mother`, `Error`.
- **Interfaces**: the role name (`UserRepository`, `PasswordHasher`, `EventBus`). No `I` prefix, no `Interface` suffix.
- **Implementations**: technology or characteristic as prefix (`PostgresUserRepository`, `InMemoryEventBus`, `RandomUuidGenerator`). Never `Impl`.
- **Booleans**: `is*`/`has*` in positive form (`hasPlacedAnyOrder`, not `hasNotPlacedAnyOrder`).
- **Guards**: `ensure*` and they throw (`ensureUserDoesNotExist`).
- **Queries**: `search` may find nothing, `find` throws if it does not exist. Do not use `get` for something that can fail.
- **Collections**: plural (`users`, `orderLines`).
- **Constants**: a name with meaning and unit (`SHIPPING_ESTIMATION_IN_BUSINESS_DAYS`). No magic numbers.

## Functions and methods

- One level of abstraction per function. The public method reads as a list of named steps, and the details go in private methods.
- Guard clauses and early return. No `else` after a `return`. No nested conditionals when a guard flattens them.
- No boolean flag arguments: two methods named by intent (`createUser` / `createAdmin`).
- No default parameters: the caller passes everything explicitly (apply this according to the language idiom and the project convention).
- Few parameters. When the signature looks like a form, group into a request object or value objects (`DateRange`, `Money`).
- Tell, don't ask: do not pull data out of an object to decide outside it. Ask the object to do it (`user.addToSavedProducts(product)`). Do not chain accesses through several objects.
- Separate query from command: a function returns data or changes state, not both.
- Do not return `null`, `false` or codes to signal a failure. Legitimate absence: an explicit optional type. Failure: a named error.
- Explicit types in public signatures, including the return. No wildcard types (`any`, `mixed`, `Object`).

## Classes

- Closed to inheritance by default (`final`/`sealed`) unless designed to be extended.
- Immutable by default: read-only fields, records, value objects.
- Minimal visibility: private by default, opened only when needed.
- Composition before inheritance. A base class only for a truly shared algorithm. If inheritance only reuses code, inject a collaborator.
- No mutable static state or singletons. Static is reserved for named constructors and pure functions.
- No setters. State changes through methods with business names.
- Named constructors when there is more than one way to create or creation has meaning (`Product.create`, `Price.fromCents`).
- Dependencies through the constructor, against the role and not the concrete implementation.
- Small: one reason to change. As a guide, a method over about 35 lines or a class with more than about 10 methods calls for extraction.

## Comments

- Document code with names. A comment that repeats what the code says is deleted. One that lies, even sooner.
- If you need a comment to explain a block, extract a function with that name.
- Keep the comment that explains a **why** the code cannot express: an external limitation, a temporary decision, a forced workaround.

## Duplication and abstractions

- Remove literal and structural duplication **of the same concept**.
- Two identical fragments that represent different concepts (the price calculation of an order and of an invoice, in different contexts) are **not** unified: they will change for different reasons. Do not apply DRY across contexts.
- YAGNI. Do not create: an interface per class, a factory for a single class, repository methods nobody calls, unused states or enums, "just in case" parameters.
- An interface is justified when it crosses an input/output boundary, when there is real variation, or when the test needs to replace it.
- Three real cases before generalizing.

## Smell → refactoring

| Smell | Refactoring | Result |
|---|---|---|
| Long method | Extract method, guards | Named steps |
| Nested conditionals | Guards with early return | Flat flow |
| Control flag in a loop | Early return | No state variable |
| Complex condition | Extract to a boolean or named method | `if (qualifiesForFreeShipping)` |
| Long parameter list | Parameter object or value object | `CreateProductRequest`, `DateRange` |
| Primitive obsession | Value object that validates on construction | `EmailAddress` |
| Data clump | Value object | `DateRange(start, end)` |
| Feature envy | Move the method to whoever has the data | `user.ensureEmailIsValid()` |
| Message chains | Tell, don't ask | `user.displayName()` |
| Data class without behavior | Move behavior to the data | Rich model |
| Large class | Extract class or service | Injected collaborators |
| `switch`/`if` on a type code | Polymorphism: subclasses or strategy | Adding a type = adding a class |
| Inheritance for reuse | Composition | Injected collaborator |
| Dependency created inside (`new` of infrastructure) | Injection, then inversion | Depends on the role |
| Global state or singleton | Injected immutable instance | No shared state |
| Boolean argument | Split into two methods | Two intents |
| Error codes | Named error | `DiscountOverMaxError` |
| Explanatory comment | Extract a method with that name | `if (isNewUser(user))` |
| Speculative generality | Delete | Fewer elements |

## How to refactor

- Small steps, one per refactoring, with tests green between each step.
- Tests are the fixed specification: do not change them to make the refactor pass. If they change, it is a behavior change and goes separately.
- Do not mix refactor and functional change in the same step or in the same commit.
- If there are no tests, first pin the current behavior with characterization tests.

## Design patterns

Use a pattern when the force that justifies it exists:

- **Strategy / polymorphism**: behavior varies by type and new types keep arriving, or it varies at runtime.
- **Factory method**: construction depends on a runtime value.
- **State**: the allowed operations depend on the state.
- **Observer / mediator (events)**: decouple a main use case from its side effects.
- **Decorator**: add cache, transaction or log around a port without touching it.
- **Singleton**: no.

If the variation does not exist today, neither does the pattern.

## SOLID in practice

- **S**: extract a class or service when a class changes for two reasons. The controller only handles the request and the logic goes to a use case.
- **O**: replace chains of conditionals on type with polymorphism, so adding a case is adding a class.
- **L**: do not inherit if the subclass breaks the expectations of the base.
- **I**: small ports named by the role the consumer needs.
- **D**: in three steps: stop instantiating inside, inject the concrete implementation, depend on the role.

## Formatting

- Formatting is not debated or fixed by hand: the project's shared formatter and linter decide it. Run them and accept the result.
- What the linter can check is not written as a prose rule: it is added as a rule.

## Review checklist

- [ ] Are the names from the business and do they reveal intent without a comment?
- [ ] Does each function have a single level of abstraction and guards instead of nesting?
- [ ] Are there flag booleans, default parameters, nulls as errors or setters?
- [ ] Is there any class, interface or method that nobody uses yet?
- [ ] Was the removed duplication really the same concept?
- [ ] Do the remaining comments explain a why?
- [ ] Are refactor and behavior change separated?

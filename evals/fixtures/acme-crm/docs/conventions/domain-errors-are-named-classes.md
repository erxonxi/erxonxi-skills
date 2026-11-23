# Domain errors are named classes

Every way the domain can refuse something is its own class extending `DomainError`, named after the condition and ending in `Error`: `DealAlreadyClosedError`, `CompanyDoesNotExistError`, `InvalidContactEmailError`.

- The class carries the offending value (`id`, `value`), not only a message.
- Never `throw new Error(...)` in `src/contexts`, and never signal failure with `null` or `false` from the domain.
- The only exception is the `throw new Error("not implemented")` body of a port stub in `domain`.

Not checked: nothing enforces it yet.

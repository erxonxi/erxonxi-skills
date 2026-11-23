---
type: llm
---
The answer is a plan for the restock alerts feature. Pass only if every numbered claim holds:

1. The work is split into at least two phases, and each phase delivers something observable end to end (for example "a shopper can request an alert", "the shopper receives the email"), not phases by technical layer such as "domain", "infrastructure", "tests".
2. The phases are ordered so the first phase can be implemented and verified on its own.
3. It names concrete public contracts before code: at least the use case or class names with their method signatures, the event name with its attributes, or the HTTP endpoint with request and response.
4. It lists test cases by name or as sentences describing behavior, tied to phases.
5. Each phase ends with a verification step (running the tests or the check command) and a stop or review point before the next phase.
6. It records decisions with at least one alternative that was discarded and why, OR lists open questions with a recommended answer for each.
7. It does not contain the full implementation code of the feature.

# Use cases are agent nouns

Each action of the application is one class in `application/<action>/`, named as an agent noun over the aggregate: `CompanyCreator`, `DealWinner`, `ActivityLogger`, `DealsByCompanySearcher`.

- One class per use case, with one public method named after the action (`create`, `win`, `log`, `search`).
- A use case receives its ports through the constructor and returns primitives, never domain objects.
- No `*Service`, `*Manager` or `*Helper` classes that group several actions.

Not checked: reviewers catch it by eye; no test or lint looks at class names or public methods.

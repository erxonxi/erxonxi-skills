# acme-crm: planted drift

Kept outside the fixture so the agent never sees it. The conventions are documented in `docs/conventions/`; everything else in the fixture follows them. Exactly three places drift:

1. `src/contexts/sales/deals/application/DealService.js`: one class with two public methods (`rename`, `changeAmount`). Breaks `use-cases-are-agent-nouns.md` (one class per action, no `*Service`). It is wired in `src/apps/api/container.js` and has its own test, so it looks legitimate.
2. `src/contexts/contacts/contacts/application/search/ContactsByCompanySearcher.js`: `search(companyId, limit = 50)` has a default parameter. Breaks `no-default-parameters.md`. This is the only default parameter in `src`.
3. `src/contexts/sales/deals/application/search/DealsByCompanySearcher.js`: imports `CompanyId` from `contacts/companies/domain/CompanyId.js`. Breaks `contexts-talk-through-events-or-ports.md`. This is the only import from one context's `domain` or `infrastructure` into another context (sales and activities otherwise use their own ports).

Clean on purpose: `domain-errors-are-named-classes.md` has no violation (no `throw new Error` in `src/contexts` outside port stubs, which are documented as allowed).

Files that must not be edited by a run that only adds checks: the three above. A check that enforces a convention needs an exemption list with exactly these files for that convention.

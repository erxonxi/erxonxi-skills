# Contexts talk through events or a consumer-owned port

`contacts`, `sales` and `activities` never import each other's `domain` or `infrastructure`.

- Asynchronous: the consumer subscribes to a domain event published by the other context and keeps its own copy of what it needs.
- Synchronous: the consumer declares a port in its own `domain` (`SalesCompanies`, `ActivityDeals`) with the shape it needs. An adapter in the consumer's `infrastructure` calls a public use case of the provider (`CompanyFinder`, `DealFinder`) and maps its response.
- Data the consumer must remember is copied at the moment of the fact (a deal keeps the company name it had when it was opened).

Not checked: reviewers look at the imports of each pull request; nothing automated.

import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class DealWonDomainEvent extends DomainEvent {
  constructor(aggregateId, companyId, title, amountCents, ownerEmail) {
    super("acme.sales.deal.won", aggregateId, { companyId, title, amountCents, ownerEmail });
  }
}

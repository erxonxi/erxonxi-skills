import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class DealLostDomainEvent extends DomainEvent {
  constructor(aggregateId, companyId, reason) {
    super("acme.sales.deal.lost", aggregateId, { companyId, reason });
  }
}

import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class OrderPlacedDomainEvent extends DomainEvent {
  constructor(aggregateId, shopperEmail, totalCents) {
    super("acme.shop.order.placed", aggregateId, { shopperEmail, totalCents });
  }
}

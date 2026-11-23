import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class OrderRefundedDomainEvent extends DomainEvent {
  constructor(aggregateId, orderId, amountCents) {
    super("acme.shop.order.refunded", aggregateId, { orderId, amountCents });
  }
}

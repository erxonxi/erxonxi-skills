import { OrderRefundedDomainEvent } from "../../../../../src/contexts/shop/orders/domain/OrderRefundedDomainEvent.js";

export class OrderRefundedDomainEventMother {
  static fromRefund(refund) {
    return new OrderRefundedDomainEvent(refund.id.value, refund.orderId.value, refund.totalCents());
  }
}

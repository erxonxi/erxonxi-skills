import { OrderPlacedDomainEvent } from "../../../../../src/contexts/shop/orders/domain/OrderPlacedDomainEvent.js";

export class OrderPlacedDomainEventMother {
  static fromOrder(order) {
    return new OrderPlacedDomainEvent(order.id.value, order.shopperEmail.value, order.totalCents());
  }
}

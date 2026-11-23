import { OrderId } from "../../domain/OrderId.js";
import { OrderDoesNotExistError } from "../../domain/OrderDoesNotExistError.js";
import { Refund } from "../../domain/Refund.js";

export class OrderRefunder {
  constructor(refundRepository, orderRepository, eventBus) {
    this.refundRepository = refundRepository;
    this.orderRepository = orderRepository;
    this.eventBus = eventBus;
  }

  async refund(refundId, orderId, amountCents) {
    const order = await this.orderRepository.search(new OrderId(orderId));
    if (order === null) throw new OrderDoesNotExistError(orderId);
    const refund = Refund.prorated(refundId, order, amountCents);
    await this.refundRepository.save(refund);
    await this.eventBus.publish(refund.pullDomainEvents());
  }
}

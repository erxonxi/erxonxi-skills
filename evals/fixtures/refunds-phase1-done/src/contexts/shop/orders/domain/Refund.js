import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { OrderId } from "./OrderId.js";
import { RefundId } from "./RefundId.js";
import { RefundLine } from "./RefundLine.js";
import { InvalidRefundAmountError } from "./InvalidRefundAmountError.js";
import { RefundExceedsOrderTotalError } from "./RefundExceedsOrderTotalError.js";
import { OrderRefundedDomainEvent } from "./OrderRefundedDomainEvent.js";

/** A partial refund of an order, split across its lines in proportion to what each line cost. */
export class Refund extends AggregateRoot {
  constructor(id, orderId, lines) {
    super();
    this.id = id;
    this.orderId = orderId;
    this.lines = lines;
  }

  static prorated(id, order, amountCents) {
    if (!Number.isInteger(amountCents) || amountCents <= 0) throw new InvalidRefundAmountError(amountCents);
    const orderTotal = order.totalCents();
    if (amountCents > orderTotal) throw new RefundExceedsOrderTotalError(order.id.value, amountCents, orderTotal);
    const lines = order.lines.map((line) => ({
      itemId: line.itemId.value,
      refundedCents: Math.floor(amountCents * (line.totalCents() / orderTotal)),
    }));
    const refund = Refund.fromPrimitives({ id, orderId: order.id.value, lines });
    refund.record(new OrderRefundedDomainEvent(id, order.id.value, refund.totalCents()));
    return refund;
  }

  static fromPrimitives({ id, orderId, lines }) {
    return new Refund(new RefundId(id), new OrderId(orderId), lines.map(RefundLine.fromPrimitives));
  }

  totalCents() {
    return this.lines.reduce((total, line) => total + line.refundedCents, 0);
  }

  toPrimitives() {
    return {
      id: this.id.value,
      orderId: this.orderId.value,
      lines: this.lines.map((line) => line.toPrimitives()),
      totalCents: this.totalCents(),
    };
  }
}

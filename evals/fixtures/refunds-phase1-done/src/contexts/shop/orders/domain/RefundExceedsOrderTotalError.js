import { DomainError } from "../../../shared/domain/DomainError.js";

export class RefundExceedsOrderTotalError extends DomainError {
  constructor(orderId, amountCents, totalCents) {
    super(`The refund of <${amountCents}> cents is more than the total of the order <${orderId}> (<${totalCents}> cents)`);
    this.orderId = orderId;
    this.amountCents = amountCents;
    this.totalCents = totalCents;
  }
}

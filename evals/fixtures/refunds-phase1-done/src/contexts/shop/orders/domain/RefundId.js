import { DomainError } from "../../../shared/domain/DomainError.js";
import { Uuid } from "../../../shared/domain/Uuid.js";

export class InvalidRefundIdError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid refund id`);
    this.value = value;
  }
}

export class RefundId extends Uuid {
  invalid(value) {
    return new InvalidRefundIdError(value);
  }
}

import { DomainError } from "../../../shared/domain/DomainError.js";

export class InvalidRefundAmountError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid refund amount in cents`);
    this.value = value;
  }
}

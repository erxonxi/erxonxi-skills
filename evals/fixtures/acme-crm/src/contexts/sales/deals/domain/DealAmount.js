import { DomainError } from "../../../shared/domain/DomainError.js";

export class InvalidDealAmountError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid deal amount`);
    this.value = value;
  }
}

export class DealAmount {
  constructor(cents) {
    if (!Number.isInteger(cents) || cents < 0) throw new InvalidDealAmountError(cents);
    this.cents = cents;
  }
}

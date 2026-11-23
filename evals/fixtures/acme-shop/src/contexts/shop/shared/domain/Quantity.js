import { DomainError } from "../../../shared/domain/DomainError.js";

export class InvalidQuantityError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid quantity`);
    this.value = value;
  }
}

export class Quantity {
  constructor(value) {
    if (!Number.isInteger(value) || value < 1) throw new InvalidQuantityError(value);
    this.value = value;
  }

  plus(other) {
    return new Quantity(this.value + other.value);
  }
}

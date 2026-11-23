import { DomainError } from "../../../shared/domain/DomainError.js";
import { Uuid } from "../../../shared/domain/Uuid.js";

export class InvalidProductIdError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid product id`);
    this.value = value;
  }
}

export class ProductId extends Uuid {
  invalid(value) {
    return new InvalidProductIdError(value);
  }
}

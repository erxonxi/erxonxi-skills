import { DomainError } from "../../../shared/domain/DomainError.js";

export class InvalidProductStockError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid stock`);
    this.value = value;
  }
}

export class ProductStock {
  constructor(value) {
    if (!Number.isInteger(value) || value < 0) throw new InvalidProductStockError(value);
    this.value = value;
  }
}

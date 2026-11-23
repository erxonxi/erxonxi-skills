import { DomainError } from "../../../shared/domain/DomainError.js";

const MAX_LENGTH = 100;

export class InvalidProductNameError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid product name`);
    this.value = value;
  }
}

export class ProductName {
  constructor(value) {
    if (typeof value !== "string" || value.trim() === "" || value.length > MAX_LENGTH) {
      throw new InvalidProductNameError(value);
    }
    this.value = value;
  }
}

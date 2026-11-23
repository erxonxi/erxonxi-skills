import { DomainError } from "../../../shared/domain/DomainError.js";

export class InvalidContactNameError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid contact name`);
    this.value = value;
  }
}

export class ContactName {
  constructor(value) {
    if (typeof value !== "string" || value.trim() === "") throw new InvalidContactNameError(value);
    this.value = value;
  }
}

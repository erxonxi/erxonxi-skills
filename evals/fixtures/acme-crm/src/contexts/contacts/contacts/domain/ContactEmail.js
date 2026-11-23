import { DomainError } from "../../../shared/domain/DomainError.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class InvalidContactEmailError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid email`);
    this.value = value;
  }
}

export class ContactEmail {
  constructor(value) {
    if (typeof value !== "string" || !EMAIL.test(value)) throw new InvalidContactEmailError(value);
    this.value = value;
  }
}

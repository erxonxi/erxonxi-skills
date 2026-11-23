import { DomainError } from "./DomainError.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export class InvalidUuidError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid uuid`);
    this.value = value;
  }
}

export class Uuid {
  constructor(value) {
    if (typeof value !== "string" || !UUID.test(value)) throw this.invalid(value);
    this.value = value;
  }

  invalid(value) {
    return new InvalidUuidError(value);
  }

  equals(other) {
    return other instanceof this.constructor && other.value === this.value;
  }
}

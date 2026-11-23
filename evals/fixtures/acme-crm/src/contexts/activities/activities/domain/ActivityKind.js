import { DomainError } from "../../../shared/domain/DomainError.js";

const KINDS = ["call", "meeting", "note"];

export class InvalidActivityKindError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid activity kind`);
    this.value = value;
  }
}

export class ActivityKind {
  constructor(value) {
    if (!KINDS.includes(value)) throw new InvalidActivityKindError(value);
    this.value = value;
  }
}

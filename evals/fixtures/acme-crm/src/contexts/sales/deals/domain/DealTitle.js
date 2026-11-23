import { DomainError } from "../../../shared/domain/DomainError.js";

export class InvalidDealTitleError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid deal title`);
    this.value = value;
  }
}

export class DealTitle {
  constructor(value) {
    if (typeof value !== "string" || value.trim() === "") throw new InvalidDealTitleError(value);
    this.value = value;
  }
}

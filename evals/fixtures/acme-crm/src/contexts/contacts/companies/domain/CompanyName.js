import { DomainError } from "../../../shared/domain/DomainError.js";

export class InvalidCompanyNameError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid company name`);
    this.value = value;
  }
}

export class CompanyName {
  constructor(value) {
    if (typeof value !== "string" || value.trim() === "") throw new InvalidCompanyNameError(value);
    this.value = value;
  }
}

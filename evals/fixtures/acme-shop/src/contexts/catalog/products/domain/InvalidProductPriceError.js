import { DomainError } from "../../../shared/domain/DomainError.js";

export class InvalidProductPriceError extends DomainError {
  constructor(value) {
    super(`invalid price <${value}>`);
    this.value = value;
  }
}

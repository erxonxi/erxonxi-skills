import { DomainError } from "../../../shared/domain/DomainError.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class InvalidShopperEmailError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid email`);
    this.value = value;
  }
}

export class ShopperEmail {
  constructor(value) {
    if (typeof value !== "string" || !EMAIL.test(value)) throw new InvalidShopperEmailError(value);
    this.value = value;
  }
}

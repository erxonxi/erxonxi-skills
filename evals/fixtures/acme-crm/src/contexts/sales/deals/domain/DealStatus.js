import { DomainError } from "../../../shared/domain/DomainError.js";

const STATUSES = ["open", "won", "lost"];

export class InvalidDealStatusError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid deal status`);
    this.value = value;
  }
}

export class DealStatus {
  constructor(value) {
    if (!STATUSES.includes(value)) throw new InvalidDealStatusError(value);
    this.value = value;
  }

  static open() {
    return new DealStatus("open");
  }

  static won() {
    return new DealStatus("won");
  }

  static lost() {
    return new DealStatus("lost");
  }

  isOpen() {
    return this.value === "open";
  }
}

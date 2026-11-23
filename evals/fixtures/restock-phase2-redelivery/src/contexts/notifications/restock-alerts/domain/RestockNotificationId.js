import { DomainError } from "../../../shared/domain/DomainError.js";
import { Uuid } from "../../../shared/domain/Uuid.js";

export class InvalidRestockNotificationIdError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid restock notification id`);
    this.value = value;
  }
}

export class RestockNotificationId extends Uuid {
  invalid(value) {
    return new InvalidRestockNotificationIdError(value);
  }
}

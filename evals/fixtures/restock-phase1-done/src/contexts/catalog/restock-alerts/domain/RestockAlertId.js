import { DomainError } from "../../../shared/domain/DomainError.js";
import { Uuid } from "../../../shared/domain/Uuid.js";

export class InvalidRestockAlertIdError extends DomainError {
  constructor(value) {
    super(`<${value}> is not a valid restock alert id`);
    this.value = value;
  }
}

export class RestockAlertId extends Uuid {
  invalid(value) {
    return new InvalidRestockAlertIdError(value);
  }
}

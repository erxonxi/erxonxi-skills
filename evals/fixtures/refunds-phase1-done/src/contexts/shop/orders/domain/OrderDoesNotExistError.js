import { DomainError } from "../../../shared/domain/DomainError.js";

export class OrderDoesNotExistError extends DomainError {
  constructor(id) {
    super(`The order <${id}> does not exist`);
    this.id = id;
  }
}

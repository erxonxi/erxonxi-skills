import { DomainError } from "../../../shared/domain/DomainError.js";

export class CartDoesNotExistError extends DomainError {
  constructor(id) {
    super(`The cart <${id}> does not exist`);
    this.id = id;
  }
}

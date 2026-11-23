import { DomainError } from "../../../shared/domain/DomainError.js";

export class CartAlreadyExistsError extends DomainError {
  constructor(id) {
    super(`The cart <${id}> already exists`);
    this.id = id;
  }
}

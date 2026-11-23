import { DomainError } from "../../../shared/domain/DomainError.js";

export class ProductAlreadyExistsError extends DomainError {
  constructor(id) {
    super(`The product <${id}> already exists`);
    this.id = id;
  }
}

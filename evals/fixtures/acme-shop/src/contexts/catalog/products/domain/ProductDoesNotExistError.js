import { DomainError } from "../../../shared/domain/DomainError.js";

export class ProductDoesNotExistError extends DomainError {
  constructor(id) {
    super(`The product <${id}> does not exist`);
    this.id = id;
  }
}

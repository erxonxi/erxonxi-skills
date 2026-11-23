import { DomainError } from "../../../shared/domain/DomainError.js";

export class CatalogItemDoesNotExistError extends DomainError {
  constructor(id) {
    super(`The catalog item <${id}> does not exist`);
    this.id = id;
  }
}

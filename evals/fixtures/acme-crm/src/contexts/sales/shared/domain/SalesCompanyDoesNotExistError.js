import { DomainError } from "../../../shared/domain/DomainError.js";

export class SalesCompanyDoesNotExistError extends DomainError {
  constructor(id) {
    super(`The company <${id}> does not exist`);
    this.id = id;
  }
}

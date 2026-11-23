import { DomainError } from "../../../shared/domain/DomainError.js";

export class CompanyDoesNotExistError extends DomainError {
  constructor(id) {
    super(`The company <${id}> does not exist`);
    this.id = id;
  }
}

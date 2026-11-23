import { DomainError } from "../../../shared/domain/DomainError.js";

export class CompanyAlreadyExistsError extends DomainError {
  constructor(id) {
    super(`The company <${id}> already exists`);
    this.id = id;
  }
}

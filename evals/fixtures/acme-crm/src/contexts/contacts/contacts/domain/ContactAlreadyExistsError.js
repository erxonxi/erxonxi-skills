import { DomainError } from "../../../shared/domain/DomainError.js";

export class ContactAlreadyExistsError extends DomainError {
  constructor(id) {
    super(`The contact <${id}> already exists`);
    this.id = id;
  }
}

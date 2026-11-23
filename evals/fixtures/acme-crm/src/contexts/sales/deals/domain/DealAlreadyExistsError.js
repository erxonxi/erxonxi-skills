import { DomainError } from "../../../shared/domain/DomainError.js";

export class DealAlreadyExistsError extends DomainError {
  constructor(id) {
    super(`The deal <${id}> already exists`);
    this.id = id;
  }
}

import { DomainError } from "../../../shared/domain/DomainError.js";

export class DealDoesNotExistError extends DomainError {
  constructor(id) {
    super(`The deal <${id}> does not exist`);
    this.id = id;
  }
}

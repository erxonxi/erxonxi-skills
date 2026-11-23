import { DomainError } from "../../../shared/domain/DomainError.js";

export class DealAlreadyClosedError extends DomainError {
  constructor(id, status) {
    super(`The deal <${id}> is already ${status}`);
    this.id = id;
    this.status = status;
  }
}

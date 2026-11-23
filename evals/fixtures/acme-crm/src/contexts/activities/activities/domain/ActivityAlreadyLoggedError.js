import { DomainError } from "../../../shared/domain/DomainError.js";

export class ActivityAlreadyLoggedError extends DomainError {
  constructor(id) {
    super(`The activity <${id}> was already logged`);
    this.id = id;
  }
}

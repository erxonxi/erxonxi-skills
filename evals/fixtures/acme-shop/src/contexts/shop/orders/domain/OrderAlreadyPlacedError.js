import { DomainError } from "../../../shared/domain/DomainError.js";

export class OrderAlreadyPlacedError extends DomainError {
  constructor(id) {
    super(`The order <${id}> was already placed`);
    this.id = id;
  }
}

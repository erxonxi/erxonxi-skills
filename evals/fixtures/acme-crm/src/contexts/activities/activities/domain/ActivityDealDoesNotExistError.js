import { DomainError } from "../../../shared/domain/DomainError.js";

export class ActivityDealDoesNotExistError extends DomainError {
  constructor(dealId) {
    super(`The deal <${dealId}> does not exist`);
    this.dealId = dealId;
  }
}

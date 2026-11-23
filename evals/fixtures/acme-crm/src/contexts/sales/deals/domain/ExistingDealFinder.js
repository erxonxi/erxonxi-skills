import { DealDoesNotExistError } from "./DealDoesNotExistError.js";

export class ExistingDealFinder {
  constructor(repository) {
    this.repository = repository;
  }

  async find(id) {
    const deal = await this.repository.search(id);
    if (deal === null) throw new DealDoesNotExistError(id.value);
    return deal;
  }
}

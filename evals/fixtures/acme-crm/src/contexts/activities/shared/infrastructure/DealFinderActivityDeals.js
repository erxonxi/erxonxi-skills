import { ActivityDeals } from "../domain/ActivityDeals.js";

/** Adapter of the activities port: calls the public use case of sales. */
export class DealFinderActivityDeals extends ActivityDeals {
  constructor(dealFinder) {
    super();
    this.dealFinder = dealFinder;
  }

  async exists(dealId) {
    try {
      await this.dealFinder.find(dealId.value);
      return true;
    } catch (error) {
      if (error.name === "DealDoesNotExistError") return false;
      throw error;
    }
  }
}

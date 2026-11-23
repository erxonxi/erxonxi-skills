import { DealId } from "../../domain/DealId.js";
import { ExistingDealFinder } from "../../domain/ExistingDealFinder.js";

export class DealFinder {
  constructor(repository) {
    this.finder = new ExistingDealFinder(repository);
  }

  async find(id) {
    const deal = await this.finder.find(new DealId(id));
    return deal.toPrimitives();
  }
}

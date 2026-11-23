import { DealId } from "../domain/DealId.js";
import { ExistingDealFinder } from "../domain/ExistingDealFinder.js";

export class DealService {
  constructor(repository) {
    this.repository = repository;
    this.finder = new ExistingDealFinder(repository);
  }

  async rename(id, title) {
    const deal = await this.finder.find(new DealId(id));
    deal.rename(title);
    await this.repository.save(deal);
  }

  async changeAmount(id, amountCents) {
    const deal = await this.finder.find(new DealId(id));
    deal.changeAmount(amountCents);
    await this.repository.save(deal);
  }
}

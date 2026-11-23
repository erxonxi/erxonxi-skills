import { DealId } from "../../domain/DealId.js";
import { ExistingDealFinder } from "../../domain/ExistingDealFinder.js";

export class DealLoser {
  constructor(repository, eventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.finder = new ExistingDealFinder(repository);
  }

  async lose(id, reason) {
    const deal = await this.finder.find(new DealId(id));
    deal.lose(reason);
    await this.repository.save(deal);
    await this.eventBus.publish(deal.pullDomainEvents());
  }
}

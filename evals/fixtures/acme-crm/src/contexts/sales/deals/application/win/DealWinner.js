import { DealId } from "../../domain/DealId.js";
import { ExistingDealFinder } from "../../domain/ExistingDealFinder.js";

export class DealWinner {
  constructor(repository, eventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.finder = new ExistingDealFinder(repository);
  }

  async win(id) {
    const deal = await this.finder.find(new DealId(id));
    deal.win();
    await this.repository.save(deal);
    await this.eventBus.publish(deal.pullDomainEvents());
  }
}

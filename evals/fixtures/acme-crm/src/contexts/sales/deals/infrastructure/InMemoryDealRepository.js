import { DealRepository } from "../domain/DealRepository.js";
import { Deal } from "../domain/Deal.js";

export class InMemoryDealRepository extends DealRepository {
  constructor() {
    super();
    this.deals = new Map();
  }

  async save(deal) {
    this.deals.set(deal.id.value, deal.toPrimitives());
  }

  async search(id) {
    const primitives = this.deals.get(id.value);
    return primitives === undefined ? null : Deal.fromPrimitives(primitives);
  }

  async searchByCompany(companyId) {
    return [...this.deals.values()]
      .filter((primitives) => primitives.companyId === companyId.value)
      .map(Deal.fromPrimitives);
  }
}

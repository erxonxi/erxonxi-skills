import { ActivityDealId } from "../../../shared/domain/ActivityDealId.js";

export class ActivitiesByDealSearcher {
  constructor(repository) {
    this.repository = repository;
  }

  async search(dealId) {
    const activities = await this.repository.searchByDeal(new ActivityDealId(dealId));
    return activities.map((activity) => activity.toPrimitives());
  }
}

import { ActivityRepository } from "../domain/ActivityRepository.js";
import { Activity } from "../domain/Activity.js";

export class InMemoryActivityRepository extends ActivityRepository {
  constructor() {
    super();
    this.activities = new Map();
  }

  async save(activity) {
    this.activities.set(activity.id.value, activity.toPrimitives());
  }

  async search(id) {
    const primitives = this.activities.get(id.value);
    return primitives === undefined ? null : Activity.fromPrimitives(primitives);
  }

  async searchByDeal(dealId) {
    return [...this.activities.values()]
      .filter((primitives) => primitives.dealId === dealId.value)
      .map(Activity.fromPrimitives);
  }
}

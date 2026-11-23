/**
 * Port. Implementations: InMemoryActivityRepository.
 *
 * save(activity: Activity): Promise<void>
 * search(id: ActivityId): Promise<Activity | null>
 * searchByDeal(dealId: ActivityDealId): Promise<Activity[]>
 */
export class ActivityRepository {
  async save(_activity) { throw new Error("not implemented"); }
  async search(_id) { throw new Error("not implemented"); }
  async searchByDeal(_dealId) { throw new Error("not implemented"); }
}

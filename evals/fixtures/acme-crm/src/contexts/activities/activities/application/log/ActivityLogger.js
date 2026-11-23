import { Activity } from "../../domain/Activity.js";
import { ActivityId } from "../../domain/ActivityId.js";
import { ActivityAlreadyLoggedError } from "../../domain/ActivityAlreadyLoggedError.js";
import { ActivityDealDoesNotExistError } from "../../domain/ActivityDealDoesNotExistError.js";
import { ActivityDealId } from "../../../shared/domain/ActivityDealId.js";

export class ActivityLogger {
  constructor(repository, deals, clock, eventBus) {
    this.repository = repository;
    this.deals = deals;
    this.clock = clock;
    this.eventBus = eventBus;
  }

  async log(id, dealId, kind, summary) {
    const activity = Activity.log(id, dealId, kind, summary, this.clock.now());
    if (!(await this.deals.exists(new ActivityDealId(dealId)))) throw new ActivityDealDoesNotExistError(dealId);
    if ((await this.repository.search(new ActivityId(id))) !== null) throw new ActivityAlreadyLoggedError(id);
    await this.repository.save(activity);
    await this.eventBus.publish(activity.pullDomainEvents());
  }
}

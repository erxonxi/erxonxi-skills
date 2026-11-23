import { ActivityLoggedDomainEvent } from "../../../../../src/contexts/activities/activities/domain/ActivityLoggedDomainEvent.js";

export class ActivityLoggedDomainEventMother {
  static fromActivity(activity) {
    return new ActivityLoggedDomainEvent(activity.id.value, activity.dealId.value, activity.kind.value);
  }
}

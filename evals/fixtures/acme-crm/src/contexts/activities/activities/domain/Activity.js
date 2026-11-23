import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { ActivityDealId } from "../../shared/domain/ActivityDealId.js";
import { ActivityId } from "./ActivityId.js";
import { ActivityKind } from "./ActivityKind.js";
import { ActivityLoggedDomainEvent } from "./ActivityLoggedDomainEvent.js";

export class Activity extends AggregateRoot {
  constructor(id, dealId, kind, summary, loggedAt) {
    super();
    this.id = id;
    this.dealId = dealId;
    this.kind = kind;
    this.summary = summary;
    this.loggedAt = loggedAt;
  }

  static log(id, dealId, kind, summary, loggedAt) {
    const activity = Activity.fromPrimitives({ id, dealId, kind, summary, loggedAt: loggedAt.toISOString() });
    activity.record(new ActivityLoggedDomainEvent(id, dealId, kind));
    return activity;
  }

  static fromPrimitives({ id, dealId, kind, summary, loggedAt }) {
    return new Activity(new ActivityId(id), new ActivityDealId(dealId), new ActivityKind(kind), summary, new Date(loggedAt));
  }

  toPrimitives() {
    return {
      id: this.id.value,
      dealId: this.dealId.value,
      kind: this.kind.value,
      summary: this.summary,
      loggedAt: this.loggedAt.toISOString(),
    };
  }
}

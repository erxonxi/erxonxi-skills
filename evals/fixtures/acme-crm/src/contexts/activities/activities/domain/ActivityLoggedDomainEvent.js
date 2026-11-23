import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class ActivityLoggedDomainEvent extends DomainEvent {
  constructor(aggregateId, dealId, kind) {
    super("acme.activities.activity.logged", aggregateId, { dealId, kind });
  }
}

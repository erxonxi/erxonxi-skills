import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class RestockAlertRequestedDomainEvent extends DomainEvent {
  constructor(aggregateId, productId, email) {
    super("acme.catalog.restock_alert.requested", aggregateId, { productId, email });
  }
}

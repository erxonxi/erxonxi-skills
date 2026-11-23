import { RestockAlertRequestedDomainEvent } from "../../../../../src/contexts/catalog/restock-alerts/domain/RestockAlertRequestedDomainEvent.js";

export class RestockAlertRequestedDomainEventMother {
  static fromAlert(alert) {
    const { id, productId, email } = alert.toPrimitives();
    return new RestockAlertRequestedDomainEvent(id, productId, email);
  }
}

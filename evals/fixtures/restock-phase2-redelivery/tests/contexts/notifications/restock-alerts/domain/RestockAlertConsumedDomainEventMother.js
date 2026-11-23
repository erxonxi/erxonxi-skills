import { DomainEvent } from "../../../../../src/contexts/shared/domain/DomainEvent.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class RestockAlertConsumedDomainEventMother {
  static create(overrides) {
    const { alertId, productId, email } = {
      alertId: UuidMother.create(),
      productId: UuidMother.create(),
      email: `shopper${Math.floor(Math.random() * 1000)}@example.com`,
      ...overrides,
    };
    return new DomainEvent("acme.catalog.restock_alert.consumed", alertId, { productId, email });
  }
}

import { RestockNotification } from "../../../../../src/contexts/notifications/restock-alerts/domain/RestockNotification.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class RestockNotificationMother {
  static create(overrides) {
    return RestockNotification.fromPrimitives({
      id: UuidMother.create(),
      productId: UuidMother.create(),
      email: `shopper${Math.floor(Math.random() * 1000)}@example.com`,
      ...overrides,
    });
  }
}

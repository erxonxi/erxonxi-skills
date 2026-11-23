import { randomUUID } from "node:crypto";
import { RestockAlert } from "../../../../../src/contexts/catalog/restock-alerts/domain/RestockAlert.js";

export class RestockAlertMother {
  static create(overrides) {
    return RestockAlert.fromPrimitives({
      id: randomUUID(),
      productId: randomUUID(),
      email: `shopper-${Math.floor(Math.random() * 1000)}@example.com`,
      ...overrides,
    });
  }
}

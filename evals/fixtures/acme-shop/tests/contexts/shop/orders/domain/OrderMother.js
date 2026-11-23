import { Order } from "../../../../../src/contexts/shop/orders/domain/Order.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class OrderMother {
  static create(overrides) {
    return Order.fromPrimitives({
      id: UuidMother.create(),
      shopperEmail: `shopper${Math.floor(Math.random() * 1000)}@example.com`,
      lines: [{ itemId: UuidMother.create(), name: "item", priceCents: 500, quantity: 1 }],
      placedAt: new Date().toISOString(),
      ...overrides,
    });
  }
}

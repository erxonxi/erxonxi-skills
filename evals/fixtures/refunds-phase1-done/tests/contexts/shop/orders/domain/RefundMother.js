import { Refund } from "../../../../../src/contexts/shop/orders/domain/Refund.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class RefundMother {
  static create(overrides) {
    return Refund.fromPrimitives({
      id: UuidMother.create(),
      orderId: UuidMother.create(),
      lines: [{ itemId: UuidMother.create(), refundedCents: 100 }],
      ...overrides,
    });
  }
}

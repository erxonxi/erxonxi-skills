import { Deal } from "../../../../../src/contexts/sales/deals/domain/Deal.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class DealMother {
  static create(overrides) {
    return Deal.fromPrimitives({
      id: UuidMother.create(),
      companyId: UuidMother.create(),
      companyName: `company-${Math.floor(Math.random() * 1000)}`,
      title: `deal-${Math.floor(Math.random() * 1000)}`,
      amountCents: Math.floor(Math.random() * 100000),
      ownerEmail: `owner${Math.floor(Math.random() * 1000)}@example.com`,
      status: "open",
      lostReason: null,
      ...overrides,
    });
  }

  static won() {
    return DealMother.create({ status: "won" });
  }
}

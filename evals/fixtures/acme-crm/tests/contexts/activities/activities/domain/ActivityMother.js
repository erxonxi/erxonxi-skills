import { Activity } from "../../../../../src/contexts/activities/activities/domain/Activity.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class ActivityMother {
  static create(overrides) {
    return Activity.fromPrimitives({
      id: UuidMother.create(),
      dealId: UuidMother.create(),
      kind: "call",
      summary: `summary-${Math.floor(Math.random() * 1000)}`,
      loggedAt: new Date().toISOString(),
      ...overrides,
    });
  }
}

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ActivityLogger } from "../../../../../../src/contexts/activities/activities/application/log/ActivityLogger.js";
import { ActivityDealDoesNotExistError } from "../../../../../../src/contexts/activities/activities/domain/ActivityDealDoesNotExistError.js";
import { InvalidActivityKindError } from "../../../../../../src/contexts/activities/activities/domain/ActivityKind.js";
import { ActivityMother } from "../../domain/ActivityMother.js";
import { ActivityLoggedDomainEventMother } from "../../domain/ActivityLoggedDomainEventMother.js";
import { MockActivityRepository } from "../../domain/MockActivityRepository.js";
import { MockActivityDeals } from "../../../shared/domain/MockActivityDeals.js";
import { MockClock } from "../../../../shared/domain/MockClock.js";
import { MockEventBus } from "../../../../shared/domain/MockEventBus.js";

function scenario() {
  const repository = new MockActivityRepository();
  const deals = new MockActivityDeals();
  const clock = new MockClock();
  const eventBus = new MockEventBus();
  const loggedAt = new Date("2026-11-20T10:00:00Z");
  clock.shouldReturn(loggedAt);
  repository.shouldSearchAndReturnNull();
  return { repository, deals, eventBus, loggedAt, logger: new ActivityLogger(repository, deals, clock, eventBus) };
}

describe("ActivityLogger should", () => {
  it("log an activity against an existing deal and publish the event", async () => {
    const { repository, deals, eventBus, loggedAt, logger } = scenario();
    const expected = ActivityMother.create({ kind: "meeting", loggedAt: loggedAt.toISOString() });
    deals.shouldFind(expected.dealId.value);

    await logger.log(expected.id.value, expected.dealId.value, "meeting", expected.summary);

    repository.assertSaved(expected);
    eventBus.assertPublished([ActivityLoggedDomainEventMother.fromActivity(expected)]);
  });

  it("fail when the deal does not exist", async () => {
    const { logger } = scenario();
    const activity = ActivityMother.create();

    await assert.rejects(logger.log(activity.id.value, activity.dealId.value, "call", "hi"), ActivityDealDoesNotExistError);
  });

  it("fail with an unknown kind", async () => {
    const { deals, logger } = scenario();
    const activity = ActivityMother.create();
    deals.shouldFind(activity.dealId.value);

    await assert.rejects(logger.log(activity.id.value, activity.dealId.value, "fax", "hi"), InvalidActivityKindError);
  });
});

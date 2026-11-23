import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ActivitiesByDealSearcher } from "../../../../../../src/contexts/activities/activities/application/search/ActivitiesByDealSearcher.js";
import { ActivityMother } from "../../domain/ActivityMother.js";
import { MockActivityRepository } from "../../domain/MockActivityRepository.js";
import { UuidMother } from "../../../../shared/domain/UuidMother.js";

describe("ActivitiesByDealSearcher should", () => {
  it("return the activities of a deal", async () => {
    const repository = new MockActivityRepository();
    const activities = [ActivityMother.create(), ActivityMother.create({ kind: "note" })];
    repository.shouldSearchByDeal(activities);

    const found = await new ActivitiesByDealSearcher(repository).search(UuidMother.create());

    assert.deepEqual(found, activities.map((a) => a.toPrimitives()));
  });
});

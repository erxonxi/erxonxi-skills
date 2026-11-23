import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DealFinderActivityDeals } from "../../../../../src/contexts/activities/shared/infrastructure/DealFinderActivityDeals.js";
import { ActivityDealId } from "../../../../../src/contexts/activities/shared/domain/ActivityDealId.js";
import { DealFinder } from "../../../../../src/contexts/sales/deals/application/find/DealFinder.js";
import { InMemoryDealRepository } from "../../../../../src/contexts/sales/deals/infrastructure/InMemoryDealRepository.js";
import { DealMother } from "../../../sales/deals/domain/DealMother.js";

describe("DealFinderActivityDeals should", () => {
  it("tell whether a deal exists", async () => {
    const repository = new InMemoryDealRepository();
    const deal = DealMother.create();
    await repository.save(deal);
    const adapter = new DealFinderActivityDeals(new DealFinder(repository));

    assert.equal(await adapter.exists(new ActivityDealId(deal.id.value)), true);
    assert.equal(await adapter.exists(new ActivityDealId(DealMother.create().id.value)), false);
  });
});

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DealLoser } from "../../../../../../src/contexts/sales/deals/application/lose/DealLoser.js";
import { DealAlreadyClosedError } from "../../../../../../src/contexts/sales/deals/domain/DealAlreadyClosedError.js";
import { DealMother } from "../../domain/DealMother.js";
import { DealEventsMother } from "../../domain/DealEventsMother.js";
import { MockDealRepository } from "../../domain/MockDealRepository.js";
import { MockEventBus } from "../../../../shared/domain/MockEventBus.js";

describe("DealLoser should", () => {
  it("lose an open deal with a reason and publish the event", async () => {
    const repository = new MockDealRepository();
    const eventBus = new MockEventBus();
    const deal = DealMother.create();
    const expected = DealMother.create({ ...deal.toPrimitives(), status: "lost", lostReason: "too expensive" });
    repository.shouldSearch(deal);

    await new DealLoser(repository, eventBus).lose(deal.id.value, "too expensive");

    repository.assertSaved(expected);
    eventBus.assertPublished([DealEventsMother.lostFrom(expected, "too expensive")]);
  });

  it("fail when the deal was already won", async () => {
    const repository = new MockDealRepository();
    const deal = DealMother.won();
    repository.shouldSearch(deal);

    await assert.rejects(new DealLoser(repository, new MockEventBus()).lose(deal.id.value, "late"), DealAlreadyClosedError);
  });
});

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DealWinner } from "../../../../../../src/contexts/sales/deals/application/win/DealWinner.js";
import { DealDoesNotExistError } from "../../../../../../src/contexts/sales/deals/domain/DealDoesNotExistError.js";
import { DealAlreadyClosedError } from "../../../../../../src/contexts/sales/deals/domain/DealAlreadyClosedError.js";
import { DealMother } from "../../domain/DealMother.js";
import { DealEventsMother } from "../../domain/DealEventsMother.js";
import { MockDealRepository } from "../../domain/MockDealRepository.js";
import { MockEventBus } from "../../../../shared/domain/MockEventBus.js";

describe("DealWinner should", () => {
  it("win an open deal and publish the event", async () => {
    const repository = new MockDealRepository();
    const eventBus = new MockEventBus();
    const deal = DealMother.create();
    const expected = DealMother.create({ ...deal.toPrimitives(), status: "won" });
    repository.shouldSearch(deal);

    await new DealWinner(repository, eventBus).win(deal.id.value);

    repository.assertSaved(expected);
    eventBus.assertPublished([DealEventsMother.wonFrom(expected)]);
  });

  it("fail when the deal does not exist", async () => {
    const repository = new MockDealRepository();
    repository.shouldSearchAndReturnNull();

    await assert.rejects(new DealWinner(repository, new MockEventBus()).win(DealMother.create().id.value), DealDoesNotExistError);
  });

  it("fail when the deal is already won and publish nothing", async () => {
    const repository = new MockDealRepository();
    const eventBus = new MockEventBus();
    const deal = DealMother.won();
    repository.shouldSearch(deal);

    await assert.rejects(new DealWinner(repository, eventBus).win(deal.id.value), DealAlreadyClosedError);
    eventBus.assertNothingPublished();
  });
});

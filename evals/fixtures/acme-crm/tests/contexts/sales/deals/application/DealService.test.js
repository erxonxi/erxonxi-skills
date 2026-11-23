import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DealService } from "../../../../../src/contexts/sales/deals/application/DealService.js";
import { DealAlreadyClosedError } from "../../../../../src/contexts/sales/deals/domain/DealAlreadyClosedError.js";
import { DealMother } from "../domain/DealMother.js";
import { MockDealRepository } from "../domain/MockDealRepository.js";

describe("DealService should", () => {
  it("rename an open deal", async () => {
    const repository = new MockDealRepository();
    const deal = DealMother.create();
    const expected = DealMother.create({ ...deal.toPrimitives(), title: "Renewal 2027" });
    repository.shouldSearch(deal);

    await new DealService(repository).rename(deal.id.value, "Renewal 2027");

    repository.assertSaved(expected);
  });

  it("change the amount of an open deal", async () => {
    const repository = new MockDealRepository();
    const deal = DealMother.create();
    const expected = DealMother.create({ ...deal.toPrimitives(), amountCents: 99900 });
    repository.shouldSearch(deal);

    await new DealService(repository).changeAmount(deal.id.value, 99900);

    repository.assertSaved(expected);
  });

  it("not change the amount of a closed deal", async () => {
    const repository = new MockDealRepository();
    const deal = DealMother.won();
    repository.shouldSearch(deal);

    await assert.rejects(new DealService(repository).changeAmount(deal.id.value, 1), DealAlreadyClosedError);
  });
});

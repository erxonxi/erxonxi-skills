import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DealsByCompanySearcher } from "../../../../../../src/contexts/sales/deals/application/search/DealsByCompanySearcher.js";
import { DealMother } from "../../domain/DealMother.js";
import { MockDealRepository } from "../../domain/MockDealRepository.js";
import { UuidMother } from "../../../../shared/domain/UuidMother.js";

describe("DealsByCompanySearcher should", () => {
  it("return the deals of a company", async () => {
    const repository = new MockDealRepository();
    const deals = [DealMother.create(), DealMother.won()];
    repository.shouldSearchByCompany(deals);

    const found = await new DealsByCompanySearcher(repository).search(UuidMother.create());

    assert.deepEqual(found, deals.map((d) => d.toPrimitives()));
  });
});

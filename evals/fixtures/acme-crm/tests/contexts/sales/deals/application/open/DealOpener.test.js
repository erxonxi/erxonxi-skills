import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DealOpener } from "../../../../../../src/contexts/sales/deals/application/open/DealOpener.js";
import { SalesCompanyDoesNotExistError } from "../../../../../../src/contexts/sales/shared/domain/SalesCompanyDoesNotExistError.js";
import { InvalidDealAmountError } from "../../../../../../src/contexts/sales/deals/domain/DealAmount.js";
import { DealMother } from "../../domain/DealMother.js";
import { MockDealRepository } from "../../domain/MockDealRepository.js";
import { SalesCompanyMother } from "../../../shared/domain/SalesCompanyMother.js";
import { MockSalesCompanies } from "../../../shared/domain/MockSalesCompanies.js";

describe("DealOpener should", () => {
  it("open a deal keeping its own copy of the company name", async () => {
    const repository = new MockDealRepository();
    const companies = new MockSalesCompanies();
    const company = SalesCompanyMother.create({ name: "Initech" });
    const expected = DealMother.create({ companyId: company.id.value, companyName: "Initech" });
    companies.shouldSearch(company);
    repository.shouldSearchAndReturnNull();

    const { id, companyId, title, amountCents, ownerEmail } = expected.toPrimitives();
    await new DealOpener(repository, companies).open(id, companyId, title, amountCents, ownerEmail);

    repository.assertSaved(expected);
  });

  it("fail when the company does not exist", async () => {
    const repository = new MockDealRepository();
    const companies = new MockSalesCompanies();
    const { id, companyId, title, amountCents, ownerEmail } = DealMother.create().toPrimitives();

    await assert.rejects(
      new DealOpener(repository, companies).open(id, companyId, title, amountCents, ownerEmail),
      SalesCompanyDoesNotExistError,
    );
  });

  it("fail with a negative amount", async () => {
    const repository = new MockDealRepository();
    const companies = new MockSalesCompanies();
    const company = SalesCompanyMother.create();
    companies.shouldSearch(company);
    const { id, title, ownerEmail } = DealMother.create().toPrimitives();

    await assert.rejects(
      new DealOpener(repository, companies).open(id, company.id.value, title, -1, ownerEmail),
      InvalidDealAmountError,
    );
  });
});

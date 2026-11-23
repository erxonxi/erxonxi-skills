import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CompanyFinderSalesCompanies } from "../../../../../src/contexts/sales/shared/infrastructure/CompanyFinderSalesCompanies.js";
import { SalesCompanyId } from "../../../../../src/contexts/sales/shared/domain/SalesCompanyId.js";
import { CompanyFinder } from "../../../../../src/contexts/contacts/companies/application/find/CompanyFinder.js";
import { InMemoryCompanyRepository } from "../../../../../src/contexts/contacts/companies/infrastructure/InMemoryCompanyRepository.js";
import { CompanyMother } from "../../../contacts/companies/domain/CompanyMother.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

describe("CompanyFinderSalesCompanies should", () => {
  it("map a company to the sales view of it", async () => {
    const repository = new InMemoryCompanyRepository();
    const company = CompanyMother.create();
    await repository.save(company);

    const found = await new CompanyFinderSalesCompanies(new CompanyFinder(repository)).search(new SalesCompanyId(company.id.value));

    assert.deepEqual({ id: found.id.value, name: found.name }, { id: company.id.value, name: company.name.value });
  });

  it("return null when the company does not exist", async () => {
    const adapter = new CompanyFinderSalesCompanies(new CompanyFinder(new InMemoryCompanyRepository()));

    assert.equal(await adapter.search(new SalesCompanyId(UuidMother.create())), null);
  });
});

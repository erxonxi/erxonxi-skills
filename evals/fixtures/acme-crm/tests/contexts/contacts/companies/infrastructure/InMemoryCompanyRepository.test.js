import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InMemoryCompanyRepository } from "../../../../../src/contexts/contacts/companies/infrastructure/InMemoryCompanyRepository.js";
import { CompanyMother } from "../domain/CompanyMother.js";

describe("InMemoryCompanyRepository should", () => {
  it("return null searching a company that was never saved", async () => {
    assert.equal(await new InMemoryCompanyRepository().search(CompanyMother.create().id), null);
  });

  it("return a saved company", async () => {
    const repository = new InMemoryCompanyRepository();
    const company = CompanyMother.create();
    await repository.save(company);

    assert.deepEqual((await repository.search(company.id)).toPrimitives(), company.toPrimitives());
  });
});

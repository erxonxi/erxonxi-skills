import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CompanyCreator } from "../../../../../../src/contexts/contacts/companies/application/create/CompanyCreator.js";
import { CompanyAlreadyExistsError } from "../../../../../../src/contexts/contacts/companies/domain/CompanyAlreadyExistsError.js";
import { CompanyMother } from "../../domain/CompanyMother.js";
import { MockCompanyRepository } from "../../domain/MockCompanyRepository.js";

describe("CompanyCreator should", () => {
  it("create a company", async () => {
    const repository = new MockCompanyRepository();
    const expected = CompanyMother.create();
    repository.shouldSearchAndReturnNull();

    await new CompanyCreator(repository).create(expected.id.value, expected.name.value);

    repository.assertSaved(expected);
  });

  it("fail when the company already exists", async () => {
    const repository = new MockCompanyRepository();
    const existing = CompanyMother.create();
    repository.shouldSearch(existing);

    await assert.rejects(new CompanyCreator(repository).create(existing.id.value, existing.name.value), CompanyAlreadyExistsError);
  });
});

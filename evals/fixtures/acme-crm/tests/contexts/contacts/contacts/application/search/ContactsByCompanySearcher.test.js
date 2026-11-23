import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ContactsByCompanySearcher } from "../../../../../../src/contexts/contacts/contacts/application/search/ContactsByCompanySearcher.js";
import { ContactMother } from "../../domain/ContactMother.js";
import { MockContactRepository } from "../../domain/MockContactRepository.js";
import { UuidMother } from "../../../../shared/domain/UuidMother.js";

describe("ContactsByCompanySearcher should", () => {
  it("return the contacts of a company", async () => {
    const repository = new MockContactRepository();
    const contacts = [ContactMother.create(), ContactMother.create()];
    repository.shouldSearchByCompany(contacts);

    const found = await new ContactsByCompanySearcher(repository).search(UuidMother.create());

    assert.deepEqual(found, contacts.map((c) => c.toPrimitives()));
  });

  it("return at most the requested number of contacts", async () => {
    const repository = new MockContactRepository();
    repository.shouldSearchByCompany([ContactMother.create(), ContactMother.create(), ContactMother.create()]);

    assert.equal((await new ContactsByCompanySearcher(repository).search(UuidMother.create(), 2)).length, 2);
  });
});

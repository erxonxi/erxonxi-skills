import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InMemoryContactRepository } from "../../../../../src/contexts/contacts/contacts/infrastructure/InMemoryContactRepository.js";
import { CompanyId } from "../../../../../src/contexts/contacts/companies/domain/CompanyId.js";
import { ContactMother } from "../domain/ContactMother.js";

describe("InMemoryContactRepository should", () => {
  it("return a saved contact", async () => {
    const repository = new InMemoryContactRepository();
    const contact = ContactMother.create();
    await repository.save(contact);

    assert.deepEqual((await repository.search(contact.id)).toPrimitives(), contact.toPrimitives());
  });

  it("return only the contacts of the requested company", async () => {
    const repository = new InMemoryContactRepository();
    const mine = ContactMother.create();
    await repository.save(mine);
    await repository.save(ContactMother.create());

    const found = await repository.searchByCompany(new CompanyId(mine.companyId.value));

    assert.deepEqual(found.map((c) => c.toPrimitives()), [mine.toPrimitives()]);
  });
});

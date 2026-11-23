import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ContactCreator } from "../../../../../../src/contexts/contacts/contacts/application/create/ContactCreator.js";
import { CompanyDoesNotExistError } from "../../../../../../src/contexts/contacts/companies/domain/CompanyDoesNotExistError.js";
import { InvalidContactEmailError } from "../../../../../../src/contexts/contacts/contacts/domain/ContactEmail.js";
import { CompanyMother } from "../../../companies/domain/CompanyMother.js";
import { MockCompanyRepository } from "../../../companies/domain/MockCompanyRepository.js";
import { ContactMother } from "../../domain/ContactMother.js";
import { MockContactRepository } from "../../domain/MockContactRepository.js";

describe("ContactCreator should", () => {
  it("create a contact of an existing company", async () => {
    const contacts = new MockContactRepository();
    const companies = new MockCompanyRepository();
    const company = CompanyMother.create();
    const expected = ContactMother.create({ companyId: company.id.value });
    companies.shouldSearch(company);
    contacts.shouldSearchAndReturnNull();

    const { id, companyId, name, email } = expected.toPrimitives();
    await new ContactCreator(contacts, companies).create(id, companyId, name, email);

    contacts.assertSaved(expected);
  });

  it("fail when the company does not exist", async () => {
    const contacts = new MockContactRepository();
    const companies = new MockCompanyRepository();
    companies.shouldSearchAndReturnNull();
    const { id, companyId, name, email } = ContactMother.create().toPrimitives();

    await assert.rejects(new ContactCreator(contacts, companies).create(id, companyId, name, email), CompanyDoesNotExistError);
  });

  it("fail with an invalid email", async () => {
    const contacts = new MockContactRepository();
    const companies = new MockCompanyRepository();
    const { id, companyId, name } = ContactMother.create().toPrimitives();

    await assert.rejects(new ContactCreator(contacts, companies).create(id, companyId, name, "nope"), InvalidContactEmailError);
  });
});

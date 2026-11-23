import { CompanyId } from "../../../companies/domain/CompanyId.js";

export class ContactsByCompanySearcher {
  constructor(repository) {
    this.repository = repository;
  }

  async search(companyId, limit = 50) {
    const contacts = await this.repository.searchByCompany(new CompanyId(companyId));
    return contacts.slice(0, limit).map((contact) => contact.toPrimitives());
  }
}

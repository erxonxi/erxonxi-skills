/**
 * Port. Implementations: InMemoryContactRepository.
 *
 * save(contact: Contact): Promise<void>
 * search(id: ContactId): Promise<Contact | null>
 * searchByCompany(companyId: CompanyId): Promise<Contact[]>
 */
export class ContactRepository {
  async save(_contact) { throw new Error("not implemented"); }
  async search(_id) { throw new Error("not implemented"); }
  async searchByCompany(_companyId) { throw new Error("not implemented"); }
}

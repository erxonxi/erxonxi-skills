/**
 * Port. Implementations: InMemoryCompanyRepository.
 *
 * save(company: Company): Promise<void>
 * search(id: CompanyId): Promise<Company | null>
 */
export class CompanyRepository {
  async save(_company) { throw new Error("not implemented"); }
  async search(_id) { throw new Error("not implemented"); }
}

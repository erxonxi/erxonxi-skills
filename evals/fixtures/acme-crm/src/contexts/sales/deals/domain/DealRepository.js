/**
 * Port. Implementations: InMemoryDealRepository.
 *
 * save(deal: Deal): Promise<void>
 * search(id: DealId): Promise<Deal | null>
 * searchByCompany(companyId: SalesCompanyId): Promise<Deal[]>
 */
export class DealRepository {
  async save(_deal) { throw new Error("not implemented"); }
  async search(_id) { throw new Error("not implemented"); }
  async searchByCompany(_companyId) { throw new Error("not implemented"); }
}

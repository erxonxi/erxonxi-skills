import { CompanyId } from "../../../../contacts/companies/domain/CompanyId.js";
import { SalesCompanyId } from "../../../shared/domain/SalesCompanyId.js";

export class DealsByCompanySearcher {
  constructor(repository) {
    this.repository = repository;
  }

  async search(companyId) {
    const id = new SalesCompanyId(new CompanyId(companyId).value);
    const deals = await this.repository.searchByCompany(id);
    return deals.map((deal) => deal.toPrimitives());
  }
}

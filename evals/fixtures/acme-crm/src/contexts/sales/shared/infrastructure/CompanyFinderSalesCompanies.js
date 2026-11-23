import { SalesCompanies } from "../domain/SalesCompanies.js";
import { SalesCompany } from "../domain/SalesCompany.js";
import { SalesCompanyId } from "../domain/SalesCompanyId.js";

/** Adapter of the sales port: calls the public use case of contacts and maps its response. */
export class CompanyFinderSalesCompanies extends SalesCompanies {
  constructor(companyFinder) {
    super();
    this.companyFinder = companyFinder;
  }

  async search(id) {
    try {
      const company = await this.companyFinder.find(id.value);
      return new SalesCompany(new SalesCompanyId(company.id), company.name);
    } catch (error) {
      if (error.name === "CompanyDoesNotExistError") return null;
      throw error;
    }
  }
}

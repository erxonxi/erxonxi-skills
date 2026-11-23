import { CompanyId } from "../../domain/CompanyId.js";
import { ExistingCompanyFinder } from "../../domain/ExistingCompanyFinder.js";

export class CompanyFinder {
  constructor(repository) {
    this.finder = new ExistingCompanyFinder(repository);
  }

  async find(id) {
    const company = await this.finder.find(new CompanyId(id));
    return company.toPrimitives();
  }
}

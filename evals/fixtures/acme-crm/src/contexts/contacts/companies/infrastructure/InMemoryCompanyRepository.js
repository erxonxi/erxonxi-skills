import { CompanyRepository } from "../domain/CompanyRepository.js";
import { Company } from "../domain/Company.js";

export class InMemoryCompanyRepository extends CompanyRepository {
  constructor() {
    super();
    this.companies = new Map();
  }

  async save(company) {
    this.companies.set(company.id.value, company.toPrimitives());
  }

  async search(id) {
    const primitives = this.companies.get(id.value);
    return primitives === undefined ? null : Company.fromPrimitives(primitives);
  }
}

import { CompanyDoesNotExistError } from "./CompanyDoesNotExistError.js";

export class ExistingCompanyFinder {
  constructor(repository) {
    this.repository = repository;
  }

  async find(id) {
    const company = await this.repository.search(id);
    if (company === null) throw new CompanyDoesNotExistError(id.value);
    return company;
  }
}

import { Company } from "../../domain/Company.js";
import { CompanyId } from "../../domain/CompanyId.js";
import { CompanyAlreadyExistsError } from "../../domain/CompanyAlreadyExistsError.js";

export class CompanyCreator {
  constructor(repository) {
    this.repository = repository;
  }

  async create(id, name) {
    const company = Company.create(id, name);
    if ((await this.repository.search(new CompanyId(id))) !== null) throw new CompanyAlreadyExistsError(id);
    await this.repository.save(company);
  }
}

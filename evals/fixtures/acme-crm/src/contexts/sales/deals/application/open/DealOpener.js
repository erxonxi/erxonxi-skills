import { Deal } from "../../domain/Deal.js";
import { DealId } from "../../domain/DealId.js";
import { DealAlreadyExistsError } from "../../domain/DealAlreadyExistsError.js";
import { SalesCompanyId } from "../../../shared/domain/SalesCompanyId.js";
import { SalesCompanyDoesNotExistError } from "../../../shared/domain/SalesCompanyDoesNotExistError.js";

export class DealOpener {
  constructor(repository, companies) {
    this.repository = repository;
    this.companies = companies;
  }

  async open(id, companyId, title, amountCents, ownerEmail) {
    const company = await this.companies.search(new SalesCompanyId(companyId));
    if (company === null) throw new SalesCompanyDoesNotExistError(companyId);
    const deal = Deal.open(id, companyId, company.name, title, amountCents, ownerEmail);
    if ((await this.repository.search(new DealId(id))) !== null) throw new DealAlreadyExistsError(id);
    await this.repository.save(deal);
  }
}

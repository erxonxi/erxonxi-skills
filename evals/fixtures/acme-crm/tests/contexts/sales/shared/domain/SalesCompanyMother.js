import { SalesCompany } from "../../../../../src/contexts/sales/shared/domain/SalesCompany.js";
import { SalesCompanyId } from "../../../../../src/contexts/sales/shared/domain/SalesCompanyId.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class SalesCompanyMother {
  static create(overrides) {
    const { id, name } = { id: UuidMother.create(), name: `company-${Math.floor(Math.random() * 1000)}`, ...overrides };
    return new SalesCompany(new SalesCompanyId(id), name);
  }
}

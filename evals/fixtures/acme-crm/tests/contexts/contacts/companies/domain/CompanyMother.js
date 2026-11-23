import { Company } from "../../../../../src/contexts/contacts/companies/domain/Company.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class CompanyMother {
  static create(overrides) {
    return Company.fromPrimitives({
      id: UuidMother.create(),
      name: `company-${Math.floor(Math.random() * 1000)}`,
      ...overrides,
    });
  }
}

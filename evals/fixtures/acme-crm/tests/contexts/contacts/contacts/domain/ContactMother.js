import { Contact } from "../../../../../src/contexts/contacts/contacts/domain/Contact.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class ContactMother {
  static create(overrides) {
    return Contact.fromPrimitives({
      id: UuidMother.create(),
      companyId: UuidMother.create(),
      name: `contact-${Math.floor(Math.random() * 1000)}`,
      email: `contact${Math.floor(Math.random() * 1000)}@example.com`,
      ...overrides,
    });
  }
}

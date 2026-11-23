import { ContactRepository } from "../domain/ContactRepository.js";
import { Contact } from "../domain/Contact.js";

export class InMemoryContactRepository extends ContactRepository {
  constructor() {
    super();
    this.contacts = new Map();
  }

  async save(contact) {
    this.contacts.set(contact.id.value, contact.toPrimitives());
  }

  async search(id) {
    const primitives = this.contacts.get(id.value);
    return primitives === undefined ? null : Contact.fromPrimitives(primitives);
  }

  async searchByCompany(companyId) {
    return [...this.contacts.values()]
      .filter((primitives) => primitives.companyId === companyId.value)
      .map(Contact.fromPrimitives);
  }
}

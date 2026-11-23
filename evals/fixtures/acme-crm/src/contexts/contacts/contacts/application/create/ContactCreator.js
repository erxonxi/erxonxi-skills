import { Contact } from "../../domain/Contact.js";
import { ContactId } from "../../domain/ContactId.js";
import { ContactAlreadyExistsError } from "../../domain/ContactAlreadyExistsError.js";
import { CompanyId } from "../../../companies/domain/CompanyId.js";
import { ExistingCompanyFinder } from "../../../companies/domain/ExistingCompanyFinder.js";

export class ContactCreator {
  constructor(contactRepository, companyRepository) {
    this.contactRepository = contactRepository;
    this.companyFinder = new ExistingCompanyFinder(companyRepository);
  }

  async create(id, companyId, name, email) {
    const contact = Contact.create(id, companyId, name, email);
    await this.companyFinder.find(new CompanyId(companyId));
    if ((await this.contactRepository.search(new ContactId(id))) !== null) throw new ContactAlreadyExistsError(id);
    await this.contactRepository.save(contact);
  }
}

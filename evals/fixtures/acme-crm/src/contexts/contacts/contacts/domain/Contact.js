import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { CompanyId } from "../../companies/domain/CompanyId.js";
import { ContactId } from "./ContactId.js";
import { ContactName } from "./ContactName.js";
import { ContactEmail } from "./ContactEmail.js";

export class Contact extends AggregateRoot {
  constructor(id, companyId, name, email) {
    super();
    this.id = id;
    this.companyId = companyId;
    this.name = name;
    this.email = email;
  }

  static create(id, companyId, name, email) {
    return Contact.fromPrimitives({ id, companyId, name, email });
  }

  static fromPrimitives({ id, companyId, name, email }) {
    return new Contact(new ContactId(id), new CompanyId(companyId), new ContactName(name), new ContactEmail(email));
  }

  toPrimitives() {
    return { id: this.id.value, companyId: this.companyId.value, name: this.name.value, email: this.email.value };
  }
}

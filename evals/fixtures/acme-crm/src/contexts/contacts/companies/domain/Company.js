import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { CompanyId } from "./CompanyId.js";
import { CompanyName } from "./CompanyName.js";

export class Company extends AggregateRoot {
  constructor(id, name) {
    super();
    this.id = id;
    this.name = name;
  }

  static create(id, name) {
    return Company.fromPrimitives({ id, name });
  }

  static fromPrimitives({ id, name }) {
    return new Company(new CompanyId(id), new CompanyName(name));
  }

  toPrimitives() {
    return { id: this.id.value, name: this.name.value };
  }
}

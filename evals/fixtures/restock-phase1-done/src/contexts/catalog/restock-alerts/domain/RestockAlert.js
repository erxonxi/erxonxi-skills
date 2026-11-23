import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { ProductId } from "../../products/domain/ProductId.js";
import { RestockAlertId } from "./RestockAlertId.js";
import { RestockAlertRequestedDomainEvent } from "./RestockAlertRequestedDomainEvent.js";

export class RestockAlert extends AggregateRoot {
  constructor(id, productId, email) {
    super();
    this.id = id;
    this.productId = productId;
    this.email = email;
  }

  static request(id, productId, email) {
    const alert = RestockAlert.fromPrimitives({ id, productId, email });
    alert.record(new RestockAlertRequestedDomainEvent(id, productId, email));
    return alert;
  }

  static fromPrimitives({ id, productId, email }) {
    return new RestockAlert(new RestockAlertId(id), new ProductId(productId), email);
  }

  toPrimitives() {
    return { id: this.id.value, productId: this.productId.value, email: this.email };
  }
}

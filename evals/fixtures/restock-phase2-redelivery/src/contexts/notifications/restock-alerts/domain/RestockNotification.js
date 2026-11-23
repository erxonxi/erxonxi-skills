import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { RestockNotificationId } from "./RestockNotificationId.js";

/** Record that a shopper was told a product is back in stock. */
export class RestockNotification extends AggregateRoot {
  constructor(id, productId, email) {
    super();
    this.id = id;
    this.productId = productId;
    this.email = email;
  }

  static create(id, productId, email) {
    return RestockNotification.fromPrimitives({ id, productId, email });
  }

  static fromPrimitives({ id, productId, email }) {
    return new RestockNotification(new RestockNotificationId(id), productId, email);
  }

  toPrimitives() {
    return { id: this.id.value, productId: this.productId, email: this.email };
  }
}

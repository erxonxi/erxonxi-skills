import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { ShopperEmail } from "../../shared/domain/ShopperEmail.js";
import { OrderId } from "./OrderId.js";
import { OrderLine } from "./OrderLine.js";
import { OrderPlacedDomainEvent } from "./OrderPlacedDomainEvent.js";

export class Order extends AggregateRoot {
  constructor(id, shopperEmail, lines, placedAt) {
    super();
    this.id = id;
    this.shopperEmail = shopperEmail;
    this.lines = lines;
    this.placedAt = placedAt;
  }

  static place(id, shopperEmail, lines, placedAt) {
    const order = Order.fromPrimitives({ id, shopperEmail, lines, placedAt: placedAt.toISOString() });
    order.record(new OrderPlacedDomainEvent(id, shopperEmail, order.totalCents()));
    return order;
  }

  static fromPrimitives({ id, shopperEmail, lines, placedAt }) {
    return new Order(
      new OrderId(id),
      new ShopperEmail(shopperEmail),
      lines.map(OrderLine.fromPrimitives),
      new Date(placedAt),
    );
  }

  totalCents() {
    return this.lines.reduce((total, line) => total + line.totalCents(), 0);
  }

  toPrimitives() {
    return {
      id: this.id.value,
      shopperEmail: this.shopperEmail.value,
      lines: this.lines.map((line) => line.toPrimitives()),
      totalCents: this.totalCents(),
      placedAt: this.placedAt.toISOString(),
    };
  }
}

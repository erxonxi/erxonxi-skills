import { CatalogItemId } from "../../shared/domain/CatalogItemId.js";
import { Quantity } from "../../shared/domain/Quantity.js";

/** Name and price are copied from the catalog when the order is placed, never resolved later. */
export class OrderLine {
  constructor(itemId, name, priceCents, quantity) {
    this.itemId = itemId;
    this.name = name;
    this.priceCents = priceCents;
    this.quantity = quantity;
  }

  static fromPrimitives({ itemId, name, priceCents, quantity }) {
    return new OrderLine(new CatalogItemId(itemId), name, priceCents, new Quantity(quantity));
  }

  totalCents() {
    return this.priceCents * this.quantity.value;
  }

  toPrimitives() {
    return { itemId: this.itemId.value, name: this.name, priceCents: this.priceCents, quantity: this.quantity.value };
  }
}

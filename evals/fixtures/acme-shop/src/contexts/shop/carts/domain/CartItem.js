import { CatalogItemId } from "../../shared/domain/CatalogItemId.js";
import { Quantity } from "../../shared/domain/Quantity.js";

export class CartItem {
  constructor(itemId, quantity) {
    this.itemId = itemId;
    this.quantity = quantity;
  }

  static fromPrimitives({ itemId, quantity }) {
    return new CartItem(new CatalogItemId(itemId), new Quantity(quantity));
  }

  toPrimitives() {
    return { itemId: this.itemId.value, quantity: this.quantity.value };
  }
}

import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { CatalogItemId } from "../../shared/domain/CatalogItemId.js";
import { Quantity } from "../../shared/domain/Quantity.js";
import { ShopperEmail } from "../../shared/domain/ShopperEmail.js";
import { CartId } from "./CartId.js";
import { CartItem } from "./CartItem.js";
import { CartItemDoesNotExistError } from "./CartItemDoesNotExistError.js";
import { EmptyCartError } from "./EmptyCartError.js";

export class Cart extends AggregateRoot {
  constructor(id, shopperEmail, items) {
    super();
    this.id = id;
    this.shopperEmail = shopperEmail;
    this.items = items;
  }

  static open(id, shopperEmail) {
    return new Cart(new CartId(id), new ShopperEmail(shopperEmail), []);
  }

  static fromPrimitives({ id, shopperEmail, items }) {
    return new Cart(new CartId(id), new ShopperEmail(shopperEmail), items.map(CartItem.fromPrimitives));
  }

  addItem(itemId, quantity) {
    const id = new CatalogItemId(itemId);
    const added = new Quantity(quantity);
    const existing = this.items.find((item) => item.itemId.equals(id));
    if (existing === undefined) {
      this.items = [...this.items, new CartItem(id, added)];
      return;
    }
    this.items = this.items.map((item) => (item === existing ? new CartItem(id, item.quantity.plus(added)) : item));
  }

  removeItem(itemId) {
    const id = new CatalogItemId(itemId);
    if (!this.items.some((item) => item.itemId.equals(id))) throw new CartItemDoesNotExistError(this.id.value, itemId);
    this.items = this.items.filter((item) => !item.itemId.equals(id));
  }

  checkout() {
    if (this.items.length === 0) throw new EmptyCartError(this.id.value);
    const checkedOut = this.items.map((item) => item.toPrimitives());
    this.items = [];
    return checkedOut;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      shopperEmail: this.shopperEmail.value,
      items: this.items.map((item) => item.toPrimitives()),
    };
  }
}

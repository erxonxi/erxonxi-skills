import { Cart } from "../../../../../src/contexts/shop/carts/domain/Cart.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class CartMother {
  static create(overrides) {
    return Cart.fromPrimitives({
      id: UuidMother.create(),
      shopperEmail: `shopper${Math.floor(Math.random() * 1000)}@example.com`,
      items: [],
      ...overrides,
    });
  }

  static withItem(itemId, quantity) {
    return CartMother.create({ items: [{ itemId, quantity }] });
  }
}

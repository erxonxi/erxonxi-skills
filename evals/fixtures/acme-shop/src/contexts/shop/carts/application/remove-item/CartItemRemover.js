import { CartId } from "../../domain/CartId.js";
import { ExistingCartFinder } from "../../domain/ExistingCartFinder.js";

export class CartItemRemover {
  constructor(repository) {
    this.repository = repository;
    this.finder = new ExistingCartFinder(repository);
  }

  async remove(cartId, itemId) {
    const cart = await this.finder.find(new CartId(cartId));
    cart.removeItem(itemId);
    await this.repository.save(cart);
  }
}

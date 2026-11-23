import { Cart } from "../../domain/Cart.js";
import { CartId } from "../../domain/CartId.js";
import { CartAlreadyExistsError } from "../../domain/CartAlreadyExistsError.js";

export class CartOpener {
  constructor(repository) {
    this.repository = repository;
  }

  async open(id, shopperEmail) {
    const cart = Cart.open(id, shopperEmail);
    if ((await this.repository.search(new CartId(id))) !== null) throw new CartAlreadyExistsError(id);
    await this.repository.save(cart);
  }
}

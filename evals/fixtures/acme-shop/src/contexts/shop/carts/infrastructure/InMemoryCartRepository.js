import { CartRepository } from "../domain/CartRepository.js";
import { Cart } from "../domain/Cart.js";

export class InMemoryCartRepository extends CartRepository {
  constructor() {
    super();
    this.carts = new Map();
  }

  async save(cart) {
    this.carts.set(cart.id.value, cart.toPrimitives());
  }

  async search(id) {
    const primitives = this.carts.get(id.value);
    return primitives === undefined ? null : Cart.fromPrimitives(primitives);
  }
}

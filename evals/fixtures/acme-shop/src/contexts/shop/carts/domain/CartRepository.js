/**
 * Port. Implementations: InMemoryCartRepository.
 *
 * save(cart: Cart): Promise<void>
 * search(id: CartId): Promise<Cart | null>
 */
export class CartRepository {
  async save(_cart) { throw new Error("not implemented"); }
  async search(_id) { throw new Error("not implemented"); }
}

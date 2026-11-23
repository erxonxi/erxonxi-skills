/**
 * Port. Implementations: InMemoryOrderRepository.
 *
 * save(order: Order): Promise<void>
 * search(id: OrderId): Promise<Order | null>
 */
export class OrderRepository {
  async save(_order) { throw new Error("not implemented"); }
  async search(_id) { throw new Error("not implemented"); }
}

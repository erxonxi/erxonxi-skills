import { OrderRepository } from "../domain/OrderRepository.js";
import { Order } from "../domain/Order.js";

export class InMemoryOrderRepository extends OrderRepository {
  constructor() {
    super();
    this.orders = new Map();
  }

  async save(order) {
    this.orders.set(order.id.value, order.toPrimitives());
  }

  async search(id) {
    const primitives = this.orders.get(id.value);
    return primitives === undefined ? null : Order.fromPrimitives(primitives);
  }
}

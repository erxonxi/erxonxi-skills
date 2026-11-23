import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InMemoryOrderRepository } from "../../../../../src/contexts/shop/orders/infrastructure/InMemoryOrderRepository.js";
import { OrderMother } from "../domain/OrderMother.js";

describe("InMemoryOrderRepository should", () => {
  it("return null searching an order that was never saved", async () => {
    assert.equal(await new InMemoryOrderRepository().search(OrderMother.create().id), null);
  });

  it("return a saved order with its lines", async () => {
    const repository = new InMemoryOrderRepository();
    const order = OrderMother.create();
    await repository.save(order);

    assert.deepEqual((await repository.search(order.id)).toPrimitives(), order.toPrimitives());
  });
});

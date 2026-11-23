import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InMemoryCartRepository } from "../../../../../src/contexts/shop/carts/infrastructure/InMemoryCartRepository.js";
import { CartMother } from "../domain/CartMother.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

describe("InMemoryCartRepository should", () => {
  it("return null searching a cart that was never saved", async () => {
    assert.equal(await new InMemoryCartRepository().search(CartMother.create().id), null);
  });

  it("return a saved cart with its items", async () => {
    const repository = new InMemoryCartRepository();
    const cart = CartMother.withItem(UuidMother.create(), 2);
    await repository.save(cart);

    assert.deepEqual((await repository.search(cart.id)).toPrimitives(), cart.toPrimitives());
  });
});

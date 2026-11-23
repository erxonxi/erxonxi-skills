import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CartItemRemover } from "../../../../../../src/contexts/shop/carts/application/remove-item/CartItemRemover.js";
import { CartItemDoesNotExistError } from "../../../../../../src/contexts/shop/carts/domain/CartItemDoesNotExistError.js";
import { CartMother } from "../../domain/CartMother.js";
import { MockCartRepository } from "../../domain/MockCartRepository.js";
import { UuidMother } from "../../../../shared/domain/UuidMother.js";

describe("CartItemRemover should", () => {
  it("remove an item from the cart", async () => {
    const repository = new MockCartRepository();
    const itemId = UuidMother.create();
    const cart = CartMother.withItem(itemId, 1);
    const expected = CartMother.create({ ...cart.toPrimitives(), items: [] });
    repository.shouldSearch(cart);

    await new CartItemRemover(repository).remove(cart.id.value, itemId);

    repository.assertSaved(expected);
  });

  it("fail when the item is not in the cart", async () => {
    const repository = new MockCartRepository();
    const cart = CartMother.create();
    repository.shouldSearch(cart);

    await assert.rejects(new CartItemRemover(repository).remove(cart.id.value, UuidMother.create()), CartItemDoesNotExistError);
  });
});

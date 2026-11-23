import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CartOpener } from "../../../../../../src/contexts/shop/carts/application/open/CartOpener.js";
import { CartAlreadyExistsError } from "../../../../../../src/contexts/shop/carts/domain/CartAlreadyExistsError.js";
import { InvalidShopperEmailError } from "../../../../../../src/contexts/shop/shared/domain/ShopperEmail.js";
import { CartMother } from "../../domain/CartMother.js";
import { MockCartRepository } from "../../domain/MockCartRepository.js";

describe("CartOpener should", () => {
  it("open an empty cart for a shopper", async () => {
    const repository = new MockCartRepository();
    const expected = CartMother.create();
    repository.shouldSearchAndReturnNull();

    await new CartOpener(repository).open(expected.id.value, expected.shopperEmail.value);

    repository.assertSaved(expected);
  });

  it("fail when the cart already exists", async () => {
    const repository = new MockCartRepository();
    const existing = CartMother.create();
    repository.shouldSearch(existing);

    await assert.rejects(new CartOpener(repository).open(existing.id.value, existing.shopperEmail.value), CartAlreadyExistsError);
  });

  it("fail with an invalid shopper email", async () => {
    const repository = new MockCartRepository();
    repository.shouldSearchAndReturnNull();

    await assert.rejects(new CartOpener(repository).open(CartMother.create().id.value, "not-an-email"), InvalidShopperEmailError);
  });
});

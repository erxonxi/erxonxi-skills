import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CartItemAdder } from "../../../../../../src/contexts/shop/carts/application/add-item/CartItemAdder.js";
import { CartDoesNotExistError } from "../../../../../../src/contexts/shop/carts/domain/CartDoesNotExistError.js";
import { CatalogItemDoesNotExistError } from "../../../../../../src/contexts/shop/shared/domain/CatalogItemDoesNotExistError.js";
import { InvalidQuantityError } from "../../../../../../src/contexts/shop/shared/domain/Quantity.js";
import { CartMother } from "../../domain/CartMother.js";
import { MockCartRepository } from "../../domain/MockCartRepository.js";
import { CatalogItemMother } from "../../../shared/domain/CatalogItemMother.js";
import { MockShopCatalog } from "../../../shared/domain/MockShopCatalog.js";

describe("CartItemAdder should", () => {
  it("add an item to the cart", async () => {
    const repository = new MockCartRepository();
    const catalog = new MockShopCatalog();
    const item = CatalogItemMother.create();
    const cart = CartMother.create();
    const expected = CartMother.create({ ...cart.toPrimitives(), items: [{ itemId: item.id.value, quantity: 2 }] });
    repository.shouldSearch(cart);
    catalog.shouldSearch(item);

    await new CartItemAdder(repository, catalog).add(cart.id.value, item.id.value, 2);

    repository.assertSaved(expected);
  });

  it("add up the quantity of an item already in the cart", async () => {
    const repository = new MockCartRepository();
    const catalog = new MockShopCatalog();
    const item = CatalogItemMother.create();
    const cart = CartMother.withItem(item.id.value, 2);
    const expected = CartMother.create({ ...cart.toPrimitives(), items: [{ itemId: item.id.value, quantity: 5 }] });
    repository.shouldSearch(cart);
    catalog.shouldSearch(item);

    await new CartItemAdder(repository, catalog).add(cart.id.value, item.id.value, 3);

    repository.assertSaved(expected);
  });

  it("fail when the cart does not exist", async () => {
    const repository = new MockCartRepository();
    const catalog = new MockShopCatalog();
    const item = CatalogItemMother.create();
    repository.shouldSearchAndReturnNull();
    catalog.shouldSearch(item);

    await assert.rejects(
      new CartItemAdder(repository, catalog).add(CartMother.create().id.value, item.id.value, 1),
      CartDoesNotExistError,
    );
  });

  it("fail when the item is not in the catalog", async () => {
    const repository = new MockCartRepository();
    const catalog = new MockShopCatalog();
    const item = CatalogItemMother.create();
    const cart = CartMother.create();
    repository.shouldSearch(cart);
    catalog.shouldSearchAndReturnNull(item.id);

    await assert.rejects(new CartItemAdder(repository, catalog).add(cart.id.value, item.id.value, 1), CatalogItemDoesNotExistError);
  });

  it("fail with a quantity below one", async () => {
    const repository = new MockCartRepository();
    const catalog = new MockShopCatalog();
    const item = CatalogItemMother.create();
    const cart = CartMother.create();
    repository.shouldSearch(cart);
    catalog.shouldSearch(item);

    await assert.rejects(new CartItemAdder(repository, catalog).add(cart.id.value, item.id.value, 0), InvalidQuantityError);
  });
});

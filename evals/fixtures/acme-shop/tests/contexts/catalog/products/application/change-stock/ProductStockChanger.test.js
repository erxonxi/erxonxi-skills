import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ProductStockChanger } from "../../../../../../src/contexts/catalog/products/application/change-stock/ProductStockChanger.js";
import { ProductDoesNotExistError } from "../../../../../../src/contexts/catalog/products/domain/ProductDoesNotExistError.js";
import { InvalidProductStockError } from "../../../../../../src/contexts/catalog/products/domain/ProductStock.js";
import { ProductMother } from "../../domain/ProductMother.js";
import { MockProductRepository } from "../../domain/MockProductRepository.js";
import { ProductStockChangedDomainEventMother } from "../../domain/ProductStockChangedDomainEventMother.js";
import { MockEventBus } from "../../../../shared/domain/MockEventBus.js";

describe("ProductStockChanger should", () => {
  it("change the stock, save the product and publish the event", async () => {
    const repository = new MockProductRepository();
    const eventBus = new MockEventBus();
    const product = ProductMother.create();
    const expected = ProductMother.create({ ...product.toPrimitives(), stock: 7 });
    repository.shouldSearch(product);

    await new ProductStockChanger(repository, eventBus).changeStock(product.id.value, 7);

    repository.assertSaved(expected);
    eventBus.assertPublished([ProductStockChangedDomainEventMother.create(product.id.value, 7)]);
  });

  it("fail when the product does not exist", async () => {
    const repository = new MockProductRepository();
    const eventBus = new MockEventBus();
    repository.shouldSearchAndReturnNull();

    await assert.rejects(
      new ProductStockChanger(repository, eventBus).changeStock(ProductMother.create().id.value, 3),
      ProductDoesNotExistError,
    );
    eventBus.assertNothingPublished();
  });

  it("fail with a negative stock and publish nothing", async () => {
    const repository = new MockProductRepository();
    const eventBus = new MockEventBus();
    const product = ProductMother.create();
    repository.shouldSearch(product);

    await assert.rejects(new ProductStockChanger(repository, eventBus).changeStock(product.id.value, -1), InvalidProductStockError);
    eventBus.assertNothingPublished();
  });
});

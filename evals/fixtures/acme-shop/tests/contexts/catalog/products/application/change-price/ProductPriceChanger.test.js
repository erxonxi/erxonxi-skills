import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ProductPriceChanger } from "../../../../../../src/contexts/catalog/products/application/change-price/ProductPriceChanger.js";
import { InvalidProductPriceError } from "../../../../../../src/contexts/catalog/products/domain/InvalidProductPriceError.js";
import { ProductMother } from "../../domain/ProductMother.js";
import { MockProductRepository } from "../../domain/MockProductRepository.js";

describe("ProductPriceChanger should", () => {
  it("change the price of an existing product", async () => {
    const repository = new MockProductRepository();
    const product = ProductMother.create();
    const expected = ProductMother.create({ ...product.toPrimitives(), priceCents: 1299 });
    repository.shouldSearch(product);

    await new ProductPriceChanger(repository).changePrice(product.id.value, 1299);

    repository.assertSaved(expected);
  });

  it("fail with a negative price", async () => {
    const repository = new MockProductRepository();
    const product = ProductMother.create();
    repository.shouldSearch(product);

    await assert.rejects(new ProductPriceChanger(repository).changePrice(product.id.value, -1), InvalidProductPriceError);
  });
});

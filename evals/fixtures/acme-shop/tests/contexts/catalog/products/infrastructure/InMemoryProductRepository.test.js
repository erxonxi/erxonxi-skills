import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InMemoryProductRepository } from "../../../../../src/contexts/catalog/products/infrastructure/InMemoryProductRepository.js";
import { ProductId } from "../../../../../src/contexts/catalog/products/domain/ProductId.js";
import { ProductMother } from "../domain/ProductMother.js";

describe("InMemoryProductRepository should", () => {
  it("return null searching a product that was never saved", async () => {
    assert.equal(await new InMemoryProductRepository().search(ProductMother.create().id), null);
  });

  it("return a saved product", async () => {
    const repository = new InMemoryProductRepository();
    const product = ProductMother.create();
    await repository.save(product);

    assert.deepEqual((await repository.search(new ProductId(product.id.value))).toPrimitives(), product.toPrimitives());
  });

  it("return every saved product", async () => {
    const repository = new InMemoryProductRepository();
    await repository.save(ProductMother.create());
    await repository.save(ProductMother.create());

    assert.equal((await repository.searchAll()).length, 2);
  });
});

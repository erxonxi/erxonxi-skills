import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { ProductFinder } from "../../../../../../src/contexts/catalog/products/application/find/ProductFinder.js";
import { ProductDoesNotExistError } from "../../../../../../src/contexts/catalog/products/domain/ProductDoesNotExistError.js";
import { ProductMother } from "../../domain/ProductMother.js";
import { MockProductRepository } from "../../domain/MockProductRepository.js";

describe("ProductFinder should", () => {
  it("find an existing product", async () => {
    const repository = new MockProductRepository();
    const product = ProductMother.create();
    repository.shouldSearch(product);

    const found = await new ProductFinder(repository).find(product.id.value);

    assert.deepEqual(found, product.toPrimitives());
  });

  it("fail when the product does not exist", async () => {
    const repository = new MockProductRepository();
    repository.shouldSearchAndReturnNull();

    await assert.rejects(new ProductFinder(repository).find(randomUUID()), ProductDoesNotExistError);
  });
});

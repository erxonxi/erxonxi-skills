import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ProductRenamer } from "../../../../../../src/contexts/catalog/products/application/rename/ProductRenamer.js";
import { ProductDoesNotExistError } from "../../../../../../src/contexts/catalog/products/domain/ProductDoesNotExistError.js";
import { ProductMother } from "../../domain/ProductMother.js";
import { MockProductRepository } from "../../domain/MockProductRepository.js";

describe("ProductRenamer should", () => {
  it("rename an existing product", async () => {
    const repository = new MockProductRepository();
    const product = ProductMother.create();
    const expected = ProductMother.create({ ...product.toPrimitives(), name: "Blue mug" });
    repository.shouldSearch(product);

    await new ProductRenamer(repository).rename(product.id.value, "Blue mug");

    repository.assertSaved(expected);
  });

  it("fail when the product does not exist", async () => {
    const repository = new MockProductRepository();
    repository.shouldSearchAndReturnNull();

    await assert.rejects(
      new ProductRenamer(repository).rename(ProductMother.create().id.value, "Blue mug"),
      ProductDoesNotExistError,
    );
  });
});

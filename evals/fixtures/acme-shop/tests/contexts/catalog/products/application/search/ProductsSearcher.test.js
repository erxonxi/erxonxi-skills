import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ProductsSearcher } from "../../../../../../src/contexts/catalog/products/application/search/ProductsSearcher.js";
import { ProductMother } from "../../domain/ProductMother.js";
import { MockProductRepository } from "../../domain/MockProductRepository.js";

describe("ProductsSearcher should", () => {
  it("return the products whose name contains the text, ignoring case", async () => {
    const repository = new MockProductRepository();
    const mug = ProductMother.create({ name: "Blue Mug" });
    const lamp = ProductMother.create({ name: "Desk lamp" });
    repository.shouldSearchAll([mug, lamp]);

    const found = await new ProductsSearcher(repository).search("mug");

    assert.deepEqual(found, [mug.toPrimitives()]);
  });

  it("return every product when the text is empty", async () => {
    const repository = new MockProductRepository();
    const products = [ProductMother.create(), ProductMother.create()];
    repository.shouldSearchAll(products);

    const found = await new ProductsSearcher(repository).search("");

    assert.deepEqual(found, products.map((p) => p.toPrimitives()));
  });

  it("return nothing when no name matches", async () => {
    const repository = new MockProductRepository();
    repository.shouldSearchAll([ProductMother.create({ name: "Desk lamp" })]);

    assert.deepEqual(await new ProductsSearcher(repository).search("sofa"), []);
  });
});

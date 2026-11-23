import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ProductCreator } from "../../../../../../src/contexts/catalog/products/application/create/ProductCreator.js";
import { ProductAlreadyExistsError } from "../../../../../../src/contexts/catalog/products/domain/ProductAlreadyExistsError.js";
import { InvalidProductNameError } from "../../../../../../src/contexts/catalog/products/domain/ProductName.js";
import { ProductMother } from "../../domain/ProductMother.js";
import { MockProductRepository } from "../../domain/MockProductRepository.js";

describe("ProductCreator should", () => {
  it("create a valid product", async () => {
    const repository = new MockProductRepository();
    const expected = ProductMother.create();
    repository.shouldSearchAndReturnNull();

    const { id, name, priceCents, stock } = expected.toPrimitives();
    await new ProductCreator(repository).create(id, name, priceCents, stock);

    repository.assertSaved(expected);
  });

  it("fail when the product already exists", async () => {
    const repository = new MockProductRepository();
    const existing = ProductMother.create();
    repository.shouldSearch(existing);

    const { id, name, priceCents, stock } = existing.toPrimitives();
    await assert.rejects(new ProductCreator(repository).create(id, name, priceCents, stock), ProductAlreadyExistsError);
  });

  it("fail with an empty name", async () => {
    const repository = new MockProductRepository();
    repository.shouldSearchAndReturnNull();
    const { id, priceCents, stock } = ProductMother.create().toPrimitives();

    await assert.rejects(new ProductCreator(repository).create(id, "  ", priceCents, stock), InvalidProductNameError);
  });
});

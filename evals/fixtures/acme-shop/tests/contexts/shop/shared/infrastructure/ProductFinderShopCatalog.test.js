import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ProductFinderShopCatalog } from "../../../../../src/contexts/shop/shared/infrastructure/ProductFinderShopCatalog.js";
import { CatalogItemId } from "../../../../../src/contexts/shop/shared/domain/CatalogItemId.js";
import { ProductFinder } from "../../../../../src/contexts/catalog/products/application/find/ProductFinder.js";
import { InMemoryProductRepository } from "../../../../../src/contexts/catalog/products/infrastructure/InMemoryProductRepository.js";
import { ProductMother } from "../../../catalog/products/domain/ProductMother.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

describe("ProductFinderShopCatalog should", () => {
  it("map a catalog product to the shop's own view of it", async () => {
    const repository = new InMemoryProductRepository();
    const product = ProductMother.create();
    await repository.save(product);

    const item = await new ProductFinderShopCatalog(new ProductFinder(repository)).search(new CatalogItemId(product.id.value));

    assert.deepEqual(
      { id: item.id.value, name: item.name, priceCents: item.priceCents },
      { id: product.id.value, name: product.name.value, priceCents: product.price.cents },
    );
  });

  it("return null when the product does not exist", async () => {
    const catalog = new ProductFinderShopCatalog(new ProductFinder(new InMemoryProductRepository()));

    assert.equal(await catalog.search(new CatalogItemId(UuidMother.create())), null);
  });
});

import { ShopCatalog } from "../domain/ShopCatalog.js";
import { CatalogItem } from "../domain/CatalogItem.js";
import { CatalogItemId } from "../domain/CatalogItemId.js";

/** Adapter of the shop's own port: calls the public use case of the catalog and maps its response. */
export class ProductFinderShopCatalog extends ShopCatalog {
  constructor(productFinder) {
    super();
    this.productFinder = productFinder;
  }

  async search(id) {
    try {
      const product = await this.productFinder.find(id.value);
      return new CatalogItem(new CatalogItemId(product.id), product.name, product.priceCents);
    } catch (error) {
      if (error.name === "ProductDoesNotExistError") return null;
      throw error;
    }
  }
}

/**
 * Port owned by the shop context. Implementations: ProductFinderShopCatalog.
 *
 * search(id: CatalogItemId): Promise<CatalogItem | null>
 */
export class ShopCatalog {
  async search(_id) { throw new Error("not implemented"); }
}

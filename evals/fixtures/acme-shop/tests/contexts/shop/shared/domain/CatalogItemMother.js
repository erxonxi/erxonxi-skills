import { CatalogItem } from "../../../../../src/contexts/shop/shared/domain/CatalogItem.js";
import { CatalogItemId } from "../../../../../src/contexts/shop/shared/domain/CatalogItemId.js";
import { UuidMother } from "../../../shared/domain/UuidMother.js";

export class CatalogItemMother {
  static create(overrides) {
    const { id, name, priceCents } = {
      id: UuidMother.create(),
      name: `item-${Math.floor(Math.random() * 1000)}`,
      priceCents: Math.floor(Math.random() * 10000) + 1,
      ...overrides,
    };
    return new CatalogItem(new CatalogItemId(id), name, priceCents);
  }
}

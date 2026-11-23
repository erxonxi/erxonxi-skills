import { ProductStockChangedDomainEvent } from "../../../../../src/contexts/catalog/products/domain/ProductStockChangedDomainEvent.js";

export class ProductStockChangedDomainEventMother {
  static create(productId, stock) {
    return new ProductStockChangedDomainEvent(productId, stock);
  }
}

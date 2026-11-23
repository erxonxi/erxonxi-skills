import { randomUUID } from "node:crypto";
import { Product } from "../../../../../src/contexts/catalog/products/domain/Product.js";

export class ProductMother {
  static create(overrides) {
    return Product.fromPrimitives({
      id: randomUUID(),
      name: `product-${Math.floor(Math.random() * 1000)}`,
      priceCents: Math.floor(Math.random() * 10000),
      stock: Math.floor(Math.random() * 20) + 1,
      ...overrides,
    });
  }

  static outOfStock() {
    return ProductMother.create({ stock: 0 });
  }
}

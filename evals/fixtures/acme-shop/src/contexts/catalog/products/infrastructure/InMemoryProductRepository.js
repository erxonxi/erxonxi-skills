import { ProductRepository } from "../domain/ProductRepository.js";

export class InMemoryProductRepository extends ProductRepository {
  constructor() {
    super();
    this.products = new Map();
  }

  async save(product) {
    this.products.set(product.id.value, product);
  }

  async search(id) {
    return this.products.get(id.value) ?? null;
  }

  async searchAll() {
    return [...this.products.values()];
  }
}

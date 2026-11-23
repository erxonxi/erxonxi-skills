/**
 * Port. Implementations: InMemoryProductRepository.
 *
 * save(product: Product): Promise<void>
 * search(id: ProductId): Promise<Product | null>
 * searchAll(): Promise<Product[]>
 */
export class ProductRepository {
  async save(_product) { throw new Error("not implemented"); }
  async search(_id) { throw new Error("not implemented"); }
  async searchAll() { throw new Error("not implemented"); }
}

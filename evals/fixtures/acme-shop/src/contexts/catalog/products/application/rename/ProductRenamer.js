import { ProductId } from "../../domain/ProductId.js";
import { ExistingProductFinder } from "../../domain/ExistingProductFinder.js";

export class ProductRenamer {
  constructor(repository) {
    this.repository = repository;
    this.finder = new ExistingProductFinder(repository);
  }

  async rename(id, name) {
    const product = await this.finder.find(new ProductId(id));
    product.rename(name);
    await this.repository.save(product);
  }
}

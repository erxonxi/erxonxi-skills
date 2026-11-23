import { ProductId } from "../../domain/ProductId.js";
import { ExistingProductFinder } from "../../domain/ExistingProductFinder.js";

export class ProductPriceChanger {
  constructor(repository) {
    this.repository = repository;
    this.finder = new ExistingProductFinder(repository);
  }

  async changePrice(id, priceCents) {
    const product = await this.finder.find(new ProductId(id));
    product.changePrice(priceCents);
    await this.repository.save(product);
  }
}

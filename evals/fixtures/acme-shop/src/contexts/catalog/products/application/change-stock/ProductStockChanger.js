import { ProductId } from "../../domain/ProductId.js";
import { ExistingProductFinder } from "../../domain/ExistingProductFinder.js";

export class ProductStockChanger {
  constructor(repository, eventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.finder = new ExistingProductFinder(repository);
  }

  async changeStock(id, stock) {
    const product = await this.finder.find(new ProductId(id));
    product.changeStock(stock);
    await this.repository.save(product);
    await this.eventBus.publish(product.pullDomainEvents());
  }
}

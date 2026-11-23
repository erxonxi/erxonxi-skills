import { Product } from "../../domain/Product.js";
import { ProductId } from "../../domain/ProductId.js";
import { ProductAlreadyExistsError } from "../../domain/ProductAlreadyExistsError.js";

export class ProductCreator {
  constructor(repository) {
    this.repository = repository;
  }

  async create(id, name, priceCents, stock) {
    const product = Product.create(id, name, priceCents, stock);
    if ((await this.repository.search(new ProductId(id))) !== null) throw new ProductAlreadyExistsError(id);
    await this.repository.save(product);
  }
}

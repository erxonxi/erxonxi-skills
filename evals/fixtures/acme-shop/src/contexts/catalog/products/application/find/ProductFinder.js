import { ProductId } from "../../domain/ProductId.js";
import { ProductDoesNotExistError } from "../../domain/ProductDoesNotExistError.js";

export class ProductFinder {
  constructor(repository) {
    this.repository = repository;
  }

  async find(id) {
    const product = await this.repository.search(new ProductId(id));
    if (product === null) throw new ProductDoesNotExistError(id);
    return product.toPrimitives();
  }
}

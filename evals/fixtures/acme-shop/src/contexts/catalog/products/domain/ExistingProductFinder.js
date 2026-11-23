import { ProductDoesNotExistError } from "./ProductDoesNotExistError.js";

export class ExistingProductFinder {
  constructor(repository) {
    this.repository = repository;
  }

  async find(id) {
    const product = await this.repository.search(id);
    if (product === null) throw new ProductDoesNotExistError(id.value);
    return product;
  }
}

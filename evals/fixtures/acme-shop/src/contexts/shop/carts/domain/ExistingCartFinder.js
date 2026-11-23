import { CartDoesNotExistError } from "./CartDoesNotExistError.js";

export class ExistingCartFinder {
  constructor(repository) {
    this.repository = repository;
  }

  async find(id) {
    const cart = await this.repository.search(id);
    if (cart === null) throw new CartDoesNotExistError(id.value);
    return cart;
  }
}

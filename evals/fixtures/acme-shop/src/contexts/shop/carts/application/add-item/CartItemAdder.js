import { CartId } from "../../domain/CartId.js";
import { ExistingCartFinder } from "../../domain/ExistingCartFinder.js";
import { CatalogItemId } from "../../../shared/domain/CatalogItemId.js";
import { CatalogItemDoesNotExistError } from "../../../shared/domain/CatalogItemDoesNotExistError.js";

export class CartItemAdder {
  constructor(repository, catalog) {
    this.repository = repository;
    this.catalog = catalog;
    this.finder = new ExistingCartFinder(repository);
  }

  async add(cartId, itemId, quantity) {
    const cart = await this.finder.find(new CartId(cartId));
    if ((await this.catalog.search(new CatalogItemId(itemId))) === null) throw new CatalogItemDoesNotExistError(itemId);
    cart.addItem(itemId, quantity);
    await this.repository.save(cart);
  }
}

import { DomainError } from "../../../shared/domain/DomainError.js";

export class CartItemDoesNotExistError extends DomainError {
  constructor(cartId, itemId) {
    super(`The cart <${cartId}> has no item <${itemId}>`);
    this.cartId = cartId;
    this.itemId = itemId;
  }
}

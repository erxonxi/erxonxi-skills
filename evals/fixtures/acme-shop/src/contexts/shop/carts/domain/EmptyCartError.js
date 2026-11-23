import { DomainError } from "../../../shared/domain/DomainError.js";

export class EmptyCartError extends DomainError {
  constructor(cartId) {
    super(`The cart <${cartId}> is empty`);
    this.cartId = cartId;
  }
}

import { InvalidUuidError } from "../../contexts/shared/domain/Uuid.js";
import { InvalidProductIdError } from "../../contexts/catalog/products/domain/ProductId.js";
import { InvalidProductNameError } from "../../contexts/catalog/products/domain/ProductName.js";
import { InvalidProductPriceError } from "../../contexts/catalog/products/domain/InvalidProductPriceError.js";
import { InvalidProductStockError } from "../../contexts/catalog/products/domain/ProductStock.js";
import { ProductDoesNotExistError } from "../../contexts/catalog/products/domain/ProductDoesNotExistError.js";
import { ProductAlreadyExistsError } from "../../contexts/catalog/products/domain/ProductAlreadyExistsError.js";
import { InvalidQuantityError } from "../../contexts/shop/shared/domain/Quantity.js";
import { InvalidShopperEmailError } from "../../contexts/shop/shared/domain/ShopperEmail.js";
import { CatalogItemDoesNotExistError } from "../../contexts/shop/shared/domain/CatalogItemDoesNotExistError.js";
import { CartDoesNotExistError } from "../../contexts/shop/carts/domain/CartDoesNotExistError.js";
import { CartAlreadyExistsError } from "../../contexts/shop/carts/domain/CartAlreadyExistsError.js";
import { CartItemDoesNotExistError } from "../../contexts/shop/carts/domain/CartItemDoesNotExistError.js";
import { EmptyCartError } from "../../contexts/shop/carts/domain/EmptyCartError.js";
import { OrderAlreadyPlacedError } from "../../contexts/shop/orders/domain/OrderAlreadyPlacedError.js";
import { InvalidRequestBodyError } from "./InvalidRequestBodyError.js";

const STATUS_BY_ERROR = [
  [InvalidRequestBodyError, 400],
  [InvalidUuidError, 400],
  [InvalidProductIdError, 400],
  [InvalidProductNameError, 400],
  [InvalidProductPriceError, 400],
  [InvalidProductStockError, 400],
  [InvalidQuantityError, 400],
  [InvalidShopperEmailError, 400],
  [ProductDoesNotExistError, 404],
  [CatalogItemDoesNotExistError, 404],
  [CartDoesNotExistError, 404],
  [CartItemDoesNotExistError, 404],
  [ProductAlreadyExistsError, 409],
  [CartAlreadyExistsError, 409],
  [OrderAlreadyPlacedError, 409],
  [EmptyCartError, 422],
];

/** The only place where a domain error becomes an HTTP status. Anything unknown is a 500 that hides the message. */
export class ErrorStatusMapper {
  map(error) {
    const known = STATUS_BY_ERROR.find(([errorClass]) => error instanceof errorClass);
    if (known === undefined) return { status: 500, body: { error: { type: "InternalError", message: "Internal error" } } };
    return { status: known[1], body: { error: { type: error.name, message: error.message } } };
  }
}

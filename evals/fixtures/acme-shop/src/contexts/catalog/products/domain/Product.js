import { ProductId } from "./ProductId.js";
import { ProductPrice } from "./ProductPrice.js";

export class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  static fromPrimitives({ id, name, priceCents, stock }) {
    return new Product(new ProductId(id), name, new ProductPrice(priceCents), stock);
  }

  isOutOfStock() {
    return this.stock === 0;
  }

  toPrimitives() {
    return { id: this.id.value, name: this.name, priceCents: this.price.cents, stock: this.stock };
  }
}

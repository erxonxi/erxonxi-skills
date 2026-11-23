import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { ProductId } from "./ProductId.js";
import { ProductName } from "./ProductName.js";
import { ProductPrice } from "./ProductPrice.js";
import { ProductStock } from "./ProductStock.js";
import { ProductStockChangedDomainEvent } from "./ProductStockChangedDomainEvent.js";

export class Product extends AggregateRoot {
  constructor(id, name, price, stock) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  static create(id, name, priceCents, stock) {
    return Product.fromPrimitives({ id, name, priceCents, stock });
  }

  static fromPrimitives({ id, name, priceCents, stock }) {
    return new Product(new ProductId(id), new ProductName(name), new ProductPrice(priceCents), new ProductStock(stock));
  }

  rename(name) {
    this.name = new ProductName(name);
  }

  changePrice(priceCents) {
    this.price = new ProductPrice(priceCents);
  }

  changeStock(stock) {
    this.stock = new ProductStock(stock);
    this.record(new ProductStockChangedDomainEvent(this.id.value, stock));
  }

  isOutOfStock() {
    return this.stock.value === 0;
  }

  toPrimitives() {
    return { id: this.id.value, name: this.name.value, priceCents: this.price.cents, stock: this.stock.value };
  }
}

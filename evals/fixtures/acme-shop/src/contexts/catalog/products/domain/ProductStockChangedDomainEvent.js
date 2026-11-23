import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class ProductStockChangedDomainEvent extends DomainEvent {
  constructor(aggregateId, stock) {
    super("acme.catalog.product.stock_changed", aggregateId, { stock });
  }
}

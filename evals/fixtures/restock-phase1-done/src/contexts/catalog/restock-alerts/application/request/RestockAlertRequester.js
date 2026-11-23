import { ProductId } from "../../../products/domain/ProductId.js";
import { ExistingProductFinder } from "../../../products/domain/ExistingProductFinder.js";
import { RestockAlert } from "../../domain/RestockAlert.js";

export class RestockAlertRequester {
  constructor(alertRepository, productRepository, eventBus) {
    this.alertRepository = alertRepository;
    this.productFinder = new ExistingProductFinder(productRepository);
    this.eventBus = eventBus;
  }

  async request(alertId, productId, email) {
    await this.productFinder.find(new ProductId(productId));
    const alert = RestockAlert.request(alertId, productId, email);
    await this.alertRepository.save(alert);
    await this.eventBus.publish(alert.pullDomainEvents());
  }
}

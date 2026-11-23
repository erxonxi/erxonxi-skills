import { randomUUID } from "node:crypto";
import { RestockAlert } from "../../domain/RestockAlert.js";
import { ProductFinder } from "../../../products/application/find/ProductFinder.js";

export class RestockAlertRequester {
  constructor(alertRepository, productRepository, eventBus) {
    this.alertRepository = alertRepository;
    this.productFinder = new ProductFinder(productRepository);
    this.eventBus = eventBus;
  }

  async requestAlert(productId, email) {
    await this.productFinder.find(productId);
    const alert = RestockAlert.request(randomUUID(), productId, email);
    await this.alertRepository.save(alert);
    await this.eventBus.publish(alert.pullDomainEvents());
  }

  async cancel(alert) {
    alert.cancel();
    await this.alertRepository.save(alert);
  }
}

import { randomUUID } from "node:crypto";

export class EmailShopperOnRestockAlertConsumed {
  constructor(restockAlertEmailSender) {
    this.restockAlertEmailSender = restockAlertEmailSender;
  }

  subscribedTo() {
    return ["acme.catalog.restock_alert.consumed"];
  }

  async on(event) {
    await this.restockAlertEmailSender.send(randomUUID(), event.attributes.productId, event.attributes.email);
  }
}

export class EmailShopperOnOrderPlaced {
  constructor(orderConfirmationEmailSender) {
    this.orderConfirmationEmailSender = orderConfirmationEmailSender;
  }

  subscribedTo() {
    return ["acme.shop.order.placed"];
  }

  async on(event) {
    await this.orderConfirmationEmailSender.send(
      event.aggregateId,
      event.attributes.shopperEmail,
      event.attributes.totalCents,
    );
  }
}

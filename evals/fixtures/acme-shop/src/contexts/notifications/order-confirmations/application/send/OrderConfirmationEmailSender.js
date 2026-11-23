export class OrderConfirmationEmailSender {
  constructor(emailSender) {
    this.emailSender = emailSender;
  }

  async send(orderId, shopperEmail, totalCents) {
    const total = (totalCents / 100).toFixed(2);
    await this.emailSender.send(shopperEmail, `Order ${orderId} confirmed`, `Thank you for your order. Total: ${total} EUR.`);
  }
}

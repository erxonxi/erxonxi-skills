export class RestockAlertEmailSender {
  constructor(emailSender) {
    this.emailSender = emailSender;
  }

  async send(productId, email) {
    await this.emailSender.send(email, "Back in stock", `The product ${productId} you asked about is back in stock.`);
  }
}

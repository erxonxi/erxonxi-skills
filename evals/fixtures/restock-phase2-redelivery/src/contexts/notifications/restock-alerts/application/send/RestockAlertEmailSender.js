import { RestockNotification } from "../../domain/RestockNotification.js";

export class RestockAlertEmailSender {
  constructor(emailSender, notificationRepository) {
    this.emailSender = emailSender;
    this.notificationRepository = notificationRepository;
  }

  async send(notificationId, productId, email) {
    const notification = RestockNotification.create(notificationId, productId, email);
    await this.notificationRepository.save(notification);
    await this.emailSender.send(email, "Back in stock", `The product ${productId} you asked about is back in stock.`);
  }
}

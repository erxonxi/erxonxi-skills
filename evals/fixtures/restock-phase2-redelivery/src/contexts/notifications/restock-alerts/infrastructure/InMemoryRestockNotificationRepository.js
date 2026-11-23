import { RestockNotificationRepository } from "../domain/RestockNotificationRepository.js";

export class InMemoryRestockNotificationRepository extends RestockNotificationRepository {
  constructor() {
    super();
    this.notifications = new Map();
  }

  async save(notification) {
    this.notifications.set(notification.id.value, notification.toPrimitives());
  }
}

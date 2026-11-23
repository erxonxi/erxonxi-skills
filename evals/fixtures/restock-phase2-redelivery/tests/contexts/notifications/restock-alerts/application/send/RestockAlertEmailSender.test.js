import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RestockAlertEmailSender } from "../../../../../../src/contexts/notifications/restock-alerts/application/send/RestockAlertEmailSender.js";
import { MockEmailSender } from "../../../shared/domain/MockEmailSender.js";
import { MockRestockNotificationRepository } from "../../domain/MockRestockNotificationRepository.js";
import { RestockNotificationMother } from "../../domain/RestockNotificationMother.js";

describe("RestockAlertEmailSender should", () => {
  it("email the shopper that the product is back in stock", async () => {
    const emailSender = new MockEmailSender();
    const notification = RestockNotificationMother.create();
    const { id, productId, email } = notification.toPrimitives();

    await new RestockAlertEmailSender(emailSender, new MockRestockNotificationRepository()).send(id, productId, email);

    emailSender.assertSentTo(email);
    assert.match(emailSender.sent[0].body, new RegExp(productId));
  });

  it("record the notification it sent", async () => {
    const notifications = new MockRestockNotificationRepository();
    const notification = RestockNotificationMother.create();
    const { id, productId, email } = notification.toPrimitives();

    await new RestockAlertEmailSender(new MockEmailSender(), notifications).send(id, productId, email);

    notifications.assertSaved(notification);
  });
});

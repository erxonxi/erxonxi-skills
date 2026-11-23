import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { EmailShopperOnRestockAlertConsumed } from "../../../../../src/contexts/notifications/restock-alerts/infrastructure/EmailShopperOnRestockAlertConsumed.js";
import { RestockAlertEmailSender } from "../../../../../src/contexts/notifications/restock-alerts/application/send/RestockAlertEmailSender.js";
import { MockEmailSender } from "../../shared/domain/MockEmailSender.js";
import { MockRestockNotificationRepository } from "../domain/MockRestockNotificationRepository.js";
import { RestockAlertConsumedDomainEventMother } from "../domain/RestockAlertConsumedDomainEventMother.js";

function scenario() {
  const emailSender = new MockEmailSender();
  const notifications = new MockRestockNotificationRepository();
  return { emailSender, notifications, subscriber: new EmailShopperOnRestockAlertConsumed(new RestockAlertEmailSender(emailSender, notifications)) };
}

describe("EmailShopperOnRestockAlertConsumed should", () => {
  it("subscribe to the restock alert consumed event", () => {
    const { subscriber } = scenario();

    assert.deepEqual(subscriber.subscribedTo(), ["acme.catalog.restock_alert.consumed"]);
  });

  it("send the email for the consumed alert", async () => {
    const { emailSender, notifications, subscriber } = scenario();
    const event = RestockAlertConsumedDomainEventMother.create();

    await subscriber.on(event);

    emailSender.assertSentTo(event.attributes.email);
    notifications.assertSavedFor(event.attributes.productId, event.attributes.email);
  });
});

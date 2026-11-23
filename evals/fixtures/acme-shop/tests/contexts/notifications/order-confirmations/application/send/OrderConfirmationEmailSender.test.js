import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { OrderConfirmationEmailSender } from "../../../../../../src/contexts/notifications/order-confirmations/application/send/OrderConfirmationEmailSender.js";
import { MockEmailSender } from "../../../shared/domain/MockEmailSender.js";
import { UuidMother } from "../../../../shared/domain/UuidMother.js";

describe("OrderConfirmationEmailSender should", () => {
  it("email the shopper the order total", async () => {
    const emailSender = new MockEmailSender();
    const orderId = UuidMother.create();

    await new OrderConfirmationEmailSender(emailSender).send(orderId, "shopper@example.com", 4100);

    emailSender.assertSentTo("shopper@example.com");
    assert.match(emailSender.sent[0].subject, new RegExp(orderId));
    assert.match(emailSender.sent[0].body, /41\.00/);
  });
});

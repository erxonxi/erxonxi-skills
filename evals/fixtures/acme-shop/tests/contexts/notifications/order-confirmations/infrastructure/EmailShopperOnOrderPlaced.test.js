import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { EmailShopperOnOrderPlaced } from "../../../../../src/contexts/notifications/order-confirmations/infrastructure/EmailShopperOnOrderPlaced.js";
import { OrderConfirmationEmailSender } from "../../../../../src/contexts/notifications/order-confirmations/application/send/OrderConfirmationEmailSender.js";
import { OrderMother } from "../../../shop/orders/domain/OrderMother.js";
import { OrderPlacedDomainEventMother } from "../../../shop/orders/domain/OrderPlacedDomainEventMother.js";
import { MockEmailSender } from "../../shared/domain/MockEmailSender.js";

describe("EmailShopperOnOrderPlaced should", () => {
  it("subscribe to the order placed event", () => {
    const subscriber = new EmailShopperOnOrderPlaced(new OrderConfirmationEmailSender(new MockEmailSender()));

    assert.deepEqual(subscriber.subscribedTo(), ["acme.shop.order.placed"]);
  });

  it("email the shopper of the placed order", async () => {
    const emailSender = new MockEmailSender();
    const order = OrderMother.create();

    await new EmailShopperOnOrderPlaced(new OrderConfirmationEmailSender(emailSender)).on(OrderPlacedDomainEventMother.fromOrder(order));

    emailSender.assertSentTo(order.shopperEmail.value);
  });
});

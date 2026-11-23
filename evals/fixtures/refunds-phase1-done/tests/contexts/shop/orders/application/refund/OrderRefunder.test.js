import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { OrderRefunder } from "../../../../../../src/contexts/shop/orders/application/refund/OrderRefunder.js";
import { OrderDoesNotExistError } from "../../../../../../src/contexts/shop/orders/domain/OrderDoesNotExistError.js";
import { RefundExceedsOrderTotalError } from "../../../../../../src/contexts/shop/orders/domain/RefundExceedsOrderTotalError.js";
import { OrderMother } from "../../domain/OrderMother.js";
import { MockOrderRepository } from "../../domain/MockOrderRepository.js";
import { RefundMother } from "../../domain/RefundMother.js";
import { MockRefundRepository } from "../../domain/MockRefundRepository.js";
import { OrderRefundedDomainEventMother } from "../../domain/OrderRefundedDomainEventMother.js";
import { MockEventBus } from "../../../../shared/domain/MockEventBus.js";
import { UuidMother } from "../../../../shared/domain/UuidMother.js";

function scenario() {
  const refunds = new MockRefundRepository();
  const orders = new MockOrderRepository();
  const eventBus = new MockEventBus();
  return { refunds, orders, eventBus, refunder: new OrderRefunder(refunds, orders, eventBus) };
}

function orderOf(lines) {
  return OrderMother.create({
    lines: lines.map(({ priceCents, quantity }) => ({ itemId: UuidMother.create(), name: "item", priceCents, quantity })),
  });
}

describe("OrderRefunder should", () => {
  it("refund a partial amount pro-rated across the order lines", async () => {
    const { refunds, orders, eventBus, refunder } = scenario();
    const order = orderOf([{ priceCents: 1000, quantity: 1 }, { priceCents: 1000, quantity: 3 }]);
    const [first, second] = order.lines.map((line) => line.itemId.value);
    orders.shouldSearch(order);
    const refundId = UuidMother.create();
    const expected = RefundMother.create({
      id: refundId,
      orderId: order.id.value,
      lines: [{ itemId: first, refundedCents: 100 }, { itemId: second, refundedCents: 300 }],
    });

    await refunder.refund(refundId, order.id.value, 400);

    refunds.assertSaved(expected);
    eventBus.assertPublished([OrderRefundedDomainEventMother.fromRefund(expected)]);
  });

  it("refund exactly the amount asked for, no more and no less", async () => {
    const { refunds, orders, refunder } = scenario();
    const order = orderOf([{ priceCents: 1500, quantity: 1 }, { priceCents: 500, quantity: 1 }]);
    orders.shouldSearch(order);

    await refunder.refund(UuidMother.create(), order.id.value, 1000);

    const [saved] = refunds.saved;
    assert.equal(saved.totalCents, saved.lines.reduce((total, line) => total + line.refundedCents, 0));
  });

  it("fail when the amount is more than the order total", async () => {
    const { refunds, orders, eventBus, refunder } = scenario();
    const order = orderOf([{ priceCents: 500, quantity: 2 }]);
    orders.shouldSearch(order);

    await assert.rejects(refunder.refund(UuidMother.create(), order.id.value, 1001), RefundExceedsOrderTotalError);
    refunds.assertNothingSaved();
    eventBus.assertNothingPublished();
  });

  it("fail when the order does not exist", async () => {
    const { refunds, orders, refunder } = scenario();
    orders.shouldSearchAndReturnNull();

    await assert.rejects(refunder.refund(UuidMother.create(), UuidMother.create(), 100), OrderDoesNotExistError);
    refunds.assertNothingSaved();
  });
});

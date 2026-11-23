import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { OrderPlacer } from "../../../../../../src/contexts/shop/orders/application/place/OrderPlacer.js";
import { OrderAlreadyPlacedError } from "../../../../../../src/contexts/shop/orders/domain/OrderAlreadyPlacedError.js";
import { EmptyCartError } from "../../../../../../src/contexts/shop/carts/domain/EmptyCartError.js";
import { CartDoesNotExistError } from "../../../../../../src/contexts/shop/carts/domain/CartDoesNotExistError.js";
import { CartMother } from "../../../carts/domain/CartMother.js";
import { MockCartRepository } from "../../../carts/domain/MockCartRepository.js";
import { CatalogItemMother } from "../../../shared/domain/CatalogItemMother.js";
import { MockShopCatalog } from "../../../shared/domain/MockShopCatalog.js";
import { OrderMother } from "../../domain/OrderMother.js";
import { MockOrderRepository } from "../../domain/MockOrderRepository.js";
import { OrderPlacedDomainEventMother } from "../../domain/OrderPlacedDomainEventMother.js";
import { MockClock } from "../../../../shared/domain/MockClock.js";
import { MockEventBus } from "../../../../shared/domain/MockEventBus.js";
import { UuidMother } from "../../../../shared/domain/UuidMother.js";

function scenario() {
  const orders = new MockOrderRepository();
  const carts = new MockCartRepository();
  const catalog = new MockShopCatalog();
  const clock = new MockClock();
  const eventBus = new MockEventBus();
  const placedAt = new Date("2026-11-20T10:00:00Z");
  clock.shouldReturn(placedAt);
  orders.shouldSearchAndReturnNull();
  return { orders, carts, catalog, eventBus, placedAt, placer: new OrderPlacer(orders, carts, catalog, clock, eventBus) };
}

describe("OrderPlacer should", () => {
  it("place an order copying the name and price of each item at that moment", async () => {
    const { orders, carts, catalog, eventBus, placedAt, placer } = scenario();
    const mug = CatalogItemMother.create({ name: "Mug", priceCents: 800 });
    const lamp = CatalogItemMother.create({ name: "Lamp", priceCents: 2500 });
    const cart = CartMother.create({
      items: [{ itemId: mug.id.value, quantity: 2 }, { itemId: lamp.id.value, quantity: 1 }],
    });
    carts.shouldSearch(cart);
    catalog.shouldSearch(mug);
    catalog.shouldSearch(lamp);
    const orderId = UuidMother.create();
    const expected = OrderMother.create({
      id: orderId,
      shopperEmail: cart.shopperEmail.value,
      placedAt: placedAt.toISOString(),
      lines: [
        { itemId: mug.id.value, name: "Mug", priceCents: 800, quantity: 2 },
        { itemId: lamp.id.value, name: "Lamp", priceCents: 2500, quantity: 1 },
      ],
    });

    await placer.place(orderId, cart.id.value);

    orders.assertSaved(expected);
    assert.equal(expected.totalCents(), 4100);
    eventBus.assertPublished([OrderPlacedDomainEventMother.fromOrder(expected)]);
  });

  it("empty the cart once the order is placed", async () => {
    const { carts, catalog, placer } = scenario();
    const item = CatalogItemMother.create();
    const cart = CartMother.withItem(item.id.value, 1);
    carts.shouldSearch(cart);
    catalog.shouldSearch(item);

    await placer.place(UuidMother.create(), cart.id.value);

    carts.assertSaved(CartMother.create({ ...cart.toPrimitives(), items: [] }));
  });

  it("fail when the cart is empty and publish nothing", async () => {
    const { orders, carts, eventBus, placer } = scenario();
    const cart = CartMother.create();
    carts.shouldSearch(cart);

    await assert.rejects(placer.place(UuidMother.create(), cart.id.value), EmptyCartError);
    assert.deepEqual(orders.saved, []);
    eventBus.assertNothingPublished();
  });

  it("fail when the cart does not exist", async () => {
    const { carts, placer } = scenario();
    carts.shouldSearchAndReturnNull();

    await assert.rejects(placer.place(UuidMother.create(), UuidMother.create()), CartDoesNotExistError);
  });

  it("fail when the order was already placed", async () => {
    const { orders, placer } = scenario();
    const existing = OrderMother.create();
    orders.shouldSearch(existing);

    await assert.rejects(placer.place(existing.id.value, UuidMother.create()), OrderAlreadyPlacedError);
  });
});

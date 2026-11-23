import { CartId } from "../../../carts/domain/CartId.js";
import { ExistingCartFinder } from "../../../carts/domain/ExistingCartFinder.js";
import { CatalogItemId } from "../../../shared/domain/CatalogItemId.js";
import { CatalogItemDoesNotExistError } from "../../../shared/domain/CatalogItemDoesNotExistError.js";
import { Order } from "../../domain/Order.js";
import { OrderId } from "../../domain/OrderId.js";
import { OrderAlreadyPlacedError } from "../../domain/OrderAlreadyPlacedError.js";

export class OrderPlacer {
  constructor(orderRepository, cartRepository, catalog, clock, eventBus) {
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.catalog = catalog;
    this.clock = clock;
    this.eventBus = eventBus;
    this.cartFinder = new ExistingCartFinder(cartRepository);
  }

  async place(orderId, cartId) {
    if ((await this.orderRepository.search(new OrderId(orderId))) !== null) throw new OrderAlreadyPlacedError(orderId);
    const cart = await this.cartFinder.find(new CartId(cartId));
    const lines = [];
    for (const { itemId, quantity } of cart.checkout()) {
      const item = await this.catalog.search(new CatalogItemId(itemId));
      if (item === null) throw new CatalogItemDoesNotExistError(itemId);
      lines.push({ itemId, name: item.name, priceCents: item.priceCents, quantity });
    }
    const order = Order.place(orderId, cart.shopperEmail.value, lines, this.clock.now());
    await this.orderRepository.save(order);
    await this.cartRepository.save(cart);
    await this.eventBus.publish(order.pullDomainEvents());
  }
}

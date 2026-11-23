import { InMemoryEventBus } from "../../contexts/shared/infrastructure/InMemoryEventBus.js";
import { SystemClock } from "../../contexts/shared/infrastructure/SystemClock.js";
import { InMemoryProductRepository } from "../../contexts/catalog/products/infrastructure/InMemoryProductRepository.js";
import { ProductCreator } from "../../contexts/catalog/products/application/create/ProductCreator.js";
import { ProductFinder } from "../../contexts/catalog/products/application/find/ProductFinder.js";
import { ProductRenamer } from "../../contexts/catalog/products/application/rename/ProductRenamer.js";
import { ProductPriceChanger } from "../../contexts/catalog/products/application/change-price/ProductPriceChanger.js";
import { ProductStockChanger } from "../../contexts/catalog/products/application/change-stock/ProductStockChanger.js";
import { ProductsSearcher } from "../../contexts/catalog/products/application/search/ProductsSearcher.js";
import { ProductFinderShopCatalog } from "../../contexts/shop/shared/infrastructure/ProductFinderShopCatalog.js";
import { InMemoryCartRepository } from "../../contexts/shop/carts/infrastructure/InMemoryCartRepository.js";
import { CartOpener } from "../../contexts/shop/carts/application/open/CartOpener.js";
import { CartItemAdder } from "../../contexts/shop/carts/application/add-item/CartItemAdder.js";
import { CartItemRemover } from "../../contexts/shop/carts/application/remove-item/CartItemRemover.js";
import { InMemoryOrderRepository } from "../../contexts/shop/orders/infrastructure/InMemoryOrderRepository.js";
import { OrderPlacer } from "../../contexts/shop/orders/application/place/OrderPlacer.js";
import { InMemoryEmailSender } from "../../contexts/notifications/shared/infrastructure/InMemoryEmailSender.js";
import { OrderConfirmationEmailSender } from "../../contexts/notifications/order-confirmations/application/send/OrderConfirmationEmailSender.js";
import { EmailShopperOnOrderPlaced } from "../../contexts/notifications/order-confirmations/infrastructure/EmailShopperOnOrderPlaced.js";
import { InMemoryRestockNotificationRepository } from "../../contexts/notifications/restock-alerts/infrastructure/InMemoryRestockNotificationRepository.js";
import { RestockAlertEmailSender } from "../../contexts/notifications/restock-alerts/application/send/RestockAlertEmailSender.js";
import { EmailShopperOnRestockAlertConsumed } from "../../contexts/notifications/restock-alerts/infrastructure/EmailShopperOnRestockAlertConsumed.js";

/** Composition root of the API: binds every port to its adapter and builds the use cases. */
export function buildContainer() {
  const eventBus = new InMemoryEventBus();
  const clock = new SystemClock();
  const emailSender = new InMemoryEmailSender();

  const productRepository = new InMemoryProductRepository();
  const productFinder = new ProductFinder(productRepository);
  const cartRepository = new InMemoryCartRepository();
  const orderRepository = new InMemoryOrderRepository();
  const catalog = new ProductFinderShopCatalog(productFinder);

  eventBus.addSubscriber(new EmailShopperOnOrderPlaced(new OrderConfirmationEmailSender(emailSender)));
  eventBus.addSubscriber(
    new EmailShopperOnRestockAlertConsumed(new RestockAlertEmailSender(emailSender, new InMemoryRestockNotificationRepository())),
  );

  return {
    emailSender,
    productCreator: new ProductCreator(productRepository),
    productFinder,
    productRenamer: new ProductRenamer(productRepository),
    productPriceChanger: new ProductPriceChanger(productRepository),
    productStockChanger: new ProductStockChanger(productRepository, eventBus),
    productsSearcher: new ProductsSearcher(productRepository),
    cartOpener: new CartOpener(cartRepository),
    cartItemAdder: new CartItemAdder(cartRepository, catalog),
    cartItemRemover: new CartItemRemover(cartRepository),
    orderPlacer: new OrderPlacer(orderRepository, cartRepository, catalog, clock, eventBus),
  };
}

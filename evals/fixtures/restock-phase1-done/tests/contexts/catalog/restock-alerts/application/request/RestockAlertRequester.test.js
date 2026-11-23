import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RestockAlertRequester } from "../../../../../../src/contexts/catalog/restock-alerts/application/request/RestockAlertRequester.js";
import { ProductDoesNotExistError } from "../../../../../../src/contexts/catalog/products/domain/ProductDoesNotExistError.js";
import { RestockAlertMother } from "../../domain/RestockAlertMother.js";
import { RestockAlertRequestedDomainEventMother } from "../../domain/RestockAlertRequestedDomainEventMother.js";
import { MockRestockAlertRepository } from "../../domain/MockRestockAlertRepository.js";
import { ProductMother } from "../../../products/domain/ProductMother.js";
import { MockProductRepository } from "../../../products/domain/MockProductRepository.js";
import { MockEventBus } from "../../../../shared/domain/MockEventBus.js";

describe("RestockAlertRequester should", () => {
  it("request an alert for an out-of-stock product", async () => {
    const alerts = new MockRestockAlertRepository();
    const products = new MockProductRepository();
    const eventBus = new MockEventBus();
    const product = ProductMother.outOfStock();
    const alert = RestockAlertMother.create({ productId: product.id.value });
    products.shouldSearch(product);

    const { id, productId, email } = alert.toPrimitives();
    await new RestockAlertRequester(alerts, products, eventBus).request(id, productId, email);

    alerts.assertSaved(alert);
    eventBus.assertPublished([RestockAlertRequestedDomainEventMother.fromAlert(alert)]);
  });

  it("fail when the product does not exist", async () => {
    const alerts = new MockRestockAlertRepository();
    const products = new MockProductRepository();
    const eventBus = new MockEventBus();
    const { id, productId, email } = RestockAlertMother.create().toPrimitives();
    products.shouldSearchAndReturnNull();

    await assert.rejects(new RestockAlertRequester(alerts, products, eventBus).request(id, productId, email), ProductDoesNotExistError);
    alerts.assertNothingSaved();
    eventBus.assertNothingPublished();
  });
});

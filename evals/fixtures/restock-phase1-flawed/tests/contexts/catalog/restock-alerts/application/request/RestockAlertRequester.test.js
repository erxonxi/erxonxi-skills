import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RestockAlertRequester } from "../../../../../../src/contexts/catalog/restock-alerts/application/request/RestockAlertRequester.js";
import { MockRestockAlertRepository } from "../../domain/MockRestockAlertRepository.js";
import { MockProductRepository } from "../../../products/domain/MockProductRepository.js";
import { ProductMother } from "../../../products/domain/ProductMother.js";

describe("RestockAlertRequester should", () => {
  it("request an alert for an out-of-stock product", async () => {
    const alerts = new MockRestockAlertRepository();
    const products = new MockProductRepository();
    const published = [];
    const product = ProductMother.outOfStock();
    products.shouldSearch(product);

    await new RestockAlertRequester(alerts, products, { publish: async (e) => published.push(...e) })
      .requestAlert(product.id.value, "shopper@example.com");

    assert.equal(alerts.saved.length, 1);
    assert.equal(published[0].name, "RestockAlertRequested");
  });
});

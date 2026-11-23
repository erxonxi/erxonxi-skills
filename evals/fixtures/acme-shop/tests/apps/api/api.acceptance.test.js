import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { buildContainer } from "../../../src/apps/api/container.js";
import { createApiServer } from "../../../src/apps/api/createApiServer.js";

describe("the shop API", () => {
  let server;
  let container;
  let baseUrl;

  before(async () => {
    container = buildContainer();
    server = createApiServer(container);
    await new Promise((resolve) => server.listen(0, resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  after(() => new Promise((resolve) => server.close(resolve)));

  async function call(method, path, body) {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await response.text();
    return { status: response.status, body: text === "" ? null : JSON.parse(text) };
  }

  it("lets a shopper buy a product and emails the confirmation", async () => {
    const productId = randomUUID();
    const cartId = randomUUID();
    const orderId = randomUUID();

    assert.equal((await call("PUT", `/products/${productId}`, { name: "Blue mug", priceCents: 800, stock: 10 })).status, 201);
    assert.equal((await call("PUT", `/products/${productId}/price`, { priceCents: 900 })).status, 204);
    assert.equal((await call("PUT", `/products/${productId}/stock`, { stock: 8 })).status, 204);
    assert.deepEqual((await call("GET", "/products?q=mug")).body.map((p) => p.priceCents), [900]);

    assert.equal((await call("PUT", `/carts/${cartId}`, { shopperEmail: "shopper@example.com" })).status, 201);
    assert.equal((await call("PUT", `/carts/${cartId}/items/${productId}`, { quantity: 2 })).status, 204);
    assert.equal((await call("PUT", `/orders/${orderId}`, { cartId })).status, 201);

    assert.equal(container.emailSender.sent.length, 1);
    assert.equal(container.emailSender.sent[0].to, "shopper@example.com");
    assert.match(container.emailSender.sent[0].body, /18\.00/);
  });

  it("maps domain errors to statuses", async () => {
    const productId = randomUUID();

    const missing = await call("GET", `/products/${productId}`);
    assert.equal(missing.status, 404);
    assert.equal(missing.body.error.type, "ProductDoesNotExistError");

    const invalid = await call("PUT", `/products/${productId}`, { name: "Mug", priceCents: -5, stock: 1 });
    assert.equal(invalid.status, 400);
    assert.equal(invalid.body.error.type, "InvalidProductPriceError");

    assert.equal((await call("PUT", `/products/${productId}`, { name: "Mug", priceCents: 5, stock: 1 })).status, 201);
    assert.equal((await call("PUT", `/products/${productId}`, { name: "Mug", priceCents: 5, stock: 1 })).status, 409);

    const cartId = randomUUID();
    await call("PUT", `/carts/${cartId}`, { shopperEmail: "shopper@example.com" });
    const empty = await call("PUT", `/orders/${randomUUID()}`, { cartId });
    assert.equal(empty.status, 422);
    assert.equal(empty.body.error.type, "EmptyCartError");
  });
});

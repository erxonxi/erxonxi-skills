import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { CreateCustomerHandler } from "../../../../src/modules/customers/handlers/CreateCustomerHandler.js";

function setup() {
  const store = { get: mock.fn(async () => undefined), put: mock.fn(async () => {}) };
  const ids = { next: mock.fn(() => "cus-9") };
  return { store, handler: new CreateCustomerHandler(store, ids) };
}

test("creates a customer with a server generated id", async () => {
  const { store, handler } = setup();

  const result = await handler.execute({ name: " Globex " });

  assert.deepEqual(result, { ok: true, value: { id: "cus-9" } });
  assert.deepEqual(store.put.mock.calls[0].arguments[0], { id: "cus-9", name: "Globex" });
});

test("fails when the name is empty", async () => {
  const { store, handler } = setup();

  const result = await handler.execute({ name: "  " });

  assert.deepEqual(result, { ok: false, error: "CUSTOMER_NAME_EMPTY" });
  assert.equal(store.put.mock.callCount(), 0);
});

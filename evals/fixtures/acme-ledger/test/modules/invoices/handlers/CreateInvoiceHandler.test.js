import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { CreateInvoiceHandler } from "../../../../src/modules/invoices/handlers/CreateInvoiceHandler.js";
import { makeCustomer, makeInvoice } from "../../../support/builders.js";

function setup({ customer = makeCustomer() } = {}) {
  const invoices = { get: mock.fn(async () => undefined), put: mock.fn(async () => {}) };
  const customers = { get: mock.fn(async () => customer), put: mock.fn(async () => {}) };
  const ids = { next: mock.fn(() => "inv-9") };
  return { invoices, customers, handler: new CreateInvoiceHandler(invoices, customers, ids) };
}

test("creates a draft invoice with a server generated id", async () => {
  const { invoices, handler } = setup();
  const { lines } = makeInvoice();

  const result = await handler.execute({ customerId: "cus-1", lines });

  assert.deepEqual(result, { ok: true, value: { id: "inv-9" } });
  assert.equal(invoices.put.mock.calls[0].arguments[0].status, "draft");
});

test("fails when the customer does not exist", async () => {
  const { invoices, handler } = setup({ customer: null });

  const result = await handler.execute({ customerId: "nope", lines: makeInvoice().lines });

  assert.deepEqual(result, { ok: false, error: "CUSTOMER_NOT_FOUND" });
  assert.equal(invoices.put.mock.callCount(), 0);
});

test("fails when there are no lines", async () => {
  const { handler } = setup();

  const result = await handler.execute({ customerId: "cus-1", lines: [] });

  assert.deepEqual(result, { ok: false, error: "INVOICE_WITHOUT_LINES" });
});

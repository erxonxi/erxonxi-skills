import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { IssueInvoiceHandler } from "../../../../src/modules/invoices/handlers/IssueInvoiceHandler.js";
import { makeInvoice } from "../../../support/builders.js";

function setup(invoice) {
  const store = { get: mock.fn(async () => invoice), put: mock.fn(async () => {}) };
  return { store, handler: new IssueInvoiceHandler(store) };
}

test("issues a draft invoice", async () => {
  const { store, handler } = setup(makeInvoice({ status: "draft" }));

  const result = await handler.execute({ invoiceId: "inv-1" });

  assert.equal(result.ok, true);
  assert.equal(store.put.mock.calls[0].arguments[0].status, "issued");
});

test("fails when the invoice is not a draft", async () => {
  const { store, handler } = setup(makeInvoice({ status: "issued" }));

  const result = await handler.execute({ invoiceId: "inv-1" });

  assert.deepEqual(result, { ok: false, error: "INVOICE_NOT_DRAFT" });
  assert.equal(store.put.mock.callCount(), 0);
});

test("fails when the invoice does not exist", async () => {
  const { handler } = setup(undefined);

  const result = await handler.execute({ invoiceId: "nope" });

  assert.deepEqual(result, { ok: false, error: "INVOICE_NOT_FOUND" });
});

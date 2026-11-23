import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { GetInvoiceHandler } from "../../../../src/modules/invoices/handlers/GetInvoiceHandler.js";
import { makeInvoice } from "../../../support/builders.js";

test("returns the invoice with its total", async () => {
  const store = { get: mock.fn(async () => makeInvoice()) };

  const result = await new GetInvoiceHandler(store).execute({ invoiceId: "inv-1" });

  assert.equal(result.ok, true);
  assert.equal(result.value.total, 100);
});

test("fails when the invoice does not exist", async () => {
  const store = { get: mock.fn(async () => undefined) };

  const result = await new GetInvoiceHandler(store).execute({ invoiceId: "nope" });

  assert.deepEqual(result, { ok: false, error: "INVOICE_NOT_FOUND" });
});

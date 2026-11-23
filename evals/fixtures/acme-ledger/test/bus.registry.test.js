import { test } from "node:test";
import assert from "node:assert/strict";
import { buildBus } from "../src/bus/registry.js";
import { RandomIdGenerator } from "../src/shared/RandomIdGenerator.js";
import { InMemoryInvoiceStore } from "../src/modules/invoices/persistence/InMemoryInvoiceStore.js";
import { InMemoryCustomerStore } from "../src/modules/customers/persistence/InMemoryCustomerStore.js";

function setup() {
  return buildBus({
    ids: new RandomIdGenerator(),
    invoiceStore: new InMemoryInvoiceStore(),
    customerStore: new InMemoryCustomerStore(),
  });
}

test("an invoice goes from draft to paid through the bus", async () => {
  const bus = setup();
  const customer = await bus.dispatch("CreateCustomer", { name: "Globex" });
  const lines = [{ description: "Consulting", quantity: 2, unitPrice: 50 }];
  const created = await bus.dispatch("CreateInvoice", { customerId: customer.value.id, lines });
  const invoiceId = created.value.id;

  assert.deepEqual(await bus.dispatch("PayInvoice", { invoiceId }), { ok: false, error: "INVOICE_NOT_ISSUED" });
  assert.equal((await bus.dispatch("IssueInvoice", { invoiceId })).ok, true);
  assert.equal((await bus.dispatch("PayInvoice", { invoiceId })).ok, true);

  const found = await bus.dispatch("GetInvoice", { invoiceId });
  assert.equal(found.value.status, "paid");
  assert.equal(found.value.total, 100);
});

test("an unknown command is a failure, not an exception", async () => {
  const result = await setup().dispatch("Nope", {});
  assert.deepEqual(result, { ok: false, error: "UNKNOWN_COMMAND" });
});

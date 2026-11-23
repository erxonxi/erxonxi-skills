import { test } from "node:test";
import assert from "node:assert/strict";
import { createInvoice, issue, markPaid, totalOf } from "../../../../src/modules/invoices/model/invoice.js";
import { makeInvoice } from "../../../support/builders.js";

test("a new invoice starts as a draft", () => {
  const invoice = createInvoice({ id: "inv-1", customerId: "cus-1", lines: [] });
  assert.equal(invoice.status, "draft");
});

test("issue and markPaid return a new invoice and leave the original alone", () => {
  const draft = makeInvoice();
  const issued = issue(draft);
  assert.equal(issued.status, "issued");
  assert.equal(markPaid(issued).status, "paid");
  assert.equal(draft.status, "draft");
});

test("the total adds quantity times unit price of every line", () => {
  const invoice = makeInvoice({
    lines: [
      { description: "A", quantity: 2, unitPrice: 50 },
      { description: "B", quantity: 1, unitPrice: 25 },
    ],
  });
  assert.equal(totalOf(invoice), 125);
});

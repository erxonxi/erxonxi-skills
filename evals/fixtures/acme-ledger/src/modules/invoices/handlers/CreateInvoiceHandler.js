import { ok, fail } from "../../../shared/result.js";
import { createInvoice } from "../model/invoice.js";

export class CreateInvoiceHandler {
  constructor(invoices, customers, ids) {
    this.invoices = invoices;
    this.customers = customers;
    this.ids = ids;
  }

  async execute({ customerId, lines }) {
    if (!(await this.customers.get(customerId))) return fail("CUSTOMER_NOT_FOUND");
    if (lines.length === 0) return fail("INVOICE_WITHOUT_LINES");

    const invoice = createInvoice({ id: this.ids.next(), customerId, lines });
    await this.invoices.put(invoice);
    return ok({ id: invoice.id });
  }
}

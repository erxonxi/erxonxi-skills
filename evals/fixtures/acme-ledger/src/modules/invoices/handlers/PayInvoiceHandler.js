import { ok, fail } from "../../../shared/result.js";
import { markPaid } from "../model/invoice.js";

export class PayInvoiceHandler {
  constructor(invoices) {
    this.invoices = invoices;
  }

  async execute({ invoiceId }) {
    const invoice = await this.invoices.get(invoiceId);
    if (!invoice) return fail("INVOICE_NOT_FOUND");
    if (invoice.status !== "issued") return fail("INVOICE_NOT_ISSUED");

    await this.invoices.put(markPaid(invoice));
    return ok(undefined);
  }
}

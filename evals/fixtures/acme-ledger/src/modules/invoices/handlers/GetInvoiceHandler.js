import { ok, fail } from "../../../shared/result.js";
import { totalOf } from "../model/invoice.js";

export class GetInvoiceHandler {
  constructor(invoices) {
    this.invoices = invoices;
  }

  async execute({ invoiceId }) {
    const invoice = await this.invoices.get(invoiceId);
    if (!invoice) return fail("INVOICE_NOT_FOUND");

    return ok({ ...invoice, total: totalOf(invoice) });
  }
}

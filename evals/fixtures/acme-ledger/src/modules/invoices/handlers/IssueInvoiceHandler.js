import { ok, fail } from "../../../shared/result.js";
import { issue } from "../model/invoice.js";

export class IssueInvoiceHandler {
  constructor(invoices) {
    this.invoices = invoices;
  }

  async execute({ invoiceId }) {
    const invoice = await this.invoices.get(invoiceId);
    if (!invoice) return fail("INVOICE_NOT_FOUND");
    if (invoice.status !== "draft") return fail("INVOICE_NOT_DRAFT");

    await this.invoices.put(issue(invoice));
    return ok(undefined);
  }
}

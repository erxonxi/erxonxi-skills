// status: "draft" | "issued" | "paid"

export function createInvoice({ id, customerId, lines }) {
  return { id, customerId, lines, status: "draft" };
}

export function issue(invoice) {
  return { ...invoice, status: "issued" };
}

export function markPaid(invoice) {
  return { ...invoice, status: "paid" };
}

export function totalOf(invoice) {
  return invoice.lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
}

export function makeInvoice(overrides = {}) {
  return {
    id: "inv-1",
    customerId: "cus-1",
    lines: [{ description: "Consulting", quantity: 2, unitPrice: 50 }],
    status: "draft",
    ...overrides,
  };
}

export function makeCustomer(overrides = {}) {
  return { id: "cus-1", name: "Globex", ...overrides };
}

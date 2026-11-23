/**
 * Port: keeps invoices. `get` resolves to undefined when the id is unknown.
 * @typedef {{ get(id: string): Promise<object | undefined>, put(invoice: object): Promise<void> }} InvoiceStore
 */
export {};

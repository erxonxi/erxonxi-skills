export class InMemoryInvoiceStore {
  #byId = new Map();

  async get(id) {
    return this.#byId.get(id);
  }

  async put(invoice) {
    this.#byId.set(invoice.id, invoice);
  }
}

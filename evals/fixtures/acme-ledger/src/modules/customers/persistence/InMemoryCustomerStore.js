export class InMemoryCustomerStore {
  #byId = new Map();

  async get(id) {
    return this.#byId.get(id);
  }

  async put(customer) {
    this.#byId.set(customer.id, customer);
  }
}

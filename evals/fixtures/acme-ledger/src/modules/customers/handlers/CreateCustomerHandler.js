import { ok, fail } from "../../../shared/result.js";
import { createCustomer } from "../model/customer.js";

export class CreateCustomerHandler {
  constructor(customers, ids) {
    this.customers = customers;
    this.ids = ids;
  }

  async execute({ name }) {
    if (!name || name.trim() === "") return fail("CUSTOMER_NAME_EMPTY");

    const customer = createCustomer({ id: this.ids.next(), name: name.trim() });
    await this.customers.put(customer);
    return ok({ id: customer.id });
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export class InvalidProductIdError extends Error {
  constructor(value) {
    super(`<${value}> is not a valid product id`);
    this.name = "InvalidProductIdError";
  }
}

export class ProductId {
  constructor(value) {
    if (!UUID.test(value)) throw new InvalidProductIdError(value);
    this.value = value;
  }
}

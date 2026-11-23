export class ProductDoesNotExistError extends Error {
  constructor(id) {
    super(`The product <${id}> does not exist`);
    this.name = "ProductDoesNotExistError";
  }
}

export class ProductsSearcher {
  constructor(repository) {
    this.repository = repository;
  }

  async search(text) {
    const needle = text.toLowerCase();
    const products = await this.repository.searchAll();
    return products
      .map((product) => product.toPrimitives())
      .filter((product) => product.name.toLowerCase().includes(needle));
  }
}

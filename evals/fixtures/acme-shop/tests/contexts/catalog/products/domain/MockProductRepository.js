import assert from "node:assert/strict";

export class MockProductRepository {
  constructor() {
    this.searchResult = null;
    this.saved = [];
  }

  shouldSearch(product) {
    this.searchResult = product;
  }

  shouldSearchAndReturnNull() {
    this.searchResult = null;
  }

  async search(_id) {
    return this.searchResult;
  }

  async save(product) {
    this.saved.push(product);
  }

  assertSaved(product) {
    assert.deepEqual(this.saved.map((p) => p.toPrimitives()), [product.toPrimitives()]);
  }
}

import assert from "node:assert/strict";

export class MockCartRepository {
  constructor() {
    this.searchResult = null;
    this.saved = [];
  }

  shouldSearch(cart) {
    this.searchResult = cart;
  }

  shouldSearchAndReturnNull() {
    this.searchResult = null;
  }

  async search(_id) {
    return this.searchResult;
  }

  async save(cart) {
    this.saved.push(cart.toPrimitives());
  }

  assertSaved(cart) {
    assert.deepEqual(this.saved, [cart.toPrimitives()]);
  }
}

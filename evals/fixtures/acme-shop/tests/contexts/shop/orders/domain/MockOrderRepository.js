import assert from "node:assert/strict";

export class MockOrderRepository {
  constructor() {
    this.searchResult = null;
    this.saved = [];
  }

  shouldSearch(order) {
    this.searchResult = order;
  }

  shouldSearchAndReturnNull() {
    this.searchResult = null;
  }

  async search(_id) {
    return this.searchResult;
  }

  async save(order) {
    this.saved.push(order.toPrimitives());
  }

  assertSaved(order) {
    assert.deepEqual(this.saved, [order.toPrimitives()]);
  }
}

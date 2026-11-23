import assert from "node:assert/strict";

export class MockActivityRepository {
  constructor() {
    this.searchResult = null;
    this.saved = [];
    this.dealResult = [];
  }

  shouldSearch(aggregate) {
    this.searchResult = aggregate;
  }

  shouldSearchAndReturnNull() {
    this.searchResult = null;
  }

  shouldSearchByDeal(aggregates) {
    this.dealResult = aggregates;
  }

  async searchByDeal(_id) {
    return this.dealResult;
  }

  async search(_id) {
    return this.searchResult;
  }

  async save(aggregate) {
    this.saved.push(aggregate.toPrimitives());
  }

  assertSaved(aggregate) {
    assert.deepEqual(this.saved, [aggregate.toPrimitives()]);
  }
}

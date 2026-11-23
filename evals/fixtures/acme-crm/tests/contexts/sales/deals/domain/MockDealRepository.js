import assert from "node:assert/strict";

export class MockDealRepository {
  constructor() {
    this.searchResult = null;
    this.saved = [];
    this.companyResult = [];
  }

  shouldSearch(aggregate) {
    this.searchResult = aggregate;
  }

  shouldSearchAndReturnNull() {
    this.searchResult = null;
  }

  shouldSearchByCompany(aggregates) {
    this.companyResult = aggregates;
  }

  async searchByCompany(_id) {
    return this.companyResult;
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

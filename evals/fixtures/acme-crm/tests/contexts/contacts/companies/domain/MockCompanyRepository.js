import assert from "node:assert/strict";

export class MockCompanyRepository {
  constructor() {
    this.searchResult = null;
    this.saved = [];
  }

  shouldSearch(aggregate) {
    this.searchResult = aggregate;
  }

  shouldSearchAndReturnNull() {
    this.searchResult = null;
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

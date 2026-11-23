import assert from "node:assert/strict";

export class MockRefundRepository {
  constructor() {
    this.saved = [];
  }

  async save(refund) {
    this.saved.push(refund.toPrimitives());
  }

  assertSaved(refund) {
    assert.deepEqual(this.saved, [refund.toPrimitives()]);
  }

  assertNothingSaved() {
    assert.deepEqual(this.saved, []);
  }
}

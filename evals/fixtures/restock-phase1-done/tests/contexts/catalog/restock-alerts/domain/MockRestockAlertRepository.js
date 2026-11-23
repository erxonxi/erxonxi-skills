import assert from "node:assert/strict";

export class MockRestockAlertRepository {
  constructor() {
    this.saved = [];
  }

  async save(alert) {
    this.saved.push(alert);
  }

  assertSaved(alert) {
    assert.deepEqual(this.saved.map((a) => a.toPrimitives()), [alert.toPrimitives()]);
  }

  assertNothingSaved() {
    assert.deepEqual(this.saved, []);
  }
}

import assert from "node:assert/strict";

export class MockRestockNotificationRepository {
  constructor() {
    this.saved = [];
  }

  async save(notification) {
    this.saved.push(notification.toPrimitives());
  }

  assertSaved(notification) {
    assert.deepEqual(this.saved, [notification.toPrimitives()]);
  }

  assertSavedFor(productId, email) {
    assert.equal(this.saved.length, 1);
    assert.equal(this.saved[0].productId, productId);
    assert.equal(this.saved[0].email, email);
  }
}

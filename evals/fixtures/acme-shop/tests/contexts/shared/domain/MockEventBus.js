import assert from "node:assert/strict";

export class MockEventBus {
  constructor() {
    this.published = [];
  }

  async publish(events) {
    this.published.push(...events);
  }

  assertPublished(expectedEvents) {
    assert.deepEqual(this.published.map((e) => e.toPrimitives()), expectedEvents.map((e) => e.toPrimitives()));
  }

  assertNothingPublished() {
    assert.deepEqual(this.published, []);
  }
}

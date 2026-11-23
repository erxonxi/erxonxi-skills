import assert from "node:assert/strict";

export class MockEmailSender {
  constructor() {
    this.sent = [];
  }

  async send(to, subject, body) {
    this.sent.push({ to, subject, body });
  }

  assertSentTo(to) {
    assert.equal(this.sent.length, 1);
    assert.equal(this.sent[0].to, to);
  }
}

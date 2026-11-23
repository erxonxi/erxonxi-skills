import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InMemoryEventBus } from "../../../../src/contexts/shared/infrastructure/InMemoryEventBus.js";
import { DomainEvent } from "../../../../src/contexts/shared/domain/DomainEvent.js";
import { UuidMother } from "../domain/UuidMother.js";

class SomethingHappenedSubscriber {
  constructor() {
    this.received = [];
  }

  subscribedTo() {
    return ["acme.test.something.happened"];
  }

  async on(event) {
    this.received.push(event);
  }
}

describe("InMemoryEventBus should", () => {
  it("deliver an event to the subscribers of its name", async () => {
    const bus = new InMemoryEventBus();
    const subscriber = new SomethingHappenedSubscriber();
    bus.addSubscriber(subscriber);
    const event = new DomainEvent("acme.test.something.happened", UuidMother.create(), {});

    await bus.publish([event]);

    assert.deepEqual(subscriber.received, [event]);
  });

  it("ignore events nobody subscribed to", async () => {
    const bus = new InMemoryEventBus();
    const subscriber = new SomethingHappenedSubscriber();
    bus.addSubscriber(subscriber);

    await bus.publish([new DomainEvent("acme.test.other.happened", UuidMother.create(), {})]);

    assert.deepEqual(subscriber.received, []);
  });
});

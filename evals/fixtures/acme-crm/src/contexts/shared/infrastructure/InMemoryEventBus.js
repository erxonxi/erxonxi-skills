import { EventBus } from "../domain/EventBus.js";

export class InMemoryEventBus extends EventBus {
  constructor() {
    super();
    this.subscribers = new Map();
  }

  addSubscriber(subscriber) {
    for (const eventName of subscriber.subscribedTo()) {
      const forEvent = this.subscribers.get(eventName) ?? [];
      this.subscribers.set(eventName, [...forEvent, subscriber]);
    }
  }

  async publish(events) {
    for (const event of events) {
      for (const subscriber of this.subscribers.get(event.eventName) ?? []) {
        await subscriber.on(event);
      }
    }
  }
}

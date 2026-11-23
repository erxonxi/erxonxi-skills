import { randomUUID } from "node:crypto";

export class DomainEvent {
  constructor(eventName, aggregateId, attributes) {
    this.eventName = eventName;
    this.aggregateId = aggregateId;
    this.attributes = attributes;
    this.eventId = randomUUID();
    this.occurredOn = new Date();
  }

  toPrimitives() {
    return { eventName: this.eventName, aggregateId: this.aggregateId, ...this.attributes };
  }
}

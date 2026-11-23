export class AggregateRoot {
  constructor() {
    this.domainEvents = [];
  }

  record(event) {
    this.domainEvents.push(event);
  }

  pullDomainEvents() {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }
}

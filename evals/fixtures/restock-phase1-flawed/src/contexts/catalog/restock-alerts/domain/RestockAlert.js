export class RestockAlert {
  constructor(id, productId, email, status) {
    this.id = id;
    this.productId = productId;
    this.email = email;
    this.status = status;
    this.events = [];
  }

  static request(id, productId, email) {
    const alert = new RestockAlert(id, productId, email, "pending");
    alert.events.push({ name: "RestockAlertRequested", alertId: id, productId, email });
    return alert;
  }

  cancel() {
    this.status = "cancelled";
  }

  pullDomainEvents() {
    const events = this.events;
    this.events = [];
    return events;
  }

  toPrimitives() {
    return { id: this.id, productId: this.productId, email: this.email, status: this.status };
  }
}

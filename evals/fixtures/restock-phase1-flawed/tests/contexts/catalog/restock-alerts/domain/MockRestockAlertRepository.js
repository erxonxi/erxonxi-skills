export class MockRestockAlertRepository {
  constructor() {
    this.saved = [];
  }

  async save(alert) {
    this.saved.push(alert);
  }
}

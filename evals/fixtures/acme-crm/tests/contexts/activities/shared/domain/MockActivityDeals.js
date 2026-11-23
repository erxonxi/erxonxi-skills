export class MockActivityDeals {
  constructor() {
    this.existing = new Set();
  }

  shouldFind(dealId) {
    this.existing.add(dealId);
  }

  async exists(dealId) {
    return this.existing.has(dealId.value);
  }
}

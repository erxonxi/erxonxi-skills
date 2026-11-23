export class MockShopCatalog {
  constructor() {
    this.items = new Map();
  }

  shouldSearch(item) {
    this.items.set(item.id.value, item);
  }

  shouldSearchAndReturnNull(id) {
    this.items.delete(id.value);
  }

  async search(id) {
    return this.items.get(id.value) ?? null;
  }
}

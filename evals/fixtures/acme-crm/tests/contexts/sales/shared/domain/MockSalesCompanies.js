export class MockSalesCompanies {
  constructor() {
    this.companies = new Map();
  }

  shouldSearch(company) {
    this.companies.set(company.id.value, company);
  }

  shouldSearchAndReturnNull(id) {
    this.companies.delete(id.value);
  }

  async search(id) {
    return this.companies.get(id.value) ?? null;
  }
}

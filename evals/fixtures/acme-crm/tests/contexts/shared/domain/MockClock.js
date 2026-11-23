export class MockClock {
  shouldReturn(date) {
    this.date = date;
  }

  now() {
    return this.date;
  }
}

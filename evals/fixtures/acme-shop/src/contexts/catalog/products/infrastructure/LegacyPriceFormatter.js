export class LegacyPriceFormatter {
  static format(cents) {
    return `${(cents / 100).toFixed(2)} EUR`;
  }
}

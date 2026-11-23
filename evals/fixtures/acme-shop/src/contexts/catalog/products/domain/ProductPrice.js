import { LegacyPriceFormatter } from "../infrastructure/LegacyPriceFormatter.js";

export class ProductPrice {
  constructor(cents) {
    if (!Number.isInteger(cents) || cents < 0) throw new Error(`invalid price <${cents}>`);
    this.cents = cents;
  }

  toDisplay() {
    return LegacyPriceFormatter.format(this.cents);
  }
}

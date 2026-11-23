import { LegacyPriceFormatter } from "../infrastructure/LegacyPriceFormatter.js";
import { InvalidProductPriceError } from "./InvalidProductPriceError.js";

export class ProductPrice {
  constructor(cents) {
    if (!Number.isInteger(cents) || cents < 0) throw new InvalidProductPriceError(cents);
    this.cents = cents;
  }

  toDisplay() {
    return LegacyPriceFormatter.format(this.cents);
  }
}

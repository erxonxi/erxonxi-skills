import { CatalogItemId } from "../../shared/domain/CatalogItemId.js";

export class RefundLine {
  constructor(itemId, refundedCents) {
    this.itemId = itemId;
    this.refundedCents = refundedCents;
  }

  static fromPrimitives({ itemId, refundedCents }) {
    return new RefundLine(new CatalogItemId(itemId), refundedCents);
  }

  toPrimitives() {
    return { itemId: this.itemId.value, refundedCents: this.refundedCents };
  }
}

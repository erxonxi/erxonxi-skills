import { DealWonDomainEvent } from "../../../../../src/contexts/sales/deals/domain/DealWonDomainEvent.js";
import { DealLostDomainEvent } from "../../../../../src/contexts/sales/deals/domain/DealLostDomainEvent.js";

export class DealEventsMother {
  static wonFrom(deal) {
    return new DealWonDomainEvent(deal.id.value, deal.companyId.value, deal.title.value, deal.amount.cents, deal.ownerEmail.value);
  }

  static lostFrom(deal, reason) {
    return new DealLostDomainEvent(deal.id.value, deal.companyId.value, reason);
  }
}

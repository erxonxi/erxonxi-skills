import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { SalesCompanyId } from "../../shared/domain/SalesCompanyId.js";
import { DealId } from "./DealId.js";
import { DealTitle } from "./DealTitle.js";
import { DealAmount } from "./DealAmount.js";
import { OwnerEmail } from "./OwnerEmail.js";
import { DealStatus } from "./DealStatus.js";
import { DealAlreadyClosedError } from "./DealAlreadyClosedError.js";
import { DealWonDomainEvent } from "./DealWonDomainEvent.js";
import { DealLostDomainEvent } from "./DealLostDomainEvent.js";

/** The deal keeps its own copy of the company name, taken when the deal is opened. */
export class Deal extends AggregateRoot {
  constructor(id, companyId, companyName, title, amount, ownerEmail, status, lostReason) {
    super();
    this.id = id;
    this.companyId = companyId;
    this.companyName = companyName;
    this.title = title;
    this.amount = amount;
    this.ownerEmail = ownerEmail;
    this.status = status;
    this.lostReason = lostReason;
  }

  static open(id, companyId, companyName, title, amountCents, ownerEmail) {
    return Deal.fromPrimitives({ id, companyId, companyName, title, amountCents, ownerEmail, status: "open", lostReason: null });
  }

  static fromPrimitives({ id, companyId, companyName, title, amountCents, ownerEmail, status, lostReason }) {
    return new Deal(
      new DealId(id),
      new SalesCompanyId(companyId),
      companyName,
      new DealTitle(title),
      new DealAmount(amountCents),
      new OwnerEmail(ownerEmail),
      new DealStatus(status),
      lostReason,
    );
  }

  win() {
    this.ensureIsOpen();
    this.status = DealStatus.won();
    this.record(new DealWonDomainEvent(this.id.value, this.companyId.value, this.title.value, this.amount.cents, this.ownerEmail.value));
  }

  lose(reason) {
    this.ensureIsOpen();
    this.status = DealStatus.lost();
    this.lostReason = reason;
    this.record(new DealLostDomainEvent(this.id.value, this.companyId.value, reason));
  }

  rename(title) {
    this.ensureIsOpen();
    this.title = new DealTitle(title);
  }

  changeAmount(amountCents) {
    this.ensureIsOpen();
    this.amount = new DealAmount(amountCents);
  }

  ensureIsOpen() {
    if (!this.status.isOpen()) throw new DealAlreadyClosedError(this.id.value, this.status.value);
  }

  toPrimitives() {
    return {
      id: this.id.value,
      companyId: this.companyId.value,
      companyName: this.companyName,
      title: this.title.value,
      amountCents: this.amount.cents,
      ownerEmail: this.ownerEmail.value,
      status: this.status.value,
      lostReason: this.lostReason,
    };
  }
}

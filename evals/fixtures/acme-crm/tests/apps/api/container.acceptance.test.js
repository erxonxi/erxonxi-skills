import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { buildContainer } from "../../../src/apps/api/container.js";

describe("the wired CRM", () => {
  it("runs a deal from company to won with its activity", async () => {
    const container = buildContainer();
    const published = [];
    container.eventBus.addSubscriber({ subscribedTo: () => ["acme.sales.deal.won"], on: async (event) => published.push(event) });
    const [companyId, dealId, activityId, contactId] = [randomUUID(), randomUUID(), randomUUID(), randomUUID()];

    await container.companyCreator.create(companyId, "Initech");
    await container.contactCreator.create(contactId, companyId, "Bill", "bill@initech.example");
    await container.dealOpener.open(dealId, companyId, "Renewal", 500000, "owner@acme.example");
    await container.activityLogger.log(activityId, dealId, "call", "Intro call");
    await container.dealWinner.win(dealId);

    assert.equal((await container.dealFinder.find(dealId)).companyName, "Initech");
    assert.equal((await container.dealFinder.find(dealId)).status, "won");
    assert.equal((await container.activitiesByDealSearcher.search(dealId)).length, 1);
    assert.equal((await container.contactsByCompanySearcher.search(companyId)).length, 1);
    assert.equal(published.length, 1);
  });
});

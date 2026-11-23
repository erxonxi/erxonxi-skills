import { InMemoryEventBus } from "../../contexts/shared/infrastructure/InMemoryEventBus.js";
import { SystemClock } from "../../contexts/shared/infrastructure/SystemClock.js";
import { InMemoryCompanyRepository } from "../../contexts/contacts/companies/infrastructure/InMemoryCompanyRepository.js";
import { CompanyCreator } from "../../contexts/contacts/companies/application/create/CompanyCreator.js";
import { CompanyFinder } from "../../contexts/contacts/companies/application/find/CompanyFinder.js";
import { InMemoryContactRepository } from "../../contexts/contacts/contacts/infrastructure/InMemoryContactRepository.js";
import { ContactCreator } from "../../contexts/contacts/contacts/application/create/ContactCreator.js";
import { ContactsByCompanySearcher } from "../../contexts/contacts/contacts/application/search/ContactsByCompanySearcher.js";
import { CompanyFinderSalesCompanies } from "../../contexts/sales/shared/infrastructure/CompanyFinderSalesCompanies.js";
import { InMemoryDealRepository } from "../../contexts/sales/deals/infrastructure/InMemoryDealRepository.js";
import { DealOpener } from "../../contexts/sales/deals/application/open/DealOpener.js";
import { DealWinner } from "../../contexts/sales/deals/application/win/DealWinner.js";
import { DealLoser } from "../../contexts/sales/deals/application/lose/DealLoser.js";
import { DealFinder } from "../../contexts/sales/deals/application/find/DealFinder.js";
import { DealService } from "../../contexts/sales/deals/application/DealService.js";
import { DealsByCompanySearcher } from "../../contexts/sales/deals/application/search/DealsByCompanySearcher.js";
import { DealFinderActivityDeals } from "../../contexts/activities/shared/infrastructure/DealFinderActivityDeals.js";
import { InMemoryActivityRepository } from "../../contexts/activities/activities/infrastructure/InMemoryActivityRepository.js";
import { ActivityLogger } from "../../contexts/activities/activities/application/log/ActivityLogger.js";
import { ActivitiesByDealSearcher } from "../../contexts/activities/activities/application/search/ActivitiesByDealSearcher.js";

/** Composition root: binds every port to its adapter and builds the use cases. */
export function buildContainer() {
  const eventBus = new InMemoryEventBus();
  const clock = new SystemClock();

  const companyRepository = new InMemoryCompanyRepository();
  const contactRepository = new InMemoryContactRepository();
  const dealRepository = new InMemoryDealRepository();
  const activityRepository = new InMemoryActivityRepository();

  const companyFinder = new CompanyFinder(companyRepository);
  const dealFinder = new DealFinder(dealRepository);
  const salesCompanies = new CompanyFinderSalesCompanies(companyFinder);
  const activityDeals = new DealFinderActivityDeals(dealFinder);

  return {
    eventBus,
    companyCreator: new CompanyCreator(companyRepository),
    companyFinder,
    contactCreator: new ContactCreator(contactRepository, companyRepository),
    contactsByCompanySearcher: new ContactsByCompanySearcher(contactRepository),
    dealOpener: new DealOpener(dealRepository, salesCompanies),
    dealWinner: new DealWinner(dealRepository, eventBus),
    dealLoser: new DealLoser(dealRepository, eventBus),
    dealFinder,
    dealService: new DealService(dealRepository),
    dealsByCompanySearcher: new DealsByCompanySearcher(dealRepository),
    activityLogger: new ActivityLogger(activityRepository, activityDeals, clock, eventBus),
    activitiesByDealSearcher: new ActivitiesByDealSearcher(activityRepository),
  };
}

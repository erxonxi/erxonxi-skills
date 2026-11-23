import { CommandBus } from "./CommandBus.js";
import { CreateInvoiceHandler } from "../modules/invoices/handlers/CreateInvoiceHandler.js";
import { IssueInvoiceHandler } from "../modules/invoices/handlers/IssueInvoiceHandler.js";
import { PayInvoiceHandler } from "../modules/invoices/handlers/PayInvoiceHandler.js";
import { GetInvoiceHandler } from "../modules/invoices/handlers/GetInvoiceHandler.js";
import { CreateCustomerHandler } from "../modules/customers/handlers/CreateCustomerHandler.js";

export function buildBus({ ids, invoiceStore, customerStore }) {
  const bus = new CommandBus();
  bus.register("CreateCustomer", new CreateCustomerHandler(customerStore, ids));
  bus.register("CreateInvoice", new CreateInvoiceHandler(invoiceStore, customerStore, ids));
  bus.register("IssueInvoice", new IssueInvoiceHandler(invoiceStore));
  bus.register("PayInvoice", new PayInvoiceHandler(invoiceStore));
  bus.register("GetInvoice", new GetInvoiceHandler(invoiceStore));
  return bus;
}

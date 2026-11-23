---
type: regex
target: {source: file, path: src/modules/invoices/handlers/VoidInvoiceHandler.js}
match: contains
---
fail\(\s*["']INVOICE_[A-Z_]+["']

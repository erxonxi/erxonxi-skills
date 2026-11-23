---
type: regex
target: last_message
match: not_contains
flags: im
---
^\s*(?:#+\s*|\*\*)*(?:(?:phase|step|stage|wave)\s*\d+|\d+)\s*[:.)—–-]?\s*(?:\*\*)?\s*(?:the\s+)?(?:domain|application(?: layer)?|infrastructure|persistence|database|schema|backend|frontend|http adapter|tests?|testing|qa|wiring|integration|hardening|cleanup)\b\s*(?:\*\*)?\s*(?:$|[:(—–-])|^\s*(?:#+\s*|\*\*)*(?:phase|step|stage|wave)\s*\d+[^\n]{0,60}\b(?:hardening|cleanup|qa|end-to-end pass)\b

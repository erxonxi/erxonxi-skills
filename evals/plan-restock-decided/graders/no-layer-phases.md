---
type: regex
target: last_message
match: not_contains
flags: im
---
^\s*(?:#+\s*|\*\*|\d+[.)]\s*)*(?:phase|step|stage)\s*\d+\s*[:.)—–-]?\s*(?:\*\*)?\s*(?:the\s+)?(?:domain|infrastructure|application layer|persistence|database|schema|tests?|testing|wiring|integration|hardening|cleanup)\b

---
type: regex
target: {source: file, path: docs/returns-breakdown.md}
match: not_contains
flags: im
---
^#+\s*(?:(?:phase|step|slice|milestone|stage|track|stream|workstream)\s*\d*\s*[:.)—–-]?\s*|\d+[.)]\s*)?(?:backend|frontend|front-end|back-end|database|schema|domain layer|infrastructure|testing|qa|documentation|hardening|cleanup)\b

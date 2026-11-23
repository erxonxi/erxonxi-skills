---
type: regex
target: {source: file, path: .agents/plans/2026-11-20-restock-alerts.md}
match: contains
flags: i
---
## Next step\s+[^\n]*(?:Phase 2|Phase 1\b[^\n]*(?:finish|review|evaluat|open|pending))

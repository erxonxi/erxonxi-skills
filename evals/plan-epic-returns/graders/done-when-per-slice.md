---
type: regex
target: {source: file, path: docs/returns-breakdown.md}
match: contains
flags: i
---
(?:[\s\S]*?(?:done when|verified by|check:)){3}

---
type: regex
target: {source: file, path: docs/returns-breakdown.md}
match: not_contains
flags: i
---
story points?|\b\d+(?:\.\d+)?\s*(?:h|hrs?|hours?|person-days?|man-days?|pts)\b|t-shirt|\bsprint \d|velocity

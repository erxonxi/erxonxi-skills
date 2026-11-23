---
type: regex
target: {source: file, path: docs/returns-breakdown.md}
match: not_contains
flags: i
---
\|\s*(?:days|effort|estimate|size|load)\s*\|

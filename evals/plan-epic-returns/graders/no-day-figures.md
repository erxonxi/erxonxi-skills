---
type: regex
target: {source: file, path: docs/returns-breakdown.md}
match: not_contains
---
(?:[\s\S]*?\b\d+(?:\.\d+)?\s*(?:(?:to|-|–)\s*\d+(?:\.\d+)?\s*)?(?:working[ -]|person[ -]|ideal\s+(?:person[ -])?)?days?\b){4}

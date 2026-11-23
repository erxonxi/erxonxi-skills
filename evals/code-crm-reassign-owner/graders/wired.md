---
type: regex
target: {source: file, path: src/apps/api/container.js}
match: contains
---
new \w*(Owner|Reassign|Hand[Oo]ver|Transfer)\w*\(

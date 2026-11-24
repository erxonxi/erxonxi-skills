# Techniques: splitting, loosening dependencies, mapping to the tool

Reference tables for steps 3, 4 and the roadmap section of `erxonxi-roadmap`. Read the one you need when the first cut, a dependency or the tool's vocabulary is not obvious.

## Ways to split a slice

| Split by | First slice | Later slices |
|---|---|---|
| Workflow steps | The shortest path from start to end | Each optional step |
| Happy path and edge cases | The happy path | Each error or boundary that matters |
| Business rules | The most common rule | Each variation |
| Data variations | One type, format or currency | The rest |
| Interfaces | One channel or entry method | Other channels, bulk import |
| Operations | Create and read | Update, delete, manage |
| Major effort | The option that carries most of the cost | Its cheap siblings |
| Quality attributes | Correct | Fast, polished, scalable, once measured |
| Spike (last resort) | A timeboxed question that ends in a decision | The slices it unblocks |

## Ways to loosen a dependency

| Dependency | How to loosen it |
|---|---|
| The consumer waits for the producer | Agree the contract first (signature, payload, schema) as the smallest slice. Both sides build against it, the consumer with a fake. |
| Unfinished work cannot be merged | A feature flag. Deploying is not releasing. |
| A breaking change in a schema or an API | Expand, migrate, contract: add the new shape, move the consumers, remove the old one. |
| A large replacement blocks everyone | Branch by abstraction or a strangler: the new grows beside the old behind one seam. |
| Two slices touch the same files | Sequence them, or extract the shared change as an earlier slice. |
| A decision or another team | Ask today. Meanwhile build behind a port with the assumed answer and write the assumption in the ticket. |
| An unknown | A timeboxed spike. |

## Concepts in the team's tool

| Concept | Use whatever the tool calls |
|---|---|
| Bet | Project, epic, milestone, parent issue or page |
| Slice | Issue, story, task, card or checklist line |
| Hard dependency | The native "blocked by" relation, or a `Blocked by:` line |
| Wave | The order of the list, or a label. Never a new workflow state |
| Horizon | Board columns, a grouped view, or three headings in `ROADMAP.md` |
| Signal | A link to the dashboard or the query |

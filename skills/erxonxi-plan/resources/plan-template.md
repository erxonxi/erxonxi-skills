# Plan file template

The plan is the state of the work. Its checkboxes say what is done, so any agent can resume it: **the current phase is the first one with an unchecked task**.

```markdown
---
title: <short task title>
status: approved            # approved → in-progress (first phase started) → done
created: <YYYY-MM-DDTHH:MM:SSZ>
updated: <YYYY-MM-DDTHH:MM:SSZ>
provenance:                 # only if the project records it
  created_by: <tool> · <model and version>
  implemented_by: []        # one line per phase: "<phase> · <tool> · <model>"
---

# <Title>

## Goal

<1 to 3 sentences>

## Context

- [`<path>`](<path>): <what to copy from it>
- [`docs/<convention>.md`](docs/<convention>.md): <why it applies>

## Decisions

- <decision>. Discarded: <alternative>, because <reason>.
- Risk: <what could hurt>. Handled: <phase N | accepted | out of scope>.
- Out of scope: <list>.

## Phases

### Phase 1: <what the user can do when it ends>

Contracts:

- `ProductStockNotifier.notify(productId: string): void`
- Event `acme.catalog.product.restocked` { quantity } (aggregate id: the product id)
- `ProductStockNotifier should`: notify every shopper who asked · not notify twice the same shopper
- Copy: "We will email you when it is back"

Tasks:

- [ ] <task>, copying `<existing file or class>`
- [ ] Run the verification command and fix what fails
- [ ] Evaluate and stop: `erxonxi-evaluate`, commit messages, wait for the user

Done when: <observable check>

### Phase 2: <...>

...

### Phase 3: <...>

Wave 1, with Phase 4. Blocked by: Phase 2.

...

## Next step

Phase 1: <name>.
```

A phase gets a `Wave` line only when the plan has phases that can run at the same time, and a `Blocked by` line only for a hard dependency. A plan whose phases run one after another has neither.

## Updating it

- When a task is done, check it in the same change.
- When a phase ends, set `updated`, add the `implemented_by` line if the project records provenance, and rewrite **Next step**.
- When every task is checked, set `status: done`.
- If implementing reveals that a contract or a phase must change, do not edit it silently: propose the change to the user, and record it under **Decisions** once accepted.

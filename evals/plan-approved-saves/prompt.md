---
name: plan-approved-saves
tags: [procedure, plan, goal-5]
runs: 2
max_turns: 10
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit]
---
Earlier you proposed this plan and I approve it as it is. Store it in the repository the way you store approved plans, then tell me the next step. Do not implement anything yet.

---
Task: wishlist for shoppers.
Goal: a shopper can save products to a wishlist and see it.
Decisions: wishlist is a module inside `shop`, keyed by shopper id; products referenced by id with name and price copied at save time; discarded: a join with the catalog table at read time (couples contexts).
Phase 1 — a shopper can add a product to the wishlist. Contracts: `WishlistItemAdder.add(shopperId, productId, productName, priceCents)`, event `WishlistItemAdded {shopperId, productId}`, endpoint `PUT /wishlists/:shopperId/items/:productId`. Tests: "add a product to an empty wishlist", "ignore a product that is already in the wishlist". Done when `npm run check` is green.
Phase 2 — a shopper can see the wishlist. Contracts: `WishlistSearcher.search(shopperId)` returning `{items: [{productId, productName, priceCents}]}`, endpoint `GET /wishlists/:shopperId`. Tests: "return the items in insertion order", "return an empty list for a new shopper". Done when `npm run check` is green.
---

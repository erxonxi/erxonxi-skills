# RFC 0007: Order notes

Accepted 2026-10-30.

## Problem

Support cannot leave a note on an order when a shopper calls, so the next person on the phone starts from zero.

## Proposal

An order note is free text attached to an order, written by support and never shown to the shopper. Notes live in `shop/orders`, as part of the order history.

## Steps

1. Support can add a note to an order. Check: `PUT /orders/:id/notes/:noteId` returns 201 and the note is stored.
2. Support can read the notes of an order, newest first. Check: the acceptance test reads two notes back in order.

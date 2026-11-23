# RFC 0006: Gift cards

Accepted 2026-10-02.

## Problem

Shoppers ask to buy credit for someone else. Today the only way is to share a cart, which exposes the buyer's address.

## Proposal

A gift card is a code with a balance, sold as a product. At checkout the shopper can enter a code and the order total is reduced by the balance that is left. Gift cards live in `shop`, next to orders, because they only exist to pay for orders.

## Steps

1. A shopper can buy a gift card and receives the code by email. Check: the acceptance test buys one and finds the code in the sent email.
2. A shopper can pay part of an order with a code. Check: the order total drops by the balance and the card balance is reduced.

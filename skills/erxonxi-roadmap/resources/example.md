# Example: a bet framed, cut and ordered in waves

A worked example of steps 1 to 5 of `erxonxi-roadmap` on a neutral online shop.

```
Bet         Restock alerts                                        Appetite: 2 weeks
Hypothesis  We believe that letting shoppers ask for an alert on out-of-stock products
            will recover lost sales. We will know when 15% of the alert emails end in
            an order within 7 days, measured over the first 4 weeks.
Decision    Under 5%: remove it. Between 5% and 15%: one round on the email, then decide.
Riskiest    Shoppers will not leave their email. Tested first with a fake door:
            the button alone for 3 days, counting clicks.
Non-goals   SMS and push, product variants, alert preferences.

Wave 0  A  A shopper asks for an alert on an out-of-stock product.
           Fixes the contract: `POST /restock-alerts` and the
           `acme.catalog.restock_alert.requested` event. Behind the flag `restock_alerts`.
           Signal: requests per day, by product.
Wave 1  B  A shopper who asked gets one email when the product is back.    Blocked by A
           Signal: emails sent, clicks, orders attributed to the link.
        C  The product page remembers that the shopper already asked.      Blocked by A
Wave 2  D  A shopper gets a single email when stock flaps within a day.    Blocked by B
Later   SMS · product variants · alert preferences
```

B and C run in parallel: one lives in notifications, the other in the product page, and both build against the contract that A fixed.

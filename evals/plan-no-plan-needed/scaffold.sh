#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
# A typo in the confirmation email subject, and the test that asserts the subject as it is today.
sed -i 's|`Order ${orderId} confirmed`|`Yuor order ${orderId} confirmed`|' \
  src/contexts/notifications/order-confirmations/application/send/OrderConfirmationEmailSender.js
sed -i 's|^\(\s*\)assert.match(emailSender.sent\[0\].subject, new RegExp(orderId));$|&\n\1assert.equal(emailSender.sent[0].subject, `Yuor order ${orderId} confirmed`);|' \
  tests/contexts/notifications/order-confirmations/application/send/OrderConfirmationEmailSender.test.js
grep -q 'Yuor order' src/contexts/notifications/order-confirmations/application/send/OrderConfirmationEmailSender.js
grep -q 'Yuor order' tests/contexts/notifications/order-confirmations/application/send/OrderConfirmationEmailSender.test.js
acme::commit_baseline

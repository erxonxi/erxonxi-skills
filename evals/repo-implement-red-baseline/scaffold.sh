#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/../fixtures/acme.sh"
acme::copy_shop
acme::add_plan
# A pre-existing failure unrelated to the plan: the cart item remover stops saving the cart, so
# "CartItemRemover should remove an item from the cart" fails before any work on the phase starts.
f=src/contexts/shop/carts/application/remove-item/CartItemRemover.js
sed -i '/await this.repository.save(cart);/d' "$f"
if grep -q 'repository.save' "$f"; then echo "scaffold: the break did not apply" >&2; exit 1; fi
acme::commit_baseline

// Shared, pure cart pricing. Uses the server-side price map as the source of
// truth so client-sent prices can never be trusted.
import { PRODUCT_PRICES } from './razorpay-prices';

export type CartItem = { id: string; qty: number };
export type PricedItem = { id: string; qty: number; unit: number; subtotal: number };

export function priceCart(items: CartItem[]): {
  priced: PricedItem[];
  unpriced: string[];
  subtotal: number;
} {
  const priced: PricedItem[] = [];
  const unpriced: string[] = [];
  for (const it of items) {
    const unit = PRODUCT_PRICES[it.id];
    if (typeof unit !== 'number') {
      unpriced.push(it.id);
      continue;
    }
    priced.push({ id: it.id, qty: it.qty, unit, subtotal: unit * it.qty });
  }
  const subtotal = priced.reduce((sum, p) => sum + p.subtotal, 0);
  return { priced, unpriced, subtotal };
}

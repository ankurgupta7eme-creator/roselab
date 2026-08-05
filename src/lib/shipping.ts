// Standardized shipping rule (paise / INR) — single source of truth.
// Flat ₹60 shipping, waived when the cart subtotal reaches ₹999.
export const SHIPPING_FLAT_PAISE = 6000; // ₹60
export const FREE_SHIPPING_THRESHOLD_PAISE = 99900; // ₹999

// Shipping is based on the merchandise subtotal (before any discount).
export function computeShippingPaise(subtotalPaise: number): number {
  if (subtotalPaise <= 0) return 0;
  return subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : SHIPPING_FLAT_PAISE;
}

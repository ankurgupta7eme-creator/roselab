import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { priceCart } from '@/lib/cart-pricing';
import { computeShippingPaise } from '@/lib/shipping';
import { evaluateDiscount } from '@/lib/discounts.server';

// Public endpoint the checkout uses to preview the authoritative order total
// (subtotal + shipping - discount). Read-only: it does not consume the code.
const jsonHeaders = { 'Content-Type': 'application/json' };

const bodySchema = z.object({
  items: z
    .array(z.object({ id: z.string().min(1).max(120), qty: z.number().int().min(1).max(99) }))
    .min(1)
    .max(50),
  code: z.string().max(40).optional(),
});

export const Route = createFileRoute('/api/public/discounts/validate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: jsonHeaders,
          });
        }
        const parsed = bodySchema.safeParse(raw);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: 'Validation failed' }), {
            status: 400,
            headers: jsonHeaders,
          });
        }

        const { subtotal } = priceCart(parsed.data.items);
        const shipping = computeShippingPaise(subtotal);

        let discount = 0;
        let discountValid = false;
        let discountMessage: string | null = null;
        let appliedCode: string | null = null;

        if (parsed.data.code && parsed.data.code.trim()) {
          const res = await evaluateDiscount(parsed.data.code, subtotal);
          if (res.valid) {
            discount = res.discountPaise;
            discountValid = true;
            appliedCode = res.code;
          } else {
            discountMessage = res.reason;
          }
        }

        const total = Math.max(0, subtotal - discount + shipping);

        return new Response(
          JSON.stringify({
            subtotal,
            shipping,
            discount,
            total,
            discountValid,
            discountMessage,
            appliedCode,
          }),
          { status: 200, headers: jsonHeaders },
        );
      },
    },
  },
});

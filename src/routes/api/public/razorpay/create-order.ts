import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { priceCart } from '@/lib/cart-pricing'
import { computeShippingPaise } from '@/lib/shipping'
import { evaluateDiscount } from '@/lib/discounts.server'
import { getOptionalUserId } from '@/lib/get-user.server'

// Public endpoint that creates a Razorpay order for the current cart.
// SECURITY: the amount is computed server-side from PRODUCT_PRICES — the
// client-sent prices (if any) are ignored, so the total cannot be tampered
// with from the browser. Discount and shipping are also computed server-side.

const jsonHeaders = { 'Content-Type': 'application/json' }

const trimmed = (max: number) =>
  z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(max))

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1).max(120),
        qty: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(50),
  code: z.string().max(40).optional(),
  customer: z
    .object({
      name: trimmed(200).optional(),
      email: z
        .string()
        .transform((v) => v.trim())
        .pipe(z.string().email().max(255))
        .optional(),
      phone: trimmed(60).optional(),
      address: trimmed(600).optional(),
      city: trimmed(120).optional(),
      state: trimmed(120).optional(),
      pincode: trimmed(20).optional(),
    })
    .optional(),
})

function makeOrderCode() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `RL-${stamp}-${rand}`
}

export const Route = createFileRoute('/api/public/razorpay/create-order')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const keyId = process.env.RAZORPAY_KEY_ID
        const keySecret = process.env.RAZORPAY_KEY_SECRET
        if (!keyId || !keySecret) {
          console.error('[razorpay] missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET')
          return new Response(
            JSON.stringify({ error: 'Online payments are not configured yet.' }),
            { status: 503, headers: jsonHeaders },
          )
        }

        let raw: unknown
        try {
          raw = await request.json()
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: jsonHeaders,
          })
        }

        const parsed = bodySchema.safeParse(raw)
        if (!parsed.success) {
          return new Response(
            JSON.stringify({
              error: 'Validation failed',
              details: parsed.error.flatten().fieldErrors,
            }),
            { status: 400, headers: jsonHeaders },
          )
        }

        const { items, customer, code } = parsed.data
        const userId = await getOptionalUserId(request)

        // Compute the authoritative subtotal from the server price map.
        const { priced, unpriced, subtotal } = priceCart(items)

        if (unpriced.length > 0) {
          return new Response(
            JSON.stringify({
              error:
                'Some items are quote-only and cannot be paid for online. Please remove them or send an enquiry.',
              unpriced,
            }),
            { status: 409, headers: jsonHeaders },
          )
        }

        if (subtotal < 100) {
          return new Response(
            JSON.stringify({ error: 'Order total is below the minimum payable amount.' }),
            { status: 400, headers: jsonHeaders },
          )
        }

        // Discount (server-validated) and standardized shipping.
        let discountAmount = 0
        let discountCode: string | null = null
        if (code && code.trim()) {
          const res = await evaluateDiscount(code, subtotal)
          if (res.valid) {
            discountAmount = res.discountPaise
            discountCode = res.code
          }
          // Invalid codes are silently ignored here; the checkout UI validates
          // and shows the reason before the customer reaches payment.
        }

        const shippingAmount = computeShippingPaise(subtotal)
        const amount = Math.max(100, subtotal - discountAmount + shippingAmount)

        const orderCode = makeOrderCode()

        // Create the order at Razorpay.
        let razorpayOrderId: string
        try {
          const auth =
            typeof btoa === 'function'
              ? btoa(`${keyId}:${keySecret}`)
              : Buffer.from(`${keyId}:${keySecret}`).toString('base64')

          const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
              Authorization: `Basic ${auth}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount,
              currency: 'INR',
              receipt: orderCode,
              notes: { order_code: orderCode },
            }),
          })

          if (!rzpRes.ok) {
            const errBody = await rzpRes.text()
            console.error(`[razorpay] create order failed [${rzpRes.status}]: ${errBody}`)
            return new Response(
              JSON.stringify({ error: 'Could not start the payment. Please try again.' }),
              { status: 502, headers: jsonHeaders },
            )
          }

          const rzpOrder = (await rzpRes.json()) as { id: string }
          razorpayOrderId = rzpOrder.id
        } catch (err) {
          console.error('[razorpay] create order error:', err)
          return new Response(
            JSON.stringify({ error: 'Could not start the payment. Please try again.' }),
            { status: 502, headers: jsonHeaders },
          )
        }

        // Persist a pending order row with the full money breakdown.
        try {
          const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
          const { error } = await supabaseAdmin.from('orders').insert({
            order_code: orderCode,
            razorpay_order_id: razorpayOrderId,
            amount,
            subtotal,
            discount_code: discountCode,
            discount_amount: discountAmount,
            shipping_amount: shippingAmount,
            currency: 'INR',
            items: priced,
            customer: (customer ?? {}) as Record<string, string>,
            status: 'created',
            user_id: userId,
          })
          if (error) {
            console.error('[razorpay] order insert failed:', error.message)
          }
        } catch (err) {
          console.error('[razorpay] order insert error:', err)
        }

        return new Response(
          JSON.stringify({
            keyId,
            razorpayOrderId,
            amount,
            subtotal,
            discountCode,
            discountAmount,
            shippingAmount,
            currency: 'INR',
            orderCode,
          }),
          { status: 201, headers: jsonHeaders },
        )
      },
    },
  },
})

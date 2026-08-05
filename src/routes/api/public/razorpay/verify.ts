import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { createHmac, timingSafeEqual } from 'crypto'
import { consumeDiscount } from '@/lib/discounts.server'
import { notifyNewOrder } from '@/lib/order-email.server'

// Public endpoint that verifies a Razorpay payment signature after checkout.
// SECURITY: the signature is verified with RAZORPAY_KEY_SECRET server-side.
// Only a valid signature marks the order as paid.

const jsonHeaders = { 'Content-Type': 'application/json' }

const trimmed = (max: number) =>
  z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(max))

const bodySchema = z.object({
  razorpay_order_id: z.string().min(1).max(120),
  razorpay_payment_id: z.string().min(1).max(120),
  razorpay_signature: z.string().min(1).max(256),
  orderCode: z.string().min(1).max(60).optional(),
  customer: z
    .object({
      name: trimmed(200).optional(),
      email: trimmed(255).optional(),
      phone: trimmed(60).optional(),
      address: trimmed(600).optional(),
      city: trimmed(120).optional(),
      state: trimmed(120).optional(),
      pincode: trimmed(20).optional(),
    })
    .optional(),
})

export const Route = createFileRoute('/api/public/razorpay/verify')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const keySecret = process.env.RAZORPAY_KEY_SECRET
        if (!keySecret) {
          console.error('[razorpay] missing RAZORPAY_KEY_SECRET')
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
          return new Response(JSON.stringify({ error: 'Validation failed' }), {
            status: 400,
            headers: jsonHeaders,
          })
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer } =
          parsed.data

        const expected = createHmac('sha256', keySecret)
          .update(`${razorpay_order_id}|${razorpay_payment_id}`)
          .digest('hex')

        const a = Buffer.from(expected)
        const b = Buffer.from(razorpay_signature)
        const valid = a.length === b.length && timingSafeEqual(a, b)

        if (!valid) {
          console.error('[razorpay] signature mismatch for order', razorpay_order_id)
          try {
            const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
            await supabaseAdmin
              .from('orders')
              .update({ status: 'failed' })
              .eq('razorpay_order_id', razorpay_order_id)
          } catch {
            /* ignore */
          }
          return new Response(JSON.stringify({ error: 'Payment verification failed.' }), {
            status: 400,
            headers: jsonHeaders,
          })
        }

        let orderCode: string | undefined
        let paidOrder:
          | Record<string, unknown>
          | null = null
        try {
          const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
          const update: {
            razorpay_payment_id: string
            status: string
            updated_at: string
            customer?: Record<string, string>
          } = {
            razorpay_payment_id,
            status: 'paid',
            updated_at: new Date().toISOString(),
          }
          if (customer && Object.keys(customer).length > 0) {
            update.customer = customer as Record<string, string>
          }
          const { data, error } = await supabaseAdmin
            .from('orders')
            .update(update)
            .eq('razorpay_order_id', razorpay_order_id)
            .select()
            .maybeSingle()
          if (error) {
            console.error('[razorpay] order paid-update failed:', error.message)
          } else if (data) {
            orderCode = (data as { order_code?: string }).order_code
            paidOrder = data as Record<string, unknown>
          }
        } catch (err) {
          console.error('[razorpay] order paid-update error:', err)
        }

        // Best-effort post-payment side effects — never block the response.
        if (paidOrder) {
          const dc = paidOrder.discount_code
          if (typeof dc === 'string' && dc) {
            try {
              await consumeDiscount(dc)
            } catch (err) {
              console.error('[razorpay] discount consume error:', err)
            }
          }
          try {
            await notifyNewOrder(paidOrder)
          } catch (err) {
            console.error('[razorpay] order notification error:', err)
          }
        }

        return new Response(JSON.stringify({ ok: true, orderCode }), {
          status: 200,
          headers: jsonHeaders,
        })
      },
    },
  },
})

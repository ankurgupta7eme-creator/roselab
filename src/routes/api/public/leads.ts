import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

// Public lead-capture endpoint for the Contact and Partner (B2B) forms.
// This route bypasses auth (it is under /api/public), so it validates every
// submission and inserts server-side with the service-role client.

const jsonHeaders = { 'Content-Type': 'application/json' }

// Accept the loose field names the static HTML forms send, then normalize.
const trimmedString = (max: number) =>
  z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(max))

const leadSchema = z
  .object({
    source: z.enum(['contact', 'b2b']).optional(),

    // Contact form field names
    name: trimmedString(200).optional(),
    org: trimmedString(200).optional(),
    topic: trimmedString(200).optional(),

    // B2B form field names
    companyName: trimmedString(200).optional(),
    ownerName: trimmedString(200).optional(),
    contact: trimmedString(60).optional(),
    state: trimmedString(120).optional(),
    notes: trimmedString(5000).optional(),

    // Shared / generic field names
    company: trimmedString(200).optional(),
    subject: trimmedString(200).optional(),
    email: z
      .string()
      .transform((v) => v.trim())
      .pipe(z.string().email().max(255)),
    phone: trimmedString(60).optional(),
    message: trimmedString(5000).optional(),
  })
  .passthrough()

export const Route = createFileRoute('/api/public/leads')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown
        try {
          raw = await request.json()
        } catch {
          return new Response(
            JSON.stringify({ error: 'Invalid JSON body' }),
            { status: 400, headers: jsonHeaders },
          )
        }

        const parsed = leadSchema.safeParse(raw)
        if (!parsed.success) {
          return new Response(
            JSON.stringify({
              error: 'Validation failed',
              details: parsed.error.flatten().fieldErrors,
            }),
            { status: 400, headers: jsonHeaders },
          )
        }

        const d = parsed.data
        const source = d.source ?? (d.companyName || d.ownerName ? 'b2b' : 'contact')

        const name = (d.name || d.ownerName || d.contact || '').trim()
        const company = (d.company || d.org || d.companyName || '').trim()
        const phone = (d.phone || d.contact || '').trim()
        const subject = (d.subject || d.topic || '').trim()
        const message = (d.message || d.notes || '').trim()

        if (!name) {
          return new Response(
            JSON.stringify({ error: 'A name is required' }),
            { status: 400, headers: jsonHeaders },
          )
        }

        // Keep the full raw payload (safe, size-bounded) for reference.
        const metadata = {
          topic: d.topic || null,
          state: d.state || null,
          submitted_at: new Date().toISOString(),
          user_agent: request.headers.get('user-agent')?.slice(0, 300) ?? null,
        }

        try {
          const { supabaseAdmin } = await import(
            '@/integrations/supabase/client.server'
          )

          const { error } = await supabaseAdmin.from('leads').insert({
            source,
            name,
            email: d.email,
            phone: phone || null,
            company: company || null,
            subject: subject || null,
            message: message || null,
            metadata: metadata as Record<string, string | null>,
          })

          if (error) {
            console.error('[leads] insert failed:', error.message)
            return new Response(
              JSON.stringify({ error: 'Could not save your enquiry' }),
              { status: 500, headers: jsonHeaders },
            )
          }
        } catch (err) {
          console.error('[leads] unexpected error:', err)
          return new Response(
            JSON.stringify({ error: 'Could not save your enquiry' }),
            { status: 500, headers: jsonHeaders },
          )
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 201,
          headers: jsonHeaders,
        })
      },
    },
  },
})

import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin-auth.server';

const jsonHeaders = { 'Content-Type': 'application/json' };

const codeField = z
  .string()
  .transform((v) => v.trim().toUpperCase())
  .pipe(z.string().min(2).max(40).regex(/^[A-Z0-9_-]+$/, 'Use letters, numbers, - or _ only'));

// value is a whole percent for "percentage", or paise for "fixed".
const createSchema = z
  .object({
    code: codeField,
    type: z.enum(['percentage', 'fixed']),
    value: z.number().int().min(1),
    min_order_amount: z.number().int().min(0).default(0),
    max_discount_amount: z.number().int().min(0).nullable().optional(),
    usage_limit: z.number().int().min(1).nullable().optional(),
    active: z.boolean().default(true),
    starts_at: z.string().datetime().nullable().optional(),
    expires_at: z.string().datetime().nullable().optional(),
  })
  .refine((d) => (d.type === 'percentage' ? d.value <= 100 : true), {
    message: 'Percentage cannot exceed 100',
    path: ['value'],
  });

const updateSchema = z.object({
  id: z.string().uuid(),
  code: codeField.optional(),
  type: z.enum(['percentage', 'fixed']).optional(),
  value: z.number().int().min(1).optional(),
  min_order_amount: z.number().int().min(0).optional(),
  max_discount_amount: z.number().int().min(0).nullable().optional(),
  usage_limit: z.number().int().min(1).nullable().optional(),
  active: z.boolean().optional(),
  starts_at: z.string().datetime().nullable().optional(),
  expires_at: z.string().datetime().nullable().optional(),
});

const deleteSchema = z.object({ id: z.string().uuid() });

async function body(request: Request) {
  try {
    return { ok: true as const, data: await request.json() };
  } catch {
    return { ok: false as const };
  }
}

export const Route = createFileRoute('/api/public/admin/discounts')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const auth = await requireAdmin(request);
        if (auth instanceof Response) return auth;
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const { data, error } = await supabaseAdmin
          .from('discount_codes')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          console.error('[admin/discounts] list failed:', error.message);
          return new Response(JSON.stringify({ error: 'Could not load codes.' }), {
            status: 500,
            headers: jsonHeaders,
          });
        }
        return new Response(JSON.stringify({ codes: data ?? [] }), {
          status: 200,
          headers: jsonHeaders,
        });
      },

      POST: async ({ request }) => {
        const auth = await requireAdmin(request);
        if (auth instanceof Response) return auth;
        const b = await body(request);
        if (!b.ok)
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: jsonHeaders,
          });
        const parsed = createSchema.safeParse(b.data);
        if (!parsed.success)
          return new Response(
            JSON.stringify({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }),
            { status: 400, headers: jsonHeaders },
          );

        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const { data, error } = await supabaseAdmin
          .from('discount_codes')
          .insert(parsed.data)
          .select()
          .maybeSingle();
        if (error) {
          const msg = error.message.includes('duplicate')
            ? 'A code with that name already exists.'
            : 'Could not create the code.';
          return new Response(JSON.stringify({ error: msg }), {
            status: 409,
            headers: jsonHeaders,
          });
        }
        return new Response(JSON.stringify({ code: data }), {
          status: 201,
          headers: jsonHeaders,
        });
      },

      PATCH: async ({ request }) => {
        const auth = await requireAdmin(request);
        if (auth instanceof Response) return auth;
        const b = await body(request);
        if (!b.ok)
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: jsonHeaders,
          });
        const parsed = updateSchema.safeParse(b.data);
        if (!parsed.success)
          return new Response(
            JSON.stringify({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }),
            { status: 400, headers: jsonHeaders },
          );

        const { id, ...fields } = parsed.data;
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const { data, error } = await supabaseAdmin
          .from('discount_codes')
          .update(fields)
          .eq('id', id)
          .select()
          .maybeSingle();
        if (error) {
          console.error('[admin/discounts] update failed:', error.message);
          return new Response(JSON.stringify({ error: 'Could not update the code.' }), {
            status: 500,
            headers: jsonHeaders,
          });
        }
        return new Response(JSON.stringify({ code: data }), {
          status: 200,
          headers: jsonHeaders,
        });
      },

      DELETE: async ({ request }) => {
        const auth = await requireAdmin(request);
        if (auth instanceof Response) return auth;
        const b = await body(request);
        if (!b.ok)
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: jsonHeaders,
          });
        const parsed = deleteSchema.safeParse(b.data);
        if (!parsed.success)
          return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 400,
            headers: jsonHeaders,
          });
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const { error } = await supabaseAdmin
          .from('discount_codes')
          .delete()
          .eq('id', parsed.data.id);
        if (error) {
          console.error('[admin/discounts] delete failed:', error.message);
          return new Response(JSON.stringify({ error: 'Could not delete the code.' }), {
            status: 500,
            headers: jsonHeaders,
          });
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: jsonHeaders,
        });
      },
    },
  },
});

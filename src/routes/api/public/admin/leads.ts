import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin-auth.server';

const jsonHeaders = { 'Content-Type': 'application/json' };

export const LEAD_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'converted',
  'lost',
] as const;

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(LEAD_STATUSES),
});

export const Route = createFileRoute('/api/public/admin/leads')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const auth = await requireAdmin(request);
        if (auth instanceof Response) return auth;

        const url = new URL(request.url);
        const status = url.searchParams.get('status');
        const source = url.searchParams.get('source');
        const q = (url.searchParams.get('q') || '').trim();

        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        let query = supabaseAdmin
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500);
        if (status && (LEAD_STATUSES as readonly string[]).includes(status)) {
          query = query.eq('status', status);
        }
        if (source) query = query.eq('source', source);
        if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%`);

        const { data, error } = await query;
        if (error) {
          console.error('[admin/leads] list failed:', error.message);
          return new Response(JSON.stringify({ error: 'Could not load leads.' }), {
            status: 500,
            headers: jsonHeaders,
          });
        }
        return new Response(JSON.stringify({ leads: data ?? [] }), {
          status: 200,
          headers: jsonHeaders,
        });
      },

      PATCH: async ({ request }) => {
        const auth = await requireAdmin(request);
        if (auth instanceof Response) return auth;
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: jsonHeaders,
          });
        }
        const parsed = patchSchema.safeParse(raw);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 400,
            headers: jsonHeaders,
          });
        }
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const { data, error } = await supabaseAdmin
          .from('leads')
          .update({ status: parsed.data.status })
          .eq('id', parsed.data.id)
          .select()
          .maybeSingle();
        if (error) {
          console.error('[admin/leads] update failed:', error.message);
          return new Response(JSON.stringify({ error: 'Could not update the lead.' }), {
            status: 500,
            headers: jsonHeaders,
          });
        }
        return new Response(JSON.stringify({ lead: data }), {
          status: 200,
          headers: jsonHeaders,
        });
      },
    },
  },
});

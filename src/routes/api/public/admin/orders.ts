import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { requireAdmin, logAdminAction } from '@/lib/admin-auth.server';
import type { Database } from '@/integrations/supabase/types';

type OrderUpdate = Database['public']['Tables']['orders']['Update'];

const jsonHeaders = { 'Content-Type': 'application/json' };

// Order lifecycle statuses the admin can move an order through.
export const ORDER_STATUSES = [
  'created',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
  'failed',
] as const;

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(ORDER_STATUSES).optional(),
  courier_name: z.string().max(100).optional(),
  tracking_number: z.string().max(100).optional(),
  tracking_url: z.string().url().max(500).optional().or(z.literal('')),
});

export const Route = createFileRoute('/api/public/admin/orders')({
  server: {
    handlers: {
      // List orders (newest first) with optional status filter and text search.
      GET: async ({ request }) => {
        const auth = await requireAdmin(request);
        if (auth instanceof Response) return auth;

        const url = new URL(request.url);
        const status = url.searchParams.get('status');
        const q = (url.searchParams.get('q') || '').trim();

        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        let query = supabaseAdmin
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500);

        if (status && (ORDER_STATUSES as readonly string[]).includes(status)) {
          query = query.eq('status', status);
        }
        if (q) {
          query = query.ilike('order_code', `%${q}%`);
        }

        const { data, error } = await query;
        if (error) {
          console.error('[admin/orders] list failed:', error.message);
          return new Response(JSON.stringify({ error: 'Could not load orders.' }), {
            status: 500,
            headers: jsonHeaders,
          });
        }
        return new Response(JSON.stringify({ orders: data ?? [] }), {
          status: 200,
          headers: jsonHeaders,
        });
      },

      // Update an order's status.
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
        const updates: OrderUpdate = { updated_at: new Date().toISOString() };
        if (parsed.data.status !== undefined) updates.status = parsed.data.status;
        if (parsed.data.courier_name !== undefined) updates.courier_name = parsed.data.courier_name;
        if (parsed.data.tracking_number !== undefined) updates.tracking_number = parsed.data.tracking_number;
        if (parsed.data.tracking_url !== undefined) updates.tracking_url = parsed.data.tracking_url;

        const { data, error } = await supabaseAdmin
          .from('orders')
          .update(updates)
          .eq('id', parsed.data.id)
          .select()
          .maybeSingle();

        if (error) {
          console.error('[admin/orders] update failed:', error.message);
          return new Response(JSON.stringify({ error: 'Could not update the order.' }), {
            status: 500,
            headers: jsonHeaders,
          });
        }

        void logAdminAction(auth.userId, auth.email, 'order.update', { orderId: parsed.data.id, updates });
        return new Response(JSON.stringify({ order: data }), {
          status: 200,
          headers: jsonHeaders,
        });
      },
    },
  },
});

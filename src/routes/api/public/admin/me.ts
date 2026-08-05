import { createFileRoute } from '@tanstack/react-router';
import { requireAdmin } from '@/lib/admin-auth.server';

// Lightweight check the admin panel calls to confirm the signed-in user is an
// admin before showing the dashboard.
export const Route = createFileRoute('/api/public/admin/me')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const auth = await requireAdmin(request);
        if (auth instanceof Response) return auth;
        return new Response(JSON.stringify({ ok: true, email: auth.email }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});

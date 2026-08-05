// Server-only admin authorization for the /api/public/admin/* routes.
// Verifies the caller's Supabase bearer token and confirms the admin role.
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

const jsonHeaders = { 'Content-Type': 'application/json' };

export type AdminOk = { ok: true; userId: string; email: string | null };

function deny(status: number, error: string): Response {
  return new Response(JSON.stringify({ error }), { status, headers: jsonHeaders });
}

export async function requireAdmin(request: Request): Promise<AdminOk | Response> {
  const authz =
    request.headers.get('authorization') || request.headers.get('Authorization') || '';
  const token = authz.replace(/^Bearer\s+/i, '').trim();
  if (!token) return deny(401, 'Not authenticated.');

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return deny(500, 'Server auth is not configured.');

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return deny(401, 'Your session is invalid or expired.');

  const { data: role } = await supabaseAdmin
    .from('user_roles')
    .select('role')
    .eq('user_id', data.user.id)
    .eq('role', 'admin')
    .maybeSingle();

  if (!role) return deny(403, 'You do not have admin access.');

  void logAdminLogin(request, data.user.id, data.user.email ?? null);

  return { ok: true, userId: data.user.id, email: data.user.email ?? null };
}

export async function logAdminLogin(request: Request, userId: string, email: string | null): Promise<void> {
  try {
    await supabaseAdmin.from('admin_login_history').insert({
      user_id: userId,
      email,
      ip_address: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for'),
      user_agent: request.headers.get('user-agent'),
    });
  } catch (err) {
    console.error('[admin-auth] failed to log login history:', err);
  }
}

export async function logAdminAction(
  userId: string,
  email: string | null,
  action: string,
  details: Record<string, unknown> = {},
): Promise<void> {
  try {
    await supabaseAdmin.from('admin_audit_log').insert({ user_id: userId, email, action, details: details as never });
  } catch (err) {
    console.error('[admin-auth] failed to log audit action:', err);
  }
}

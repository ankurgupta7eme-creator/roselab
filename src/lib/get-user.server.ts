// Server-only helper: best-effort resolve the caller's Supabase user id
// from a Bearer token, without rejecting the request if it's missing or
// invalid. Used to optionally attach orders to a logged-in customer.
import { createClient } from '@supabase/supabase-js';

export async function getOptionalUserId(request: Request): Promise<string | null> {
  const authz =
    request.headers.get('authorization') || request.headers.get('Authorization') || '';
  const token = authz.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user.id;
}

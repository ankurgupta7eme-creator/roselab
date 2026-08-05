-- Admin login history and action audit log. Both are service-role-only
-- (written by server routes, never directly by the client), and readable
-- only by admins.

CREATE TABLE public.admin_login_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_login_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view login history"
  ON public.admin_login_history FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

GRANT ALL ON public.admin_login_history TO service_role;

CREATE TABLE public.admin_audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  action text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit log"
  ON public.admin_audit_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

GRANT ALL ON public.admin_audit_log TO service_role;

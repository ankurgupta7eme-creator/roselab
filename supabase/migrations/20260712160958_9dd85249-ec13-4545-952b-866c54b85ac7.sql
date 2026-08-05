-- Trigger-only functions: no direct caller should execute them.
REVOKE ALL ON FUNCTION public.grant_admin_for_owner_email() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- has_role is used inside RLS policies evaluated as the querying role, so
-- signed-in users must keep EXECUTE, but anonymous users do not.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
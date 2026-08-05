-- Link orders to the logged-in customer who placed them, so the account
-- page can show real order history instead of the old localStorage demo.

ALTER TABLE public.orders ADD COLUMN user_id uuid REFERENCES auth.users(id);

CREATE INDEX orders_user_id_idx ON public.orders (user_id);

-- Customers may read only their own orders. Inserts/updates continue to go
-- through the service-role key from the server (Razorpay routes), which
-- bypasses RLS, so no policy is needed for those.
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

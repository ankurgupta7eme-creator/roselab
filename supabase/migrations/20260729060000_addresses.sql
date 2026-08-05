-- Customer address book (Amazon-style saved addresses) and abandoned-cart
-- tracking, both scoped to the logged-in customer via RLS.

CREATE TABLE public.addresses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label text NOT NULL DEFAULT 'Home',
  recipient_name text NOT NULL,
  phone text NOT NULL,
  line1 text NOT NULL,
  line2 text,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own addresses"
  ON public.addresses FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Lightweight abandoned-cart snapshot: saved when a logged-in customer
-- reaches checkout with items but hasn't completed payment yet.
CREATE TABLE public.abandoned_carts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can upsert their own abandoned cart"
  ON public.abandoned_carts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

GRANT ALL ON public.abandoned_carts TO service_role;

CREATE TRIGGER update_abandoned_carts_updated_at
BEFORE UPDATE ON public.abandoned_carts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

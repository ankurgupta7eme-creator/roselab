CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_code text NOT NULL UNIQUE,
  razorpay_order_id text,
  razorpay_payment_id text,
  amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'INR',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  customer jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'created',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
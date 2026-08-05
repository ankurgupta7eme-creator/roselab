-- Adds shipment tracking fields so admins can record courier + tracking
-- number per order, and customers can see it on their account page.

ALTER TABLE public.orders ADD COLUMN courier_name text;
ALTER TABLE public.orders ADD COLUMN tracking_number text;
ALTER TABLE public.orders ADD COLUMN tracking_url text;

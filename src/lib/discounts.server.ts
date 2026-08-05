// Server-only discount evaluation. Reads/writes discount_codes via the
// service-role client. Never import this from client code.
import { supabaseAdmin } from '@/integrations/supabase/client.server';

export type DiscountRow = {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_order_amount: number;
  max_discount_amount: number | null;
  usage_limit: number | null;
  times_used: number;
  active: boolean;
  starts_at: string | null;
  expires_at: string | null;
};

export type DiscountResult =
  | { valid: true; code: string; discountPaise: number; row: DiscountRow }
  | { valid: false; reason: string };

const inr = (paise: number) => `₹${Math.ceil(paise / 100)}`;

// Evaluate a code against a merchandise subtotal (paise). Read-only — does not
// consume usage. Usage is incremented only after a successful payment.
export async function evaluateDiscount(
  rawCode: string,
  subtotalPaise: number,
): Promise<DiscountResult> {
  const code = (rawCode || '').trim().toUpperCase();
  if (!code) return { valid: false, reason: 'Enter a discount code.' };

  const { data, error } = await supabaseAdmin
    .from('discount_codes')
    .select('*')
    .eq('code', code)
    .maybeSingle();

  if (error || !data) return { valid: false, reason: 'Invalid discount code.' };

  const row = data as DiscountRow;
  const now = Date.now();

  if (!row.active) return { valid: false, reason: 'This code is no longer active.' };
  if (row.starts_at && new Date(row.starts_at).getTime() > now)
    return { valid: false, reason: 'This code is not active yet.' };
  if (row.expires_at && new Date(row.expires_at).getTime() < now)
    return { valid: false, reason: 'This code has expired.' };
  if (row.usage_limit != null && row.times_used >= row.usage_limit)
    return { valid: false, reason: 'This code has reached its usage limit.' };
  if (subtotalPaise < (row.min_order_amount || 0))
    return {
      valid: false,
      reason: `Minimum order of ${inr(row.min_order_amount)} required for this code.`,
    };

  let discount =
    row.type === 'percentage'
      ? Math.round((subtotalPaise * row.value) / 100)
      : row.value;

  if (row.max_discount_amount != null) discount = Math.min(discount, row.max_discount_amount);
  discount = Math.min(discount, subtotalPaise);

  if (discount <= 0)
    return { valid: false, reason: 'This code gives no discount on your cart.' };

  return { valid: true, code, discountPaise: discount, row };
}

// Increment usage after a paid order. Best-effort; failure is logged only.
export async function consumeDiscount(code: string): Promise<void> {
  const c = (code || '').trim().toUpperCase();
  if (!c) return;
  const { data } = await supabaseAdmin
    .from('discount_codes')
    .select('id, times_used')
    .eq('code', c)
    .maybeSingle();
  if (!data) return;
  await supabaseAdmin
    .from('discount_codes')
    .update({ times_used: (data.times_used ?? 0) + 1 })
    .eq('id', data.id);
}

// Post-payment notifications: owner email, customer confirmation email,
// and a WhatsApp alert to the owner's phone. All best-effort — none of
// these should ever block or fail the checkout response.

import { sendEmail } from './resend.server';
import { sendWhatsAppOrderAlert } from './whatsapp.server';
import { sendTelegramOrderAlert } from './telegram.server';

export const OWNER_NOTIFY_EMAIL = 'roselaboratories1983@gmail.com';

const inr = (paise: unknown) =>
  typeof paise === 'number' ? `₹${(paise / 100).toLocaleString('en-IN')}` : '—';

export async function notifyNewOrder(order: Record<string, unknown>): Promise<void> {
  const code = String(order.order_code ?? '');
  const customer = (order.customer ?? {}) as Record<string, string>;
  const items = Array.isArray(order.items) ? (order.items as Array<Record<string, unknown>>) : [];

  const itemLines = items
    .map((i) => `${String(i.name ?? i.id ?? 'item')} × ${Number(i.qty ?? i.quantity ?? 1)}`)
    .join('\n');
  const itemLinesHtml = items
    .map((i) => `<li>${String(i.name ?? i.id ?? 'item')} × ${Number(i.qty ?? i.quantity ?? 1)}</li>`)
    .join('');

  const total = inr(order.amount);

  // ---- WhatsApp + Telegram alerts to the owner ----
  const waMessage =
    `New order ${code}\n` +
    `${customer.name ?? ''} · ${customer.phone ?? ''}\n` +
    `${itemLines}\n` +
    `Total: ${total}\n` +
    `${customer.city ? customer.city + ', ' : ''}${customer.pincode ?? ''}`;
  await Promise.all([
    sendWhatsAppOrderAlert(waMessage),
    sendTelegramOrderAlert(waMessage),
  ]);

  // ---- Owner email ----
  await sendEmail(
    OWNER_NOTIFY_EMAIL,
    `New order ${code} — ${total}`,
    `<h2>New order ${code}</h2>
     <p><b>${customer.name ?? ''}</b><br>${customer.email ?? ''}<br>${customer.phone ?? ''}</p>
     <p>${customer.city ?? ''} ${customer.pincode ?? ''}</p>
     <ul>${itemLinesHtml}</ul>
     <p>Subtotal: ${inr(order.subtotal)}<br>
        Discount: ${inr(order.discount_amount)}<br>
        Shipping: ${inr(order.shipping_amount)}<br>
        <b>Total: ${total}</b></p>
     <p>Payment ID: ${order.razorpay_payment_id ?? '—'}</p>`,
  );

  // ---- Customer confirmation email ----
  if (customer.email) {
    await sendEmail(
      customer.email,
      `Your Rose Laboratories order ${code} is confirmed`,
      `<h2>Thank you, ${customer.name ?? ''}!</h2>
       <p>We've received your order <b>${code}</b> and payment of <b>${total}</b> has been confirmed.</p>
       <ul>${itemLinesHtml}</ul>
       <p>We'll notify you once it ships. You can also check your order status anytime by logging into your account at roselaboratories.com.</p>
       <p>— Rose Laboratories</p>`,
    );
  }
}

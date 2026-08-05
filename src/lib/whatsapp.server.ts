// Sends an order-notification WhatsApp message to the store owner via
// Meta's WhatsApp Cloud API. Requires WHATSAPP_ACCESS_TOKEN and
// WHATSAPP_PHONE_NUMBER_ID env vars (from Meta Business Suite / developer
// console). Never throws — a failure here should never block checkout.

const OWNER_WHATSAPP_NUMBER = '919472277067'; // country code + number, no plus/spaces

export async function sendWhatsAppOrderAlert(message: string): Promise<void> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.log('[whatsapp] not configured yet, skipping send. Message would have been:', message);
    return;
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: OWNER_WHATSAPP_NUMBER,
        type: 'text',
        text: { body: message },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[whatsapp] send failed:', res.status, body);
    }
  } catch (err) {
    console.error('[whatsapp] send error:', err);
  }
}

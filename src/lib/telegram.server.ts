// Sends an order-notification message to the store owner via a Telegram
// bot. Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars.
// Never throws — a failure here should never block checkout.

export async function sendTelegramOrderAlert(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('[telegram] not configured yet, skipping send. Message would have been:', message);
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[telegram] send failed:', res.status, body);
    }
  } catch (err) {
    console.error('[telegram] send error:', err);
  }
}

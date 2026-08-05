// Minimal Resend (https://resend.com) email sender. Requires RESEND_API_KEY.
// Uses plain fetch — no SDK dependency needed for a couple of transactional
// email calls. Never throws — a failure here should never block checkout.

const FROM_ADDRESS = 'Rose Laboratories <orders@roselaboratories.com>';

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[email] RESEND_API_KEY not set, skipping send to', to, 'subject:', subject);
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[email] send failed:', res.status, body);
    }
  } catch (err) {
    console.error('[email] send error:', err);
  }
}

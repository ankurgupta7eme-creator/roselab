// Shared server helper for the Rose Laboratories chat assistants.
// Calls the Lovable AI Gateway (no external key required — uses LOVABLE_API_KEY).
// Used by the public chat endpoints that power the site's floating widgets.
import { z } from 'zod';

const GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions';
const MODEL = 'google/gemini-2.5-flash';

const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(4000),
});

export const chatBodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

const jsonHeaders = { 'Content-Type': 'application/json' };

export function chatError(status: number, error: string): Response {
  return new Response(JSON.stringify({ error }), { status, headers: jsonHeaders });
}

/**
 * Runs a chat completion against the Lovable AI Gateway with the given
 * system persona. Returns a Response with { reply } on success.
 */
export async function runChat(request: Request, systemPrompt: string): Promise<Response> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) {
    console.error('[rose-chat] LOVABLE_API_KEY is not configured');
    return chatError(503, 'The assistant is not configured yet.');
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return chatError(400, 'Invalid request body.');
  }

  const parsed = chatBodySchema.safeParse(raw);
  if (!parsed.success) {
    return chatError(400, 'Invalid message format.');
  }

  // Drop any client-supplied system messages; we set the persona server-side.
  // Keep only the most recent turns to control token usage.
  const turns = parsed.data.messages
    .filter((m) => m.role !== 'system')
    .slice(-24);

  const messages = [{ role: 'system', content: systemPrompt }, ...turns];

  let res: Response;
  try {
    res = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: MODEL, messages, temperature: 0.6, max_tokens: 700 }),
    });
  } catch (e) {
    console.error('[rose-chat] gateway request failed:', e);
    return chatError(502, 'The assistant is temporarily unavailable.');
  }

  if (res.status === 429) {
    return chatError(429, 'The assistant is busy right now — please try again in a moment.');
  }
  if (res.status === 402) {
    return chatError(402, 'The assistant is temporarily unavailable.');
  }
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error(`[rose-chat] gateway error [${res.status}]: ${errText}`);
    return chatError(502, 'The assistant is temporarily unavailable.');
  }

  const data = (await res.json().catch(() => null)) as
    | { choices?: Array<{ message?: { content?: string } }> }
    | null;
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    return chatError(502, 'The assistant did not return a response.');
  }

  return new Response(JSON.stringify({ reply }), { status: 200, headers: jsonHeaders });
}

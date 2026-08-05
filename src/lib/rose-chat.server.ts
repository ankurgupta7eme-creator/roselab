import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

const bodySchema = z.object({
  messages: z.array(messageSchema),
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const jsonHeaders = {
  "Content-Type": "application/json",
};

export async function runChat(
  request: Request,
  systemPrompt: string
): Promise<Response> {

  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "Gemini API key missing",
      }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }

  const raw = await request.json();

  const parsed = bodySchema.safeParse(raw);

  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid request",
      }),
      {
        status: 400,
        headers: jsonHeaders,
      }
    );
  }

  const conversation = [
    {
      role: "user",
      parts: [
        {
          text: systemPrompt,
        },
      ],
    },
  ];

  parsed.data.messages.forEach((m) => {
    conversation.push({
      role: m.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: m.content,
        },
      ],
    });
  });

  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: conversation,
  });

  return new Response(
    JSON.stringify({
      reply: result.text,
    }),
    {
      status: 200,
      headers: jsonHeaders,
    }
  );
}
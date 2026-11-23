import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getChatReply, type ChatMessage } from "./_chat-logic";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body: { messages?: ChatMessage[] } =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { messages } = body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid request body." });
      return;
    }

    const lang = req.headers["accept-language"] === "en" ? "en" : "zh";
    const text = await getChatReply(messages, lang);
    res.status(200).json({ text });
  } catch (error: any) {
    console.error("Gemini API route error:", error);
    res.status(500).json({ error: error.message || "Something went wrong server-side." });
  }
}

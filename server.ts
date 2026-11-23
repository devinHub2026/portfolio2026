import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { getChatReply, type ChatMessage } from "./api/_chat-logic";

// Load environment variables
dotenv.config();

// Fix for ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API routes inside Express (mirrors api/chat.ts, which Vercel uses in production)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body as { messages?: ChatMessage[] };
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request body." });
    }

    const lang = req.headers["accept-language"] === "en" ? "en" : "zh";
    const text = await getChatReply(messages, lang);
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini API server route error:", error);
    res.status(500).json({ error: error.message || "Something went wrong server-side." });
  }
});

// Implement Vite middleware integration
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import vite server to mount as express middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static distribution pipeline configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server listening at http://localhost:${PORT}`);
  });
}

setupServer();

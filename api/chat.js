import Anthropic from "@anthropic-ai/sdk";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" });

  try {
    const { model, max_tokens, system, messages } = req.body;

    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: model || "claude-sonnet-4-20250514",
      max_tokens: max_tokens || 1000,
      system,
      messages,
    });

    return res.status(200).json(response);
  } catch (err) {
    console.error("Anthropic error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
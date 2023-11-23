
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userMessage = req.body.message;
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ],
      });

      res.status(200).json({ message: completion.choices[0].message.content });
    } catch (error) {
      console.error("Error getting completion:", error);
      res.status(500).json({ message: "Failed to get a response." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
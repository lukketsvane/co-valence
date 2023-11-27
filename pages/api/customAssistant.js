// customAssistant.js
import OpenAI from "openai";

export default async function customAssistantHandler(req, res) {
  if (req.method === 'POST') {
    const { userMessage, assistantId } = req.body; // assistantId is passed from the client

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await openai.createChatCompletion({
        model: "gpt-4-1106-preview", // Adjust model if needed
        messages: [
          { role: "user", content: userMessage }
        ],
        assistant_id: assistantId, // Use the assistant ID passed from the client
      });

      res.status(200).json({ message: response.choices[0].message.content });
    } catch (error) {
      console.error("Error calling the custom assistant:", error);
      res.status(500).json({ message: "Failed to get a response from the assistant." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

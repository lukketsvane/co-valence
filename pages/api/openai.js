
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userMessage = req.body.message;
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [
        { role: "system", content: "# MISSION\nYou are a systematic word listing tool. The English language is vast and complex, with many obscure, precise, and grandiloquent words. The USER will give you a query and you will enumerate all relevant and salient words by using the following methodology:\n\n# METHOD\n\n## STEP 1 RESTATE REQUEST\nThe first step is to restate the request by generating a list of related questions. This will tee up and inspire the following steps. These questions should be geared towards the topic(s) at hand, as well as those tangentially related to the main query.\n\n## STEP 2 ENUMERATE WORDS\nNow that you have a main query from the user as well as salient and tangentially related queries that you generated, you should next write a list of words as a simple \"labeled list\" e.g. a hyphenated list where you give the word followed by a brief definition.\n\n## STEP 3 FOLLOW TANGENT\nIf something you wrote inspires you or reminds you of something related that you haven't enumerated yet, describe this new topic as it pertains to the user's original inquiry, and then repeat from STEP 1. You should iterate through this entire process at least 3 times, but keep going until you've fully exhausted your lexical knowledge.\n\n## RESPONSE FORMAT\nAll responses should be formatted in markdown to clearly organize and present the information."
      },
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
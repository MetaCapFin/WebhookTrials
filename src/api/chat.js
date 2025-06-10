import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ← this pulls the value from Vercel
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const userMessage = req.body.message;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      });

      res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
      console.error('OpenAI error:', error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


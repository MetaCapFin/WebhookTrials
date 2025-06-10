// src/pages/api/chat.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const response = completion.choices[0].message.content.trim();
    res.status(200).json({ response });
  } catch (err) {
    console.error('OpenAI API error:', err);
    res.status(500).json({ error: 'AI failed to respond' });
  }
}

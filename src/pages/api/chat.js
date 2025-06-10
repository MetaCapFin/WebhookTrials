// src/pages/api/chat.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    const botResponse = completion.choices[0].message.content;
    res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('OpenAI API error:', error);

    // ✅ Handle quota error gracefully
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: 'OpenAI quota exceeded. Please try again later.',
      });
    }

    res.status(500).json({
      error: 'Something went wrong while processing your request.',
    });
  }
}


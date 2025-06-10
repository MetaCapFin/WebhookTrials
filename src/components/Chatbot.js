import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const botMessage = { sender: 'bot', text: getBotResponse(input) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const getBotResponse = (msg) => {
    if (msg.toLowerCase().includes('hello')) return 'Hi! I’m Haro-bot!';
    return "I'm still learning. Try saying 'hello'.";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg text-white ${
              msg.sender === 'user' ? 'bg-blue-500 self-end' : 'bg-gray-600 self-start'
            } max-w-[80%]`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex border-t p-2">
        <input
          type="text"
          className="flex-1 border rounded-l-md p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Say something..."
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r-md"
          onClick={handleSend}
        >
          SEND COMMAND
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbotPopup">
      <div className="chatbotHeader">HARO ONLINE</div>

      <div className="chatbotMessages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded-md max-w-[80%] ${
              msg.sender === 'user'
                ? 'bg-[#0046ad] text-white ml-auto text-right'
                : 'bg-gray-800 text-cyan-300 mr-auto text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbotInput">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type command..."
        />
        <button onClick={handleSend}>COMMAND</button>
      </div>
    </div>
  );
}


import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { sender: 'user', text: trimmed };
    const botMessage = { sender: 'bot', text: getBotResponse(trimmed) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('hello')) return 'Hi! I’m Haro-bot!';
    return "I'm still learning. Try saying 'hello'.";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbotPopup">
      <div className="chatbotHeader">Haro Chat</div>

      <div className="chatbotMessages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded-md max-w-[80%] ${
              msg.sender === 'user'
                ? 'bg-[#0046ad] text-white ml-auto text-right'
                : 'bg-[#0e0e0e] text-[#00f0ff] border border-[#00f0ff33] mr-auto text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbotInput">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type command..."
          autoComplete="off"
        />
        <button onClick={handleSend}>COMMAND</button>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Chatbot.module.css';

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
    <>
      <div className={styles.chatbotMessages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.messageBubble} ${
              msg.sender === 'user' ? styles.userBubble : styles.botBubble
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatbotInput}>
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
          className={styles.chatbotTextInput}
        />
        <button onClick={handleSend}>COMMAND</button>
      </div>
    </>
  );
}


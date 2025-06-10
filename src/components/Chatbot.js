import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Chatbot.module.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [pilotName, setPilotName] = useState(null);
  const [isAskingName, setIsAskingName] = useState(true);
  const [awaitingMSCOConfirm, setAwaitingMSCOConfirm] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const qrImageUrl = '/qr-connect-msco.png'; // Replace with your real QR image path

  useEffect(() => {
    const initialMessages = [
      { sender: 'bot', text: '👋 Hello Pilot, welcome to your MS interface.' },
      { sender: 'bot', text: 'What is your name, Pilot?' },
    ];
    setMessages(initialMessages);
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    if (isAskingName) {
      setPilotName(trimmed);
      setIsAskingName(false);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `Nice to meet you, ${trimmed}. Ready for commands when you are.` },
      ]);
      return;
    }

    if (awaitingMSCOConfirm) {
      const lower = trimmed.toLowerCase();
      if (['yes', 'y', 'sure', 'ok', 'affirmative', 'connect me'].some(word => lower.includes(word))) {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: '📡 Please use your communications device to scan the code and connect directly to base.' },
          { sender: 'bot', isImage: true, imageUrl: qrImageUrl }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: "Understood, Pilot. Let me know if you'd like to try again." },
        ]);
      }
      setAwaitingMSCOConfirm(false);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unexpected server error');

      const botMessage = {
        sender: 'bot',
        text: `Roger that, Pilot ${pilotName}. ${data.response}`,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('OpenAI API error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `❗ I'm having trouble processing your request.` },
        { sender: 'bot', text: 'Would you like to be connected to the available MSCO?' }
      ]);
      setAwaitingMSCOConfirm(true);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className={styles.chatbotMessages}>
        {messages.map((msg, idx) =>
          msg.isImage ? (
            <div key={idx} className={styles.botBubble}>
              <img src={msg.imageUrl} alt="QR Code" className={styles.qrImage} />
            </div>
          ) : (
            <div
              key={idx}
              className={`${styles.messageBubble} ${
                msg.sender === 'user' ? styles.userBubble : styles.botBubble
              }`}
            >
              {msg.text}
            </div>
          )
        )}
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
          placeholder={isAskingName ? 'Enter your name...' : 'Type command...'}
          autoComplete="off"
          className={styles.chatbotTextInput}
        />
        <button onClick={handleSend}>
          {isAskingName ? 'SUBMIT' : 'COMMAND'}
        </button>
      </div>
    </>
  );
}



import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Chatbot.module.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [pilotName, setPilotName] = useState(null);
  const [isAskingName, setIsAskingName] = useState(true);
  const [awaitingMSCOConfirm, setAwaitingMSCOConfirm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const qrImageUrl = '/qr-connect-msco.png'; // Replace with your real QR image path

  useEffect(() => {
    typeBotMessage('👋 Hello Pilot, welcome to your MS interface.', () => {
      setTimeout(() => {
        typeBotMessage('Please state Name or Callsign', () => {
          setIsAskingName(true);
        });
      }, 600);
    });
  }, []);

  const handleSend = async () => {
    if (isTyping) return; // Prevent sending while bot is typing
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
        { sender: 'bot', text: `Acknowledged, ${trimmed}. Ready for commands inputs.` },
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
          { sender: 'bot', text: "Understood. Let me know if you'd like to try again." },
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

  const typeBotMessage = (fullText, onComplete) => {
  setIsTyping(true);
  let index = 0;

  const interval = setInterval(() => {
    setMessages((prev) => {
      const newMessages = [...prev];

      if (newMessages.length && newMessages[newMessages.length - 1].typing) {
        // Append next character
        newMessages[newMessages.length - 1].text += fullText.charAt(index);
      } else {
        // Add new bot message starting with empty text (not first char)
        newMessages.push({ sender: 'bot', text: '', typing: true });
        // Append first char on next tick (in next interval)
        // so no premature cutting of first letter
      }

      return newMessages;
    });

    index++;
    if (index === fullText.length) {
      clearInterval(interval);
      setMessages((prev) => {
        const updated = [...prev];
        if (updated.length && updated[updated.length - 1].typing) {
          updated[updated.length - 1].typing = false;
        }
        return updated;
      });
      setIsTyping(false);
      if (onComplete) onComplete();
    }
  }, 35);
};


  return (
    <>
      <div className={styles.chatbotMessages}>
        {messages.map((msg, idx) =>
          msg.isImage ? (
            <div
              key={idx}
              className={`${styles.botBubble} ${styles.messageSpacing} ${styles.leftAlign}`} // bot images on left
            >
              <img src={msg.imageUrl} alt="QR Code" className={styles.qrImage} />
            </div>
          ) : (
            <div
              key={idx}
              className={`${styles.messageBubble} ${styles.messageSpacing} ${
                msg.sender === 'user' ? styles.rightAlign : styles.leftAlign
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
          disabled={isTyping}
        />
        <button onClick={handleSend} disabled={isTyping}>
          {isAskingName ? 'SUBMIT' : 'COMMAND'}
        </button>
      </div>
    </>
  );
}





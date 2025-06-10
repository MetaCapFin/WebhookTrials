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
        typeBotMessage('What is your name, Pilot?', () => {
          setIsAskingName(true);
        });
      }, 600);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const typeBotMessage = (fullText, onComplete) => {
    setIsTyping(true);
    let index = 0;

    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessages = [...prev];
        // If last message is a bot typing message, update it
        if (newMessages.length && newMessages[newMessages.length - 1].typing) {
          newMessages[newMessages.length - 1].text += fullText.charAt(index);
        } else {
          // Add a new bot message with typing=true
          newMessages.push({ sender: 'bot', text: fullText.charAt(index), typing: true });
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
    }, 35); // typing speed in ms
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return; // prevent input while bot is typing

    const userMessage = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    if (isAskingName) {
      setPilotName(trimmed);
      setIsAskingName(false);
      typeBotMessage(`Nice to meet you, ${trimmed}. Ready for commands when you are.`);
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
        typeBotMessage("Understood, Pilot. Let me know if you'd like to try again.");
      }
      setAwaitingMSCOConfirm(false);
      return;
    }

    // Normal chat message flow - call API
    try {
      setIsTyping(true);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unexpected server error');

      typeBotMessage(`Roger that, Pilot ${pilotName}. ${data.response}`);
    } catch (err) {
      console.error('OpenAI API error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `❗ I'm having trouble processing your request.` },
        { sender: 'bot', text: 'Would you like to be connected to the available MSCO?' }
      ]);
      setAwaitingMSCOConfirm(true);
      setIsTyping(false);
    }
  };

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
              } ${msg.typing ? styles.typingBubble : ''}`}
            >
              {msg.text}
              {msg.typing && <span className={styles.typingIndicator}>|</span>}
            </div>
          )
        )}
        {isTyping && !messages.some(m => m.typing) && <div className={styles.botBubble}>...</div>}
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
        <button onClick={handleSend} disabled={isTyping || !input.trim()}>
          {isAskingName ? 'SUBMIT' : 'COMMAND'}
        </button>
      </div>
    </>
  );
}




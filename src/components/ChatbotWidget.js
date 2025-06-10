import { useState } from 'react';
import Chatbot from './Chatbot';
import styles from '../styles/Chatbot.module.css';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.chatbotWidget}>
      {/* Floating Haro Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-button"
        aria-label="Open Haro Chat"
      >
        <div className="eye left"></div>
        <div className="eye right"></div>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">Haro Chat</div>
          <Chatbot />
        </div>
      )}
    </div>
  );
}



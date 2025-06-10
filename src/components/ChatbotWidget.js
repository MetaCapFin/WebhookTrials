import { useState } from 'react';
import Chatbot from './Chatbot';
import styles from '../styles/Chatbot.module.css';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.chatbotWidget}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.chatbotButton}
        aria-label="Open Haro Chat"
      >
        <img
          src="/HaroNoBackground.png"
          alt="Haro"
          className={styles.haroImage}
        />
      </button>

      {isOpen && (
        <div className={styles.chatbotPopup}>
          <div className={styles.chatbotHeader}>Haro Chat</div>
          <Chatbot />
        </div>
      )}
    </div>
  );
}



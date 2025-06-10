import { useState } from 'react';
import Chatbot from './Chatbot';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Haro Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center relative"
      >
        {/* Haro face: simple eyes */}
        <div className="w-2 h-2 bg-black rounded-full absolute top-[30%] left-[30%]"></div>
        <div className="w-2 h-2 bg-black rounded-full absolute top-[30%] right-[30%]"></div>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-xl shadow-xl mt-2 border border-gray-300 flex flex-col">
          <div className="bg-green-500 text-white px-4 py-2 rounded-t-xl font-semibold">
            Haro Chat
          </div>
          <Chatbot />
        </div>
      )}
    </div>
  );
}

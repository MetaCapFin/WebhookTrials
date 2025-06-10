import FreeCourseGuide from '../components/FreeCourseGuide';
import ChatbotWidget from '../components/ChatbotWidget';

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <FreeCourseGuide />
      </main>

      {/* Haro Chat Floating Button (always fixed above everything) */}
      <ChatbotWidget />
    </>
  );
}



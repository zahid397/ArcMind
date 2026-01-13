'use client';

import { useState } from 'react';

// Components (relative path – SAFE)
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { PayWallModal } from '../components/PayWallModal';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  paid?: boolean;
};

export default function Home() {
  // 🔥 Demo mode – wallet logic later
  const isConnected = true;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPayWall, setShowPayWall] = useState(false);
  const [pendingQuery, setPendingQuery] = useState('');

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // First 3 queries free
    const freeQueriesLeft = messages.filter(m => m.role === 'user').length < 3;

    if (!freeQueriesLeft) {
      setPendingQuery(content);
      setShowPayWall(true);
      return;
    }

    processMessage(content, true);
  };

  const processMessage = (content: string, isPaid: boolean) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      paid: isPaid,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // 🔥 Demo AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          '✅ This is a demo AI response.\n\nGroq + Circle integration will be added after hackathon 🚀',
        role: 'assistant',
        paid: isPaid,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePaymentComplete = () => {
    if (pendingQuery) {
      processMessage(pendingQuery, true);
      setPendingQuery('');
    }
    setShowPayWall(false);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">PayPerInsight AI</h1>
        <p className="text-gray-500">
          First 3 queries free • Then pay per insight
        </p>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="border rounded-2xl p-6 text-center">
            <p className="mb-4">🔒 Please connect your wallet</p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full">
              Connect Wallet
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col border rounded-2xl overflow-hidden">

          <ChatMessages messages={messages} isLoading={isLoading} />

          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow">
            ⏳ Generating AI response...
          </div>
        </div>
      )}

      {/* Paywall */}
      {showPayWall && (
        <PayWallModal />
      )}
    </div>
  );
}

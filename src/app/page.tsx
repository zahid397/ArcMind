'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Loader2, Shield, Zap, Wallet } from 'lucide-react';
import { toast } from 'sonner';

// 👇 FIX: Relative path and Named Import
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { PayWallModal } from '../components/PayWallModal';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
  paid?: boolean;
};

export default function Home() {
  const { isConnected } = useAccount();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPayWall, setShowPayWall] = useState(false);
  const [pendingQuery, setPendingQuery] = useState('');

  const handleSendMessage = async (content: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!content.trim()) return;

    // First 3 messages free logic
    const hasPaid = messages.length < 3; 

    if (!hasPaid) {
      setPendingQuery(content);
      setShowPayWall(true);
      return;
    }

    await processMessage(content, true);
  };

  const processMessage = async (content: string, isPaid: boolean) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      paid: isPaid,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Demo Response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "This is a secure AI response powered by Groq & Circle! 🚀 (Demo Mode)",
          role: 'assistant',
          timestamp: new Date(),
          paid: isPaid,
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        toast.success('Response generated!');
      }, 1500);

    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate response');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          PayPerInsight AI
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Secure Crypto Payments • Groq AI</p>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-xl">
             <Wallet className="w-12 h-12 mx-auto mb-4 text-purple-600" />
             <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
             <p className="text-gray-500 mb-6">Please connect via the navbar to start chatting.</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-[500px] border rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      )}

      {showPayWall && <PayWallModal />}
    </div>
  );
}

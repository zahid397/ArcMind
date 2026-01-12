'use client';

import { useState } from 'react';
import { ChatMessages } from '@/components/ChatMessages';
import { ChatInput } from '@/components/ChatInput';
import { PayWallModal } from '@/components/PayWallModal';
import { useAccount } from 'wagmi';
import { Loader2, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  paid: boolean;
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

    // Check if user has paid or needs to pay
    const hasPaid = messages.length < 3; // First 3 queries free

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
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: content,
          hasPaid: isPaid 
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        paid: isPaid,
      };

      setMessages(prev => [...prev, aiMessage]);
      toast.success('AI response generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate response');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    if (pendingQuery) {
      processMessage(pendingQuery, true);
      setPendingQuery('');
    }
    setShowPayWall(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ask AI Anything
          <span className="block text-lg font-normal text-gray-600 dark:text-gray-400 mt-2">
            Pay 0.01 USDC per query • First 3 queries free
          </span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm">Super Fast Responses (Groq)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30">
            <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm">Secure Crypto Payments</span>
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-12">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border shadow-lg">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect your Circle Wallet or any EVM wallet to start chatting with AI
            </p>
            <p className="text-sm text-gray-500">
              First 3 queries are free! Then pay just 0.01 USDC per query
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
            <ChatMessages messages={messages} isLoading={isLoading} />
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900">
              <h4 className="font-semibold mb-2">💡 Smart Responses</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Powered by Groq&apos;s fastest AI models
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
              <h4 className="font-semibold mb-2">🔒 Secure Payments</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Circle Wallet integration for safe transactions
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900">
              <h4 className="font-semibold mb-2">⚡ Instant Processing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI responses in milliseconds with Groq
              </p>
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600" />
            <p className="mt-4 text-center">Generating AI response...</p>
          </div>
        </div>
      )}

      <PayWallModal
        isOpen={showPayWall}
        onClose={() => setShowPayWall(false)}
        onPaymentComplete={handlePaymentComplete}
        amount="0.01"
        currency="USDC"
      />
    </div>
  );
}

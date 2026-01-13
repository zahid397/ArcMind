'use client';

import { useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950/50">
      <div className="max-w-4xl mx-auto space-y-6 pb-4">
        
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center opacity-60">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">PayPerInsight AI</h2>
            <p className="text-sm text-gray-500 mt-2">Ready to assist you with your data.</p>
          </div>
        )}

        {/* Message List */}
        {messages.map((msg) => (
          <ChatBubble key={msg.id} content={msg.content} role={msg.role} />
        ))}

        {/* AI Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl px-4 py-3 text-xs font-medium text-gray-500 animate-pulse">
              AI is analyzing...
            </div>
          </div>
        )}
        
        {/* Invisible Scroll Target */}
        <div ref={scrollRef} />
      </div>
    </div>
  );
}

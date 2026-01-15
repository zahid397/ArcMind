import { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import { Message } from '@/types';

interface Props {
  messages: Message[];
  loading: boolean;
}

export default function ChatContainer({ messages, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
      
      {/* Fake loading message bubble */}
      {loading && (
        <ChatBubble 
          message={{ 
            id: 'loading', 
            role: 'bot', 
            isLoading: true 
          }} 
        />
      )}
      
      <div ref={bottomRef} />
    </div>
  );
}

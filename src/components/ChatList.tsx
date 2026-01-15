import { useEffect, useRef } from 'react';
import { Message } from '@/types';
import AgentMessage from './AgentMessage';
import { User } from 'lucide-react';

interface ChatListProps {
  messages: Message[];
  loading: boolean;
}

export default function ChatList({ messages, loading }: ChatListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
      {messages.map((msg) => (
        <div key={msg.id} className="animate-fade-in-up">
          {msg.role === 'user' ? (
            // User Message
            <div className="flex flex-row-reverse gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
                <User size={20} />
              </div>
              <div className="bg-[#1e293b]/80 border border-white/10 p-4 rounded-2xl rounded-tr-none text-slate-100 max-w-[80%] backdrop-blur-sm">
                {msg.content}
              </div>
            </div>
          ) : (
            // Agent Message (Complex Component)
            <AgentMessage msg={msg} />
          )}
        </div>
      ))}

      {/* Loading Skeleton */}
      {loading && (
        <div className="flex gap-4 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-cyan-500/20 shrink-0"></div>
          <div className="space-y-2 w-full max-w-md pt-2">
             <div className="h-4 bg-slate-800 rounded w-1/4"></div>
             <div className="h-20 bg-slate-800/50 rounded w-full border border-white/5"></div>
          </div>
        </div>
      )}

      {/* Invisible element to scroll to */}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}

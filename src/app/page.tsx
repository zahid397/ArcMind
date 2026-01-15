"use client";

import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput'; // (Create simple input component)
import AgentMessage from '@/components/AgentMessage';
import useChat from '@/hooks/useChat';
import { User, Loader2 } from 'lucide-react';

export default function Home() {
  const { messages, loading, sendMessage } = useChat();

  return (
    <main className="flex flex-col h-screen">
      <Header />

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto pt-24 pb-32 px-4 md:px-0">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {messages.length === 0 && (
            <div className="text-center mt-20 opacity-50">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                ArcMind Autonomous Agent
              </h2>
              <p className="mt-2 text-slate-400">Powered by Groq, Gemini & Arc Network</p>
            </div>
          )}

          {messages.map((msg) => (
            msg.role === 'user' ? (
              <div key={msg.id} className="flex flex-row-reverse gap-4 animate-fade-in-up">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
                  <User size={20} />
                </div>
                <div className="bg-slate-800/80 p-4 px-6 rounded-2xl rounded-tr-none text-white max-w-xl">
                  {msg.content}
                </div>
              </div>
            ) : (
              <AgentMessage key={msg.id} msg={msg} />
            )
          ))}

          {loading && (
            <div className="flex gap-4 items-center animate-pulse text-cyan-400 ml-2">
              <Loader2 className="animate-spin" />
              <span className="font-mono text-sm tracking-widest">AGENT THINKING & PAYING...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 w-full p-4 bg-gradient-to-t from-[#050511] to-transparent">
        <div className="max-w-3xl mx-auto">
           {/* Simple Input Form Code here */}
           <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
      </div>
    </main>
  );
}

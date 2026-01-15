"use client";

import Header from "@/components/Header";
import ChatContainer from "@/components/ChatContainer";
import ChatInput from "@/components/ChatInput";
import useChat from "@/hooks/useChat";

export default function Home() {
  const { messages, loading, sendMessage } = useChat();

  return (
    <main className="flex flex-col h-screen bg-[#050511]">
      <Header />
      
      {/* Chat Area */}
      <section className="flex-1 overflow-hidden relative flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-pulse-slow">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              PayPerInsight
            </h1>
            <p className="text-slate-400 max-w-lg text-lg font-light">
              One question. One micro-payment. <br/> Unlock high-value AI market intelligence.
            </p>
          </div>
        ) : (
          <ChatContainer messages={messages} loading={loading} />
        )}
      </section>

      {/* Input Area */}
      <ChatInput onSend={sendMessage} disabled={loading} />
    </main>
  );
}

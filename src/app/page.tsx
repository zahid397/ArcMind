'use client';

import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ChatMessages messages={[]} />
      <ChatInput onSend={() => {}} />
    </div>
  );
}

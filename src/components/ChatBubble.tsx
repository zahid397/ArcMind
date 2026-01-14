'use client';

export default function ChatInput({ onSend }: { onSend: (v: string) => void }) {
  return (
    <input
      className="border p-3"
      placeholder="Type..."
      onKeyDown={(e) => e.key === 'Enter' && onSend('demo')}
    />
  );
}

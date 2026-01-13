'use client';

interface ChatBubbleProps {
  content: string;
  role: 'user' | 'assistant';
}

export default function ChatBubble({ content, role }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow
        ${isUser 
          ? 'bg-purple-600 text-white' 
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}
      >
        {content}
      </div>
    </div>
  );
}

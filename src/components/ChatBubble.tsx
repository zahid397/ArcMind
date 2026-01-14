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
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${
            isUser
              ? 'bg-purple-600 text-white rounded-br-none'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}

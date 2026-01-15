import { useState } from 'react';
import api from '@/lib/api';
import { Message, ChatResponse } from '@/types';

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    // Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const { data } = await api.post<ChatResponse>('/ask', { 
        question: text,
        model: "groq"
      });

      // Add Bot Message
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        preview: data.preview,
        fullAnswer: data.full_answer_hidden,
        price: data.price_usdc,
        isLocked: true,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { 
        id: Date.now().toString(), 
        role: 'bot', 
        text: "⚠️ System Malfunction: Unable to reach neural network." 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage };
}

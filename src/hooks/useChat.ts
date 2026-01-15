import { useState } from 'react';
import axios from 'axios';
import { Message } from '@/types';

// API URL (Backend port 8000)
const API_URL = "http://localhost:8000/api/agent/execute";

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    // 1. User Message Add
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // 2. API Call to ArcMind Backend
      const response = await axios.post(API_URL, {
        task: text,
        model_preference: "groq"
      });

      const data = response.data;

      // 3. Agent Message Add
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        reasoning: data.reasoning,
        tool_used: data.tool_used,
        image_url: data.image_url,
        transaction: data.transaction,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Error:", error);
      // Optional: Add error message logic here
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage };
}

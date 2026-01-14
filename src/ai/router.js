import { mockAI } from './mockAI';
import { groqAI } from './providers/groq';
import { geminiAI } from './providers/gemini';
import { openaiAI } from './providers/openai';

export function routeAI(prompt) {
  // হিউরিস্টিক লজিক: ফাস্ট দরকার না ডিপ নলেজ?
  const isComplex = prompt.length > 100 || prompt.includes('analyze') || prompt.includes('plan');

  // 1. স্পিড দরকার হলে গ্রোক (Groq)
  if (!isComplex && import.meta.env.VITE_GROQ_API_KEY) {
    return groqAI;
  }

  // 2. কমপ্লেক্স হলে ওপেন এআই (OpenAI)
  if (isComplex && import.meta.env.VITE_OPENAI_API_KEY) {
    return openaiAI;
  }

  // 3. সব কাজের কাজি (Gemini)
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return geminiAI;
  }

  // 4. কোনো চাবি না থাকলে বা ফেইল করলে মক (Stealth Mode)
  return mockAI;
}

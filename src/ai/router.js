/**
 * AI Intelligence Router
 * Decides which AI model handles the request based on complexity & available keys.
 */

// Import Providers (Ensure file names in 'providers' folder are lowercase: groq.js, gemini.js, openai.js)
import { mockAI } from './mockAI';
import { groqAI } from './providers/groq';
import { geminiAI } from './providers/gemini';
import { openaiAI } from './providers/openai';

export function routeAI(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // 1. Check available keys from .env
  const hasGroq = !!import.meta.env.VITE_GROQ_API_KEY;
  const hasGemini = !!import.meta.env.VITE_GEMINI_API_KEY;
  const hasOpenAI = !!import.meta.env.VITE_OPENAI_API_KEY;

  console.log(`[Router] Keys Detected: Groq=${hasGroq}, Gemini=${hasGemini}, OpenAI=${hasOpenAI}`);

  // 2. Logic: High Reasoning / Coding -> OpenAI (Best for logic)
  if (hasOpenAI && (lowerPrompt.includes('code') || lowerPrompt.includes('analyze') || lowerPrompt.includes('plan') || lowerPrompt.length > 200)) {
    console.log('[Router] Selected: OpenAI (Reasoning Mode)');
    return openaiAI;
  }

  // 3. Logic: Speed / Short Queries -> Groq (Fastest)
  if (hasGroq && lowerPrompt.length < 100) {
    console.log('[Router] Selected: Groq (Speed Mode)');
    return groqAI;
  }

  // 4. Logic: Balanced / General -> Gemini (Cost effective & Smart)
  if (hasGemini) {
    console.log('[Router] Selected: Gemini (Standard Mode)');
    return geminiAI;
  }

  // 5. Fallback: If OpenAI/Groq keys are missing but others exist, swap logic
  if (hasOpenAI) return openaiAI;
  if (hasGroq) return groqAI;

  // 6. Ultimate Fallback: Mock AI (If no keys are present or system fails)
  console.warn('[Router] No valid API keys found. Switching to Stealth Mock.');
  return mockAI;
}

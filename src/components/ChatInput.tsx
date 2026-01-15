import { useState, FormEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
      {/* Glowing Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-30 blur group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative flex items-center bg-[#0a0a16] rounded-xl border border-white/10 p-1.5 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(0,242,255,0.1)] transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask ArcMind to perform a task..."
          disabled={disabled}
          className="w-full bg-transparent text-white p-3 pl-4 outline-none placeholder:text-slate-500 font-light"
        />
        
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
        >
          {disabled ? (
            <Sparkles className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <div className="text-center mt-3 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
        Powered by Groq • Secured on Arc Network
      </div>
    </form>
  );
}

import { BrainCircuit, Wallet } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full p-4 px-6 flex justify-between items-center bg-[#050511]/80 backdrop-blur-lg border-b border-white/5 z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
          <BrainCircuit className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
          ArcMind
        </h1>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Treasury</span>
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
            <Wallet size={14} /> $45.20 USDC
          </div>
        </div>
        
        <div className="px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-wider">
          ARC TESTNET
        </div>
      </div>
    </header>
  );
}

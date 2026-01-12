'use client';

import { WalletConnect } from './WalletConnect';
import { ThemeToggle } from './ui/ThemeToggle';
import { Brain, Wallet } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              PayPerInsight
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              AI Chat • Pay per query
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <Wallet className="h-4 w-4" />
            <span className="text-sm font-medium">0.01 USDC/query</span>
          </div>
          <ThemeToggle />
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
}

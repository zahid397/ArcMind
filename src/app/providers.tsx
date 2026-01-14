'use client';

import dynamic from 'next/dynamic';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { config } from '@/lib/wagmi';

// 🚫 RainbowKit SSR disable
const RainbowKitProvider = dynamic(
  () => import('@rainbow-me/rainbowkit').then(m => m.RainbowKitProvider),
  { ssr: false }
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RainbowKitProvider>
            <Toaster richColors position="top-right" />
            {children}
          </RainbowKitProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

'use client';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmi';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

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

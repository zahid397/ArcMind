import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { arcTestnet } from 'viem/chains';

export const config = getDefaultConfig({
  appName: 'PayPerInsight',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo',
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(process.env.ARC_RPC_URL),
  },
  ssr: true,
});

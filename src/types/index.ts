export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  paid?: boolean;
}

export interface PaymentSession {
  sessionId: string;
  amount: string;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  walletAddress?: string;
}

export interface ChatConfig {
  pricePerQuery: number;
  freeTierQueries: number;
  currency: 'USDC' | 'ETH';
}

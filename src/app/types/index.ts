export interface Transaction {
  amount: string;
  currency: string;
  tx_hash: string;
  explorer_url: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  tool_used?: string;
  image_url?: string;
  transaction?: Transaction;
  timestamp: number;
}

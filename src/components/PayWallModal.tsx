'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from './ui/Button';
import { createPaymentSession } from '@/lib/circle';

interface PayWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  amount: string;
  currency: string;
}

export function PayWallModal({
  isOpen,
  onClose,
  onPaymentComplete,
  amount,
  currency,
}: PayWallModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'init' | 'confirming' | 'complete'>('init');

  const handlePayment = async () => {
    if (!isOpen) return;

    setIsProcessing(true);
    setStep('confirming');

    try {
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production: Call Circle API
      // const session = await createPaymentSession(amount, userId);
      
      setStep('complete');
      
      // Simulate confirmation delay
      setTimeout(() => {
        onPaymentComplete();
        setIsProcessing(false);
        setStep('init');
      }, 1500);
      
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      setStep('init');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setStep('init');
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 mb-4">
            <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Payment Required</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your conversation by making a small payment
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">AI Query Access</span>
              <span className="text-sm text-gray-500">1 query</span>
            </div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {amount} {currency}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ≈ $0.01 • Pay once, get instant response
            </p>
          </div>

          {step === 'init' && (
            <div className="space-y-3">
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full gap-2"
                size="lg"
              >
                Pay with Circle Wallet
              </Button>
              <p className="text-xs text-center text-gray-500">
                Secure payment powered by Circle Programmable Wallets
              </p>
            </div>
          )}

          {step === 'confirming' && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
              <p className="font-medium">Confirming payment...</p>
              <p className="text-sm text-gray-500 mt-1">
                Please approve the transaction in your wallet
              </p>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="font-medium text-lg">Payment Successful!</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Generating your AI response now...
              </p>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <ExternalLink className="h-4 w-4" />
            <span>Powered by Circle & Groq</span>
          </div>
        </div>
      </div>
    </div>
  );
}

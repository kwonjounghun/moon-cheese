import { type CurrencyType } from '@/ui-lib/components/currency-toggle';
import { create } from 'zustand';

interface CurrencyStore {
  currency: CurrencyType;
  exchangeRate: {
    KRW: number;
    USD: number;
  };
  setCurrency: (currency: CurrencyType) => void;
  setExchangeRate: (exchangeRate: { KRW: number; USD: number }) => void;
}

export const useCurrencyStore = create<CurrencyStore>(set => ({
  currency: 'USD',
  exchangeRate: {
    KRW: 1400,
    USD: 1,
  },
  setCurrency: currency => set({ currency }),
  setExchangeRate: (exchangeRate: { KRW: number; USD: number }) => set({ exchangeRate }),
}));

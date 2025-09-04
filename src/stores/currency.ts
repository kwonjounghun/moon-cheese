import { create } from "zustand";
import { type CurrencyType } from "@/ui-lib/components/currency-toggle";

interface CurrencyStore {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
}

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currency: 'USD',
  setCurrency: (currency) => set({ currency }),
}));
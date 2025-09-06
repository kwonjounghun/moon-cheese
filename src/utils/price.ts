import type { CurrencyType } from "@/ui-lib/components/currency-toggle";
import { commaizeNumber } from "@toss/utils";

export const formatPrice = (price: number, currency: CurrencyType) => {
  switch (currency) {
    case 'USD':
      return `$${commaizeNumber(price)}`;
    case 'KRW':
      return `${commaizeNumber(Math.round(price))}원`;
  }
}
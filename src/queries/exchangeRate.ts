import { http } from "@/utils/http";
import { queryOptions } from "@tanstack/react-query";

const queryKeys = {
  exchangeRate: () => ['exchangeRate'],
}

type ExchangeRateResponse = {
  exchangeRate: { KRW: number, USD: number };
};

const getExchangeRate = async () => {
  const response = await http.get<ExchangeRateResponse>('/api/exchange-rate');
  return response.exchangeRate;
};

export const exchangeRateQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.exchangeRate(),
    queryFn: getExchangeRate,
  });
};
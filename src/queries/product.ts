import { http } from "@/utils/http";
import { queryOptions } from "@tanstack/react-query";

export type RecentProduct = {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
};


const queryKeys = {
  recentProducts: () => ['recentProducts'],
};

const getRecentProducts = async () => {
  const response = await http.get<{ recentProducts: RecentProduct[] }>('/api/recent/product/list');
  return response.recentProducts;
};

export const recentProductsQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.recentProducts(),
    queryFn: getRecentProducts,
  });
};
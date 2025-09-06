import { http } from "@/utils/http";
import { queryOptions } from "@tanstack/react-query";

export type RecentProduct = {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
};


const queryKeys = {
  all: () => ['products'],
  recent: () => ['products', 'recent'],
  List: () => ['products', 'list'],
  Detail: (id: number) => ['products', id],
  recommendList: (id: number) => ['products', id, 'recommend'],
};

const getRecentProducts = async () => {
  const response = await http.get<{ recentProducts: RecentProduct[] }>('/api/recent/product/list');
  return response.recentProducts;
};

export const recentProductsQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.recent(),
    queryFn: getRecentProducts,
  });
};


type ProductCategory = 'CHEESE' | 'CRACKER' | 'TEA';

export type BaseProduct = {
  id: number;
  name: string;
  category: ProductCategory;
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
};

export interface ProductCheese extends BaseProduct {
  category: 'CHEESE';
}
export interface ProductCracker extends BaseProduct {
  category: 'CRACKER';
  isGlutenFree: boolean;
}
export interface ProductTea extends BaseProduct {
  category: 'TEA';
  isCaffeineFree: boolean;
}

export type Product = ProductCheese | ProductCracker | ProductTea;

export const isProductCheese = (product: Product): product is ProductCheese => {
  return product.category === 'CHEESE';
};
export const isProductCracker = (product: Product): product is ProductCracker => {
  return product.category === 'CRACKER';
};
export const isProductTea = (product: Product): product is ProductTea => {
  return product.category === 'TEA';
};

const getProductList = async () => {
  const response = await http.get<{ products: Product[] }>('/api/product/list');
  return response.products;
};

export const productListQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.List(),
    queryFn: getProductList,
  });
};

const getProductDetail = async (id: number) => {
  const response = await http.get<Product>(`/api/product/${id}`);
  return response;
};

export const productDetailQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: queryKeys.Detail(id),
    queryFn: () => getProductDetail(id),
  });
};

interface RecommendProductList {
  recommendProductIds: number[];
}

const getRecommendProductList = async (id: number) => {
  const response = await http.get<RecommendProductList>(`/api/product/recommend/${id}`);
  return response.recommendProductIds;
};

export const recommendProductListQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: queryKeys.recommendList(id),
    queryFn: () => getRecommendProductList(id),
  });
};
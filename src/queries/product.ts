import { http } from "@/utils/http";
import { queryOptions } from "@tanstack/react-query";

export type RecentProduct = {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
};


const queryKeys = {
  recentProducts: () => ['recent', 'products'],
  productList: () => ['products'],
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
    queryKey: queryKeys.productList(),
    queryFn: getProductList,
  });
};
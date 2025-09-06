import { http } from "@/utils/http";
import { queryOptions } from "@tanstack/react-query";
import type { GradeType } from "@/types/types";


export const queryKeys = {
  all: () => ['grade'],
  point: () => ['grade', 'point'],
  shipping: () => ['grade', 'shipping'],
};

export type GradePoint = {
  type: GradeType;
  minPoint: number;
};

export type GradePointResponse = {
  gradePointList: GradePoint[];
};

export const getPoint = async () => {
  const response = await http.get<GradePointResponse>('/api/grade/point');
  return response.gradePointList;
};

export const pointQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.point(),
    queryFn: getPoint,
  });
};

export interface GradeShipping {
  type: GradeType;
  shippingFee: number;
  freeShippingThreshold: number;
}

export interface GradeShippingResponse {
  gradeShippingList: GradeShipping[];
}

export const getShipping = async () => {
  const response = await http.get<GradeShippingResponse>('/api/grade/shipping');
  return response.gradeShippingList;
};

export const gradeShippingQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.shipping(),
    queryFn: getShipping,
  });
};
import { http } from "@/utils/http";
import { queryOptions } from "@tanstack/react-query";
import type { GradeType } from "@/types/types";

type GradePoint = {
  type: GradeType;
  minPoint: number;
};

type PointResponse = {
  gradePointList: GradePoint[];
};


export const queryKeys = {
  point: () => ['point'],
};

export const getPoint = async () => {
  const response = await http.get<PointResponse>('/api/grade/point');
  return response.gradePointList;
};

export const pointQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.point(),
    queryFn: getPoint,
  });
};
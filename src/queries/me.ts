import { http } from "@/utils/http";
import { queryOptions } from "@tanstack/react-query";
import type { GradeType } from "@/types/types";

export const queryKeys = {
  me: () => ['me'],
};

type User = {
  point: number;
  grade: GradeType;
};

const getMe = async () => {
  const response = await http.get<User>('/api/me');
  return response;
};

export const meQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.me(),
    queryFn: getMe,
  });
};
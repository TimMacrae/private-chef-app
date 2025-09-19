import { getRecipesAction } from "@/app/actions/recipes-server.actions";
import { apiConfig } from "@/lib/api/api-config";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useRecipes = (page: number, size: number) => {
  return useQuery({
    queryKey: [apiConfig.QUERY_KEYS.RECIPES, page, size],
    queryFn: () => getRecipesAction({ page: page, size: size }),

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

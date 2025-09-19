import { getRecipesAction } from "@/app/actions/recipes-server.actions";
import { apiConfig } from "@/lib/api/api-config";
import { useQuery } from "@tanstack/react-query";

export const useRecipes = () => {
  return useQuery({
    queryKey: [apiConfig.QUERY_KEYS.RECIPES],
    queryFn: getRecipesAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

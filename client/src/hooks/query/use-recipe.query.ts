import { getRecipeAction } from "@/app/actions/recipes-server.actions";
import { apiConfig } from "@/lib/api/api-config";
import { useQuery } from "@tanstack/react-query";

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: [apiConfig.QUERY_KEYS.RECIPE, id],
    queryFn: () => getRecipeAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

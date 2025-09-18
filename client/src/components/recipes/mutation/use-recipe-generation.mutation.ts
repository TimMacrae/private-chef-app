import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Recipe, RecipeGenerateRequest } from "../recipes.type";
import { recipeGenerationClientAction } from "@/app/actions/recipes-client.actions";
import { toast } from "sonner";
import { apiConfig } from "@/lib/api/api-config";

export const useRecipeGeneration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: RecipeGenerateRequest) => {
      return recipeGenerationClientAction(request);
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        [apiConfig.QUERY_KEYS.RECIPES],
        (oldData: Recipe[] | undefined) => {
          if (!oldData) {
            toast.error("No existing recipe data found.");
            return;
          }
          oldData.unshift(data);
          return [...oldData];
        }
      );
    },

    onError: (error) => {
      toast.error(`Failed to generate the recipe: ${error.message}`);
    },
  });
};

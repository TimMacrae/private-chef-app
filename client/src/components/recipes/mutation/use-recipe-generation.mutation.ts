import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RecipeGenerateRequest } from "../recipes.type";
import { recipeGenerationClientAction } from "@/app/actions/recipes-client.actions";
import { toast } from "sonner";
import { apiConfig } from "@/lib/api/api-config";

export const useRecipeGeneration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: RecipeGenerateRequest) => {
      return recipeGenerationClientAction(request);
    },

    onSuccess: () => {
      toast.success("Recipe generated successfully!");
      queryClient.invalidateQueries({
        queryKey: [apiConfig.QUERY_KEYS.RECIPES],
      });
    },

    onError: (error) => {
      toast.error(`Failed to generate the recipe: ${error.message}`);
    },
  });
};

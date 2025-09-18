import {
  Recipe,
  RecipeGenerateRequest,
  RecipeSchema,
} from "@/components/recipes/recipes.type";
import { clientRequest } from "@/lib/api/api-client-request-handler";
import { apiConfig } from "@/lib/api/api-config";

export async function recipeGenerationClientAction(
  request: Partial<RecipeGenerateRequest>
): Promise<Recipe> {
  return await clientRequest(apiConfig.API.RECIPE_GENERATION, RecipeSchema, {
    method: "POST",
    body: request,
  });
}

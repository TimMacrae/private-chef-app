"use server";

import {
  Recipe,
  Recipes,
  RecipeSchema,
  RecipesSchema,
} from "@/components/recipes/recipes.type";
import { apiConfig } from "@/lib/api/api-config";
import { serverRequest } from "@/lib/api/api-server-request-handler";

export async function getRecipesAction(): Promise<Recipes> {
  return await serverRequest(apiConfig.API.RECIPES, RecipesSchema);
}

export async function getRecipeAction(recipeId: string): Promise<Recipe> {
  return await serverRequest(
    `${apiConfig.API.RECIPES}/${recipeId}`,
    RecipeSchema
  );
}

"use server";

import {
  Recipe,
  Recipes,
  RecipeSchema,
  RecipesPageSchema,
} from "@/components/recipes/recipes.type";
import { apiConfig } from "@/lib/api/api-config";
import { serverRequest } from "@/lib/api/api-server-request-handler";

// export async function getRecipesAction(): Promise<Recipes> {
//   return await serverRequest(apiConfig.API.RECIPES, RecipesSchema);
// }

export async function getRecipesAction({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<Recipes> {
  const url = `${apiConfig.API.RECIPES}?page=${page}&size=${size}&sort=createdAt,desc`;
  return await serverRequest<Recipes>(url, RecipesPageSchema);
}

export async function getRecipeAction(recipeId: string): Promise<Recipe> {
  return await serverRequest(
    `${apiConfig.API.RECIPES}/${recipeId}`,
    RecipeSchema
  );
}

"use server";

import { Recipes, RecipesSchema } from "@/components/recipes/recipes.type";
import { apiConfig } from "@/lib/api/api-config";
import { serverRequest } from "@/lib/api/api-server-request-handler";

export async function getRecipesAction(): Promise<Recipes> {
  return await serverRequest(apiConfig.API.RECIPES, RecipesSchema);
}

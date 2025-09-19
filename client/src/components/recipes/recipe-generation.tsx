"use client";

import { useRecipes } from "@/hooks/query/use-recipes.query";
import { LayoutContentTitle } from "../layout/layout-content-title";
import { RecipeGenerationForm } from "./recipe-generation-form";
import { Recipe } from "./recipe";
import { useRecipeGeneration } from "./mutation/use-recipe-generation.mutation";
import { SkeletonRecipe } from "../skeleton/skeleton-recipe";

export function RecipeGeneration() {
  const { data: recipes } = useRecipes();
  const { mutate: generateRecipe, isPending } = useRecipeGeneration();

  const recipe = recipes ? recipes[0] : null;
  return (
    <>
      <LayoutContentTitle title="Recipe Generation" />
      <RecipeGenerationForm
        generateRecipe={generateRecipe}
        isPending={isPending}
      />
      {isPending && <SkeletonRecipe />}
      {recipe && !isPending && <Recipe recipe={recipe} />}
    </>
  );
}

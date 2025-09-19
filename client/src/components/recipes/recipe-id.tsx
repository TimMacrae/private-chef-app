"use client";
import { LayoutContentTitle } from "../layout/layout-content-title";
import { Recipe } from "./recipe";
import { useRecipe } from "@/hooks/query/use-recipe.query";

type RecipeIdProps = {
  id: string;
};

export function RecipeId({ id }: RecipeIdProps) {
  const { data: recipe } = useRecipe(id);

  return (
    <>
      <LayoutContentTitle title="" />
      {recipe ? <Recipe recipe={recipe} /> : null}
    </>
  );
}

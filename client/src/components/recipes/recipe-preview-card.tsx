"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Recipe } from "./recipes.type";

import {
  BarChart,
  ChefHat,
  Clock,
  DollarSign,
  Users,
  Utensils,
} from "lucide-react";
import { useRandomBackground } from "@/hooks/use-random-background";
import Link from "next/link";

type RecipePreviewCardProps = {
  recipe: Recipe;
};

export function RecipePreviewCard({ recipe }: RecipePreviewCardProps) {
  const {
    title,
    description,
    image,
    prepTimeMinutes,
    servings,
    cookingSkillLevel,
    budgetLevel,
    mealType,
    cuisine,
  } = recipe;

  const background = useRandomBackground();

  return (
    <Link href={`/recipes/${recipe.id}`} className="flex h-full">
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border-0 shadow-sm"
        )}
      >
        <div className="absolute inset-0">
          <Image
            src={image || background}
            alt=""
            fill
            priority
            className="object-cover scale-105 blur-[2px] transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
        </div>

        <CardContent className="relative z-10 flex flex-col h-full p-5 sm:p-6 lg:p-7 text-white">
          <div className="flex-grow">
            <h3 className="text-xl sm:text-2xl font-semibold leading-tight drop-shadow">
              {title}
            </h3>
            {description ? (
              <p className="mt-2 text-sm/6 sm:text-base/6 text-white/90 line-clamp-2 drop-shadow">
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <Badge variant="secondary" className="bg-accent">
              <Clock className="mr-1 h-3 w-3" /> {prepTimeMinutes} min
            </Badge>
            <Badge variant="secondary" className="bg-accent">
              <Users className="mr-1 h-3 w-3" /> {servings} servings
            </Badge>
            <Badge variant="secondary" className="capitalize bg-accent">
              <ChefHat className="mr-1 h-3 w-3" />
              {cookingSkillLevel.toLowerCase().replace("_", " ")}
            </Badge>
            <Badge variant="secondary" className="capitalize bg-accent">
              <DollarSign className="mr-1 h-3 w-3" />
              {budgetLevel.toLowerCase()}
            </Badge>
            <Badge variant="secondary" className="capitalize bg-accent">
              <BarChart className="mr-1 h-3 w-3" />
              {mealType.toLowerCase()}
            </Badge>
            <Badge variant="secondary" className="capitalize bg-accent">
              <Utensils className="mr-1 h-3 w-3" />
              {cuisine}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

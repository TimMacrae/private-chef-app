"use client";
import { useRecipes } from "@/hooks/query/use-recipes.query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RecipePreviewCard } from "../recipes/recipe-preview-card";
import { LayoutContentTitle } from "../layout/layout-content-title";

export function Dashboard() {
  const { data, isLoading } = useRecipes(1, 3);

  const recentRecipes = data?.content ?? [];
  return (
    <div>
      <LayoutContentTitle title="Dashboard" />
      {/* Top 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentRecipes &&
          !isLoading &&
          recentRecipes.map((recipe) => (
            <RecipePreviewCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Welcome to Your Private Chef!</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p>
            This is your personal space to create, discover, and manage your
            culinary journey. Here’s what you can do:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>AI Recipe Generation:</strong> Unleash your creativity by
              generating unique recipes with the power of AI. Simply provide
              your preferences and let the magic happen.
            </li>
            <li>
              <strong>Recipe History:</strong> Never lose a great idea. All your
              generated recipes are saved in your history for easy access
              anytime.
            </li>
            <li>
              <strong>Weekly Meal Planning:</strong> Organize your meals for the
              week ahead. Plan your breakfast, lunch, and dinner to stay on
              track with your culinary goals.
            </li>
            <li>
              <strong>Collaboration:</strong> Make meal decisions together!
              Invite friends, partners, or family to your space to vote on
              recipes for the upcoming week.
            </li>
          </ul>
          <p>Happy cooking!</p>
        </CardContent>
      </Card>
    </div>
  );
}

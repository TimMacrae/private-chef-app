import { z } from "zod";

export const MealTypeSchema = z.enum([
  "BREAKFAST",
  "LUNCH",
  "DINNER",
  "SNACK",
  "DESERT",
]);

export const BudgetLevelSchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
export const CookingSkillLevelSchema = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "KITCHEN_CHEF",
  "MICHELINE_STAR",
]);

export const RecipeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  image: z.string(),
  description: z.string(),
  ingredients: z.record(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number().int(),
  budgetLevel: BudgetLevelSchema,
  cookingSkillLevel: CookingSkillLevelSchema,
  cuisine: z.string(),
  mealType: MealTypeSchema,
  servings: z.number().int(),
  createdAt: z.coerce.date(),
});

export const RecipesPageSchema = z.object({
  content: z.array(RecipeSchema),
  page: z.object({
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    number: z.number(),
  }),
});

export const RecipesSchema = z.array(RecipeSchema);

export const RecipeGenerateRequestSchema = z.object({
  mealType: MealTypeSchema,
  instructions: z.string(),
  servings: z.number().int(),
});

// You can also infer TypeScript types from your schemas
export type Recipe = z.infer<typeof RecipeSchema>;
export type Recipes = z.output<typeof RecipesPageSchema>;
export type RecipeGenerateRequest = z.infer<typeof RecipeGenerateRequestSchema>;
export type MealType = z.infer<typeof MealTypeSchema>;

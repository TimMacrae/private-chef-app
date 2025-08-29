import { z } from "zod";

// Enums
export enum BudgetLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum CookingSkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  KITCHEN_CHEF = "KITCHEN_CHEF",
  MICHELINE_STAR = "MICHELINE_STAR",
}

export enum MaxPrepTime {
  MIN_15 = 15,
  MIN_30 = 30,
  MIN_45 = 45,
  MIN_60 = 60,
  MIN_90 = 90,
  MIN_120 = 120,
  MIN_150 = 150,
  MIN_180 = 180,
}

// Zod schemas
export const BudgetLevelSchema = z.nativeEnum(BudgetLevel);

export const CookingSkillLevelSchema = z.nativeEnum(CookingSkillLevel);

export const SeasonalPreferencesSchema = z.object({
  spring: z.boolean(),
  summer: z.boolean(),
  autumn: z.boolean(),
  winter: z.boolean(),
});

export const NutritionalGoalsSchema = z
  .object({
    dailyCalories: z.union([z.number().positive(), z.null()]).optional(),
    proteinGrams: z.union([z.number().positive(), z.null()]).optional(),
    carbsGrams: z.union([z.number().positive(), z.null()]).optional(),
    fatGrams: z.union([z.number().positive(), z.null()]).optional(),
  })
  .optional();

export const PreferencesSchema = z.object({
  id: z.string(),
  userId: z.string(),

  // Core Preferences
  dietaryRestrictions: z.array(z.string()),
  allergies: z.array(z.string()),
  dislikes: z.array(z.string()),
  likes: z.array(z.string()),

  // Culinary Preferences
  preferredCuisines: z.array(z.string()),
  excludedCuisines: z.array(z.string()),
  preferredChefStyles: z.array(z.string()),
  excludedChefStyles: z.array(z.string()),

  // Seasonal Preferences
  seasonalPreferences: SeasonalPreferencesSchema,

  // Meal Constraints
  maxPrepTimeMinutes: z.nativeEnum(MaxPrepTime),
  budgetLevel: BudgetLevelSchema,

  // Adaptive System
  autoAdaptBasedOnFeedback: z.boolean(),
  cookingSkillLevel: CookingSkillLevelSchema,
  kitchenEquipment: z.array(z.string()),

  // Nutrition Goals
  nutritionalGoals: NutritionalGoalsSchema,
});

// Type inference from Zod schema
export type Preferences = z.infer<typeof PreferencesSchema>;

// Define PreferenceArrayKeys with valid keys
export interface PreferenceArrayKeys {
  dietaryRestrictions: string[];
  allergies: string[];
  likes: string[];
  dislikes: string[];
  preferredCuisines: string[];
  preferredChefStyles: string[];
  kitchenEquipment: string[];
}

// Define keys that are single values
export type PreferenceSingleValueKeys = {
  maxPrepTimeMinutes: number;
  budgetLevel: string;
  autoAdaptBasedOnFeedback: boolean;
  cookingSkillLevel: string;
};

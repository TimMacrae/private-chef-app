import {
  BudgetLevel,
  CookingSkillLevel,
  Preferences as PreferencesType,
} from "../preferences.type";

export const mockPreferencesData: PreferencesType = {
  id: "1",
  userId: "user-1",
  dietaryRestrictions: ["vegetarian", "gluten-free"],
  allergies: ["nuts", "shellfish"],
  likes: ["pasta", "salads"],
  dislikes: ["spicy food"],
  preferredCuisines: ["italian", "mediterranean"],
  preferredChefStyles: ["rustic", "modern"],
  maxPrepTimeMinutes: 30,
  budgetLevel: "MEDIUM" as BudgetLevel, // Medium
  cookingSkillLevel: "BEGINNER" as CookingSkillLevel,
  kitchenEquipment: ["oven", "stovetop"],
  autoAdaptBasedOnFeedback: true,
  excludedCuisines: [],
  excludedChefStyles: [],
  seasonalPreferences: {
    spring: true,
    summer: true,
    autumn: true,
    winter: true,
  },
};

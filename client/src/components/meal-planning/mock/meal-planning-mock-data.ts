import { MealPlanning as MealPlanningType } from "../meal-planning.type";

export const mockMealPlanningData: MealPlanningType = {
  id: "1",
  userId: "user-1",
  active: true,
  monday: { breakfast: true, lunch: false, dinner: true },
  tuesday: { breakfast: false, lunch: true, dinner: false },
  wednesday: { breakfast: true, lunch: false, dinner: true },
  thursday: { breakfast: false, lunch: false, dinner: false },
  friday: { breakfast: true, lunch: true, dinner: false },
  saturday: { breakfast: false, lunch: true, dinner: true },
  sunday: { breakfast: true, lunch: false, dinner: false },
};

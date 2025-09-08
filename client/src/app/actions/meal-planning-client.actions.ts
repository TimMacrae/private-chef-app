import {
  MealPlanning,
  MealPlanningSchema,
} from "@/components/meal-planning/meal-planning.type";
import { clientRequest } from "@/lib/api/api-client-request-handler";

import { apiConfig } from "@/lib/api/api-config";

export async function updateMealPlanningClientAction(
  mealPlanning: MealPlanning
): Promise<MealPlanning> {
  return await clientRequest(apiConfig.API.MEAL_PLANNING, MealPlanningSchema, {
    method: "PUT",
    body: mealPlanning,
  });
}

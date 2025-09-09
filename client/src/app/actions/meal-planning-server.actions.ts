"use server";

import {
  MealPlanning,
  MealPlanningSchema,
} from "@/components/meal-planning/meal-planning.type";

import { apiConfig } from "@/lib/api/api-config";
import { serverRequest } from "@/lib/api/api-server-request-handler";

export async function getMealPlanningAction(): Promise<MealPlanning> {
  return await serverRequest(apiConfig.API.MEAL_PLANNING, MealPlanningSchema);
}

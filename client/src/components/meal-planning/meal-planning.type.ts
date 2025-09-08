import { z } from "zod";

const MealPlanningDaySchema = z.object({
  breakfast: z.boolean(),
  lunch: z.boolean(),
  dinner: z.boolean(),
});

export const MealPlanningSchema = z.object({
  id: z.string(),
  userId: z.string(),
  monday: MealPlanningDaySchema,
  tuesday: MealPlanningDaySchema,
  wednesday: MealPlanningDaySchema,
  thursday: MealPlanningDaySchema,
  friday: MealPlanningDaySchema,
  saturday: MealPlanningDaySchema,
  sunday: MealPlanningDaySchema,
});

export type MealPlanning = z.infer<typeof MealPlanningSchema>;
export type MealPlanningDay = z.infer<typeof MealPlanningDaySchema>;

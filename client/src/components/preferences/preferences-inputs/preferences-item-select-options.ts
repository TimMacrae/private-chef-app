import {
  BudgetLevel,
  CookingSkillLevel,
  MaxPrepTime,
  PreferenceSingleValueKeys,
} from "../preferences.type";

export const preferenceItemSelectOptions = (
  preferenceKey: keyof PreferenceSingleValueKeys
) => {
  switch (preferenceKey) {
    case "budgetLevel":
      return [
        { value: BudgetLevel.LOW, label: "Low" },
        { value: BudgetLevel.MEDIUM, label: "Medium" },
        { value: BudgetLevel.HIGH, label: "High" },
      ];
    case "cookingSkillLevel":
      return [
        { value: CookingSkillLevel.BEGINNER, label: "Beginner" },
        { value: CookingSkillLevel.INTERMEDIATE, label: "Intermediate" },
        { value: CookingSkillLevel.ADVANCED, label: "Advanced" },
        { value: CookingSkillLevel.KITCHEN_CHEF, label: "Kitchen Chef" },
        { value: CookingSkillLevel.MICHELINE_STAR, label: "Micheline Star" },
      ];
    case "maxPrepTimeMinutes":
      return [
        { value: MaxPrepTime.MIN_15, label: "15 minutes" },
        { value: MaxPrepTime.MIN_30, label: "30 minutes" },
        { value: MaxPrepTime.MIN_45, label: "45 minutes" },
        { value: MaxPrepTime.MIN_60, label: "1 hour" },
        { value: MaxPrepTime.MIN_90, label: "1.5 hours" },
        { value: MaxPrepTime.MIN_120, label: "2 hours" },
        { value: MaxPrepTime.MIN_150, label: "2.5 hours" },
        { value: MaxPrepTime.MIN_180, label: "3 hours" },
      ];
    default:
      return [];
  }
};

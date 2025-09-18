package com.privatechef.recipe.model;

import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeParseDto {

    private String title;
    private String image;
    private String description;
    private Map<String, String> ingredients;
    private Set<String> instructions;
    private int prepTimeMinutes;
    private BudgetLevel budgetLevel;
    private CookingSkillLevel cookingSkillLevel;
    private String cuisine;
    private MealType mealType;
    private int servings;
}

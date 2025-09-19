package com.privatechef.recipe.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeGenerateRequestDto {
    MealType mealType;
    String instructions;
    int servings;
}

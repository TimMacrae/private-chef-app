package com.privatechef.recipe.model;

import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recipes")
public class RecipeModel {

    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

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

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
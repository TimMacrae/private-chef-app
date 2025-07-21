package com.privatechef.preferences.dto;

import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import com.privatechef.preferences.model.NutritionalGoalsModel;
import com.privatechef.preferences.model.SeasonalPreferencesModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreferencesDto {
    private String id;
    private String userId;

    // Core Preferences
    private List<String> dietaryRestrictions = new ArrayList<>();
    private List<String> allergies = new ArrayList<>();
    private List<String> dislikes = new ArrayList<>();
    private List<String> likes = new ArrayList<>();

    // Culinary Preferences
    private List<String> preferredCuisines = new ArrayList<>();
    private List<String> excludedCuisines = new ArrayList<>();
    private List<String> preferredChefStyles = new ArrayList<>();
    private List<String> excludedChefStyles = new ArrayList<>();

    // Seasonal Preferences
    private SeasonalPreferencesModel seasonalPreferences = new SeasonalPreferencesModel();

    // Meal Constraints
    private Integer maxPrepTimeMinutes = 45;
    private BudgetLevel budgetLevel = BudgetLevel.MEDIUM;

    // Adaptive System
    private boolean autoAdaptBasedOnFeedback = false;
    private CookingSkillLevel cookingSkillLevel = CookingSkillLevel.INTERMEDIATE;
    private List<String> kitchenEquipment = new ArrayList<>();

    // Nutrition Goals
    private NutritionalGoalsModel nutritionalGoals = new NutritionalGoalsModel();
}


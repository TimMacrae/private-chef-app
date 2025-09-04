package com.privatechef.preferences.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "preferences")
public class PreferencesModel {

    @Id
    private String id;

    @Field("userId")
    @Indexed(unique = true)
    private String userId;

    // Core Preferences
    @Builder.Default
    private List<String> dietaryRestrictions = new ArrayList<>();
    @Builder.Default
    private List<String> allergies = new ArrayList<>();
    @Builder.Default
    private List<String> dislikes = new ArrayList<>();
    @Builder.Default
    private List<String> likes = new ArrayList<>();

    // Culinary Preferences
    @Builder.Default
    private List<String> preferredCuisines = new ArrayList<>();
    @Builder.Default
    private List<String> excludedCuisines = new ArrayList<>();
    @Builder.Default
    private List<String> preferredChefStyles = new ArrayList<>();
    @Builder.Default
    private List<String> excludedChefStyles = new ArrayList<>();

    // Seasonal Preferences
    @Builder.Default
    private SeasonalPreferencesModel seasonalPreferences = new SeasonalPreferencesModel();

    // Meal Constraints
    @Builder.Default
    private Integer maxPrepTimeMinutes = 45;
    @Builder.Default
    private BudgetLevel budgetLevel = BudgetLevel.MEDIUM;

    // Adaptive System
    @Builder.Default
    private boolean autoAdaptBasedOnFeedback = false;
    @Builder.Default
    private CookingSkillLevel cookingSkillLevel = CookingSkillLevel.INTERMEDIATE;
    @Builder.Default
    private List<String> kitchenEquipment = new ArrayList<>();

    // Nutrition Goals
    @Builder.Default
    private NutritionalGoalsModel nutritionalGoals = new NutritionalGoalsModel();

    // Metadata
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;

    public void updatePreferencesModel(PreferencesModel source) {

        this.setUserId(source.getUserId());
        this.setDietaryRestrictions(source.getDietaryRestrictions());
        this.setAllergies(source.getAllergies());
        this.setDislikes(source.getDislikes());
        this.setLikes(source.getLikes());

        this.setPreferredCuisines(source.getPreferredCuisines());
        this.setExcludedCuisines(source.getExcludedCuisines());
        this.setPreferredChefStyles(source.getPreferredChefStyles());
        this.setExcludedChefStyles(source.getExcludedChefStyles());

        this.setSeasonalPreferences(source.getSeasonalPreferences());

        this.setMaxPrepTimeMinutes(source.getMaxPrepTimeMinutes());
        this.setBudgetLevel(source.getBudgetLevel());

        this.setAutoAdaptBasedOnFeedback(source.isAutoAdaptBasedOnFeedback());
        this.setCookingSkillLevel(source.getCookingSkillLevel());
        this.setKitchenEquipment(source.getKitchenEquipment());
        this.setNutritionalGoals(source.getNutritionalGoals());

        this.setUpdatedAt(LocalDateTime.now());
    }
}

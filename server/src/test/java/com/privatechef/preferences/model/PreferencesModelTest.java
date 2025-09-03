package com.privatechef.preferences.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class PreferencesModelTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            validator = factory.getValidator();
        }
    }

    @Test
    void validModel_shouldHaveNoViolations() {
        PreferencesModel model = new PreferencesModel();
        model.setUserId("userId");
        model.setBudgetLevel(BudgetLevel.MEDIUM);
        model.setCookingSkillLevel(CookingSkillLevel.BEGINNER);

        Set<ConstraintViolation<PreferencesModel>> violations = validator.validate(model);
        assertTrue(violations.isEmpty());
    }

    @Test
    void missingValues_shouldDefaultToEmptyLists() {
        PreferencesModel model = new PreferencesModel();
        model.setUserId("userId");

        assertNotNull(model.getDietaryRestrictions());
        assertTrue(model.getDietaryRestrictions().isEmpty());

        assertNotNull(model.getAllergies());
        assertTrue(model.getAllergies().isEmpty());

        assertNotNull(model.getDislikes());
        assertTrue(model.getDislikes().isEmpty());

        assertNotNull(model.getLikes());
        assertTrue(model.getLikes().isEmpty());

        assertNotNull(model.getPreferredCuisines());
        assertTrue(model.getPreferredCuisines().isEmpty());

        assertNotNull(model.getExcludedCuisines());
        assertTrue(model.getExcludedCuisines().isEmpty());

        assertNotNull(model.getPreferredChefStyles());
        assertTrue(model.getPreferredChefStyles().isEmpty());

        assertNotNull(model.getExcludedChefStyles());
        assertTrue(model.getExcludedChefStyles().isEmpty());

        // seasonalPreferences
        assertNotNull(model.getMaxPrepTimeMinutes());
        assertEquals(45, model.getMaxPrepTimeMinutes());

        assertNotNull(model.getBudgetLevel());
        assertEquals(BudgetLevel.MEDIUM, model.getBudgetLevel());

        assertFalse(model.isAutoAdaptBasedOnFeedback());

        // cookingSkillLevel
        assertNotNull(model.getKitchenEquipment());
        assertTrue(model.getKitchenEquipment().isEmpty());
    }

    @Test
    void seasonalPreferencesModel_shouldInitializeEmptyLists() {
        SeasonalPreferencesModel seasonal = new SeasonalPreferencesModel();
        assertFalse(seasonal.isSpring());
        assertFalse(seasonal.isSummer());
        assertFalse(seasonal.isAutumn());
        assertFalse(seasonal.isWinter());
    }

    @Test
    void nutritionalGoalsModel_shouldValidateConstraints() {
        NutritionalGoalsModel goals = new NutritionalGoalsModel();
        goals.setDailyCalories(400);
        goals.setProteinGrams(-1);
        goals.setCarbGrams(-1);
        goals.setFatGrams(-1);

        Set<ConstraintViolation<NutritionalGoalsModel>> violations = validator.validate(goals);
        assertFalse(violations.isEmpty());

        goals.setDailyCalories(2000);
        goals.setProteinGrams(50);
        goals.setCarbGrams(200);
        goals.setFatGrams(70);

        violations = validator.validate(goals);
        assertTrue(violations.isEmpty());
    }

    @Test
    void updatePreferencesModel_shouldCopyAllFields() {
        PreferencesModel source = PreferencesModel.builder()
                .userId("user123")
                .dietaryRestrictions(List.of("vegan"))
                .allergies(List.of("nuts"))
                .dislikes(List.of("broccoli"))
                .likes(List.of("pasta"))
                .preferredCuisines(List.of("Italian"))
                .excludedCuisines(List.of("French"))
                .preferredChefStyles(List.of("Modern"))
                .excludedChefStyles(List.of("Classic"))
                .seasonalPreferences(new SeasonalPreferencesModel(true, false, true, false))
                .maxPrepTimeMinutes(30)
                .budgetLevel(BudgetLevel.HIGH)
                .autoAdaptBasedOnFeedback(true)
                .cookingSkillLevel(CookingSkillLevel.ADVANCED)
                .kitchenEquipment(List.of("Oven"))
                .nutritionalGoals(new NutritionalGoalsModel(2000, 100, 250, 80))
                .build();

        PreferencesModel target = new PreferencesModel();
        target.updatePreferencesModel(source);

        assertEquals("user123", target.getUserId());
        assertEquals(List.of("vegan"), target.getDietaryRestrictions());
        assertEquals(List.of("nuts"), target.getAllergies());
        assertEquals(List.of("broccoli"), target.getDislikes());
        assertEquals(List.of("pasta"), target.getLikes());
        assertEquals(List.of("Italian"), target.getPreferredCuisines());
        assertEquals(List.of("French"), target.getExcludedCuisines());
        assertEquals(List.of("Modern"), target.getPreferredChefStyles());
        assertEquals(List.of("Classic"), target.getExcludedChefStyles());
        assertTrue(target.getSeasonalPreferences().isSpring());
        assertFalse(target.getSeasonalPreferences().isSummer());
        assertTrue(target.getSeasonalPreferences().isAutumn());
        assertFalse(target.getSeasonalPreferences().isWinter());
        assertEquals(30, target.getMaxPrepTimeMinutes());
        assertEquals(BudgetLevel.HIGH, target.getBudgetLevel());
        assertTrue(target.isAutoAdaptBasedOnFeedback());
        assertEquals(CookingSkillLevel.ADVANCED, target.getCookingSkillLevel());
        assertEquals(List.of("Oven"), target.getKitchenEquipment());
        assertEquals(2000, target.getNutritionalGoals().getDailyCalories());
        assertEquals(100, target.getNutritionalGoals().getProteinGrams());
        assertEquals(250, target.getNutritionalGoals().getCarbGrams());
        assertEquals(80, target.getNutritionalGoals().getFatGrams());
        assertNotNull(target.getUpdatedAt());
    }

    @Test
    void updatePreferencesModel_shouldOverwriteExistingValues() {
        PreferencesModel source = PreferencesModel.builder()
                .userId("newUser")
                .dietaryRestrictions(List.of("vegetarian"))
                .build();

        PreferencesModel target = PreferencesModel.builder()
                .userId("oldUser")
                .dietaryRestrictions(List.of("vegan"))
                .build();

        target.updatePreferencesModel(source);

        assertEquals("newUser", target.getUserId());
        assertEquals(List.of("vegetarian"), target.getDietaryRestrictions());
    }
}
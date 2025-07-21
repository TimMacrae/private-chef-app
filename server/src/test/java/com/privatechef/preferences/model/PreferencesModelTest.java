package com.privatechef.preferences.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

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

        // nutritionalGoals
    }

    @Test
    void seasonalPreferencesModel_shouldInitializeEmptyLists() {
        SeasonalPreferencesModel seasonal = new SeasonalPreferencesModel();

        assertNotNull(seasonal.getSpring());
        assertTrue(seasonal.getSpring().isEmpty());

        assertNotNull(seasonal.getSummer());
        assertTrue(seasonal.getSummer().isEmpty());

        assertNotNull(seasonal.getAutumn());
        assertTrue(seasonal.getAutumn().isEmpty());

        assertNotNull(seasonal.getWinter());
        assertTrue(seasonal.getWinter().isEmpty());
    }

    @Test
    void nutritionalGoalsModel_shouldValidateConstraints() {
        NutritionalGoalsModel goals = new NutritionalGoalsModel();
        goals.setDailyCalories(400); // below min
        goals.setProteinGrams(-1);   // below min
        goals.setCarbGrams(-1);      // below min
        goals.setFatGrams(-1);       // below min

        Set<ConstraintViolation<NutritionalGoalsModel>> violations = validator.validate(goals);
        assertFalse(violations.isEmpty());

        goals.setDailyCalories(2000);
        goals.setProteinGrams(50);
        goals.setCarbGrams(200);
        goals.setFatGrams(70);

        violations = validator.validate(goals);
        assertTrue(violations.isEmpty());
    }


}
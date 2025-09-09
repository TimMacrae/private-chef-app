package com.privatechef.meal_planning.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MealPlanningDayModelTest {
    @Test
    void mealPlaningDayModel_testNoArgsConstructorDefaults() {
        MealPlanningDayModel model = new MealPlanningDayModel();
        assertFalse(model.isBreakfast());
        assertFalse(model.isLunch());
        assertFalse(model.isDinner());
    }

    @Test
    void mealPlaningDayModel_testAllArgsConstructor() {
        MealPlanningDayModel model = new MealPlanningDayModel(true, false, true);
        assertTrue(model.isBreakfast());
        assertFalse(model.isLunch());
        assertTrue(model.isDinner());
    }

    @Test
    void mealPlaningDayModel_testSettersAndGetters() {
        MealPlanningDayModel model = new MealPlanningDayModel();
        model.setBreakfast(true);
        model.setLunch(true);
        model.setDinner(false);

        assertTrue(model.isBreakfast());
        assertTrue(model.isLunch());
        assertFalse(model.isDinner());
    }

    @Test
    void mealPlaningDayModel_testEqualsAndHashCode() {
        MealPlanningDayModel model1 = new MealPlanningDayModel(true, false, false);
        MealPlanningDayModel model2 = new MealPlanningDayModel(true, false, false);
        assertEquals(model1, model2);
        assertEquals(model1.hashCode(), model2.hashCode());
    }
}
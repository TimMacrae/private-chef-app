package com.privatechef.meal_planing.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MealPlaningDayModelTest {
    @Test
    void mealPlaningDayModel_testNoArgsConstructorDefaults() {
        MealPlaningDayModel model = new MealPlaningDayModel();
        assertFalse(model.isBreakfast());
        assertFalse(model.isLunch());
        assertFalse(model.isDinner());
    }

    @Test
    void mealPlaningDayModel_testAllArgsConstructor() {
        MealPlaningDayModel model = new MealPlaningDayModel(true, false, true);
        assertTrue(model.isBreakfast());
        assertFalse(model.isLunch());
        assertTrue(model.isDinner());
    }

    @Test
    void mealPlaningDayModel_testSettersAndGetters() {
        MealPlaningDayModel model = new MealPlaningDayModel();
        model.setBreakfast(true);
        model.setLunch(true);
        model.setDinner(false);

        assertTrue(model.isBreakfast());
        assertTrue(model.isLunch());
        assertFalse(model.isDinner());
    }

    @Test
    void mealPlaningDayModel_testEqualsAndHashCode() {
        MealPlaningDayModel model1 = new MealPlaningDayModel(true, false, false);
        MealPlaningDayModel model2 = new MealPlaningDayModel(true, false, false);
        assertEquals(model1, model2);
        assertEquals(model1.hashCode(), model2.hashCode());
    }
}
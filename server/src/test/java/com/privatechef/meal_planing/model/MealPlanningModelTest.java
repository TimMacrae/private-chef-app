package com.privatechef.meal_planing.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class MealPlanningModelTest {
    @Test
    void mealPlanningModel_testBuilderAndDefaults() {
        MealPlanningModel model = MealPlanningModel.builder()
                .id("1")
                .userId("user123")
                .build();

        assertEquals("1", model.getId());
        assertEquals("user123", model.getUserId());
        assertNotNull(model.getMonday());
        assertNotNull(model.getTuesday());
        assertNotNull(model.getWednesday());
        assertNotNull(model.getThursday());
        assertNotNull(model.getFriday());
        assertNotNull(model.getSaturday());
        assertNotNull(model.getSunday());
        assertNotNull(model.getCreatedAt());
        assertNull(model.getUpdatedAt());
    }

    @Test
    void mealPlanningModel_testUpdateMealPlaningModel() {
        MealPlanningModel original = MealPlanningModel.builder()
                .userId("user1")
                .build();

        MealPlaningDayModel newMonday = new MealPlaningDayModel();
        MealPlanningModel update = MealPlanningModel.builder()
                .monday(newMonday)
                .tuesday(new MealPlaningDayModel())
                .wednesday(new MealPlaningDayModel())
                .thursday(new MealPlaningDayModel())
                .friday(new MealPlaningDayModel())
                .saturday(new MealPlaningDayModel())
                .sunday(new MealPlaningDayModel())
                .build();

        original.updateMealPlaningModel(update);

        assertEquals(newMonday, original.getMonday());
        assertNotNull(original.getUpdatedAt());
    }

    @Test
    void mealPlanningModel_testAllArgsConstructor() {
        LocalDateTime now = LocalDateTime.now();
        MealPlanningModel model = new MealPlanningModel(
                "id1", "user1",
                new MealPlaningDayModel(), new MealPlaningDayModel(), new MealPlaningDayModel(),
                new MealPlaningDayModel(), new MealPlaningDayModel(), new MealPlaningDayModel(),
                new MealPlaningDayModel(), now, now
        );
        assertEquals("id1", model.getId());
        assertEquals("user1", model.getUserId());
        assertEquals(now, model.getCreatedAt());
        assertEquals(now, model.getUpdatedAt());
    }
}
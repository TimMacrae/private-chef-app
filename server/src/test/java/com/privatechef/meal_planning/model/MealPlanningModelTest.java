package com.privatechef.meal_planning.model;

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
        assertFalse(model.isActive());
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

        MealPlanningDayModel newMonday = new MealPlanningDayModel();
        MealPlanningModel update = MealPlanningModel.builder()
                .active(true)
                .monday(newMonday)
                .tuesday(new MealPlanningDayModel())
                .wednesday(new MealPlanningDayModel())
                .thursday(new MealPlanningDayModel())
                .friday(new MealPlanningDayModel())
                .saturday(new MealPlanningDayModel())
                .sunday(new MealPlanningDayModel())
                .build();

        original.updateMealPlaningModel(update);

        assertEquals(newMonday, original.getMonday());
        assertNotNull(original.getUpdatedAt());
        assertTrue(original.isActive());
    }

    @Test
    void mealPlanningModel_testAllArgsConstructor() {
        LocalDateTime now = LocalDateTime.now();
        MealPlanningModel model = new MealPlanningModel(
                "id1", "user1", true,
                new MealPlanningDayModel(), new MealPlanningDayModel(), new MealPlanningDayModel(),
                new MealPlanningDayModel(), new MealPlanningDayModel(), new MealPlanningDayModel(),
                new MealPlanningDayModel(), now, now
        );
        assertEquals("id1", model.getId());
        assertEquals("user1", model.getUserId());
        assertEquals(now, model.getCreatedAt());
        assertEquals(now, model.getUpdatedAt());
    }
}
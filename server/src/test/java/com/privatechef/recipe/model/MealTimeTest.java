package com.privatechef.recipe.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class MealTimeTest {
    @Test
    void mealTime_testEnumValues() {
        MealTime[] values = MealTime.values();
        assertArrayEquals(
                new MealTime[]{MealTime.BREAKFAST, MealTime.LUNCH, MealTime.DINNER},
                values
        );
    }

    @Test
    void mealTime_testValueOf() {
        assertEquals(MealTime.BREAKFAST, MealTime.valueOf("BREAKFAST"));
        assertEquals(MealTime.LUNCH, MealTime.valueOf("LUNCH"));
        assertEquals(MealTime.DINNER, MealTime.valueOf("DINNER"));
    }
}
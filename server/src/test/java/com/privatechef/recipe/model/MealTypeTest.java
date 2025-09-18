package com.privatechef.recipe.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class MealTypeTest {
    @Test
    void mealType_testEnumValues() {
        MealType[] values = MealType.values();
        assertArrayEquals(
                new MealType[]{MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER, MealType.SNACK, MealType.DESERT},
                values
        );
    }

    @Test
    void mealType_testValueOf() {
        assertEquals(MealType.BREAKFAST, MealType.valueOf("BREAKFAST"));
        assertEquals(MealType.LUNCH, MealType.valueOf("LUNCH"));
        assertEquals(MealType.DINNER, MealType.valueOf("DINNER"));
        assertEquals(MealType.SNACK, MealType.valueOf("SNACK"));
        assertEquals(MealType.DESERT, MealType.valueOf("DESERT"));
    }
}
package com.privatechef.recipe.model;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;

class RecipeGenerateRequestDtoTest {
    @Test
    void recipeGenerateRequestDto_testDefaultConstructor_mealTimeIsNull() {
        RecipeGenerateRequestDto dto = new RecipeGenerateRequestDto();
        assertNull(dto.getMealTime());
    }

    @Test
    void recipeGenerateRequestDto__testAllArgsConstructor_setsMealTime() {
        RecipeGenerateRequestDto dto = new RecipeGenerateRequestDto(MealTime.BREAKFAST);
        assertEquals(MealTime.BREAKFAST, dto.getMealTime());
    }

    @Test
    void recipeGenerateRequestDto_testMealTimeGetter() throws Exception {
        RecipeGenerateRequestDto dto = new RecipeGenerateRequestDto();

        Field field = RecipeGenerateRequestDto.class.getDeclaredField("mealTime");
        field.setAccessible(true);
        field.set(dto, MealTime.LUNCH);

        assertEquals(MealTime.LUNCH, dto.getMealTime());
    }
}
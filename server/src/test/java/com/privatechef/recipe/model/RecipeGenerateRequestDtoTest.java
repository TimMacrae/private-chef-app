package com.privatechef.recipe.model;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;

class RecipeGenerateRequestDtoTest {
    @Test
    void recipeGenerateRequestDto_testDefaultConstructor_mealTimeIsNull() {
        RecipeGenerateRequestDto dto = new RecipeGenerateRequestDto();
        assertNull(dto.getMealType());
    }

    @Test
    void recipeGenerateRequestDto__testAllArgsConstructor_setsMealTime() {
        RecipeGenerateRequestDto dto = new RecipeGenerateRequestDto(MealType.BREAKFAST, "instructions", 2);
        assertEquals(MealType.BREAKFAST, dto.getMealType());
        assertEquals("instructions", dto.getInstructions());
        assertEquals(2, dto.servings);
    }

    @Test
    void recipeGenerateRequestDto_testMealTimeGetter() throws Exception {
        RecipeGenerateRequestDto dto = new RecipeGenerateRequestDto();

        Field field = RecipeGenerateRequestDto.class.getDeclaredField("mealType");
        field.setAccessible(true);
        field.set(dto, MealType.LUNCH);

        assertEquals(MealType.LUNCH, dto.getMealType());
    }
}
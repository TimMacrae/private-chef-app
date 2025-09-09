package com.privatechef.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MealPlaningModelNotFoundTest {
    @Test
    void mealPlaningModelNotFound_shouldContainCorrectMessage() {
        String id = "123";
        assertThrows(
                MealPlanningModelNotFound.class,
                () -> {
                    throw new MealPlanningModelNotFound(id);
                }
        );
    }
}
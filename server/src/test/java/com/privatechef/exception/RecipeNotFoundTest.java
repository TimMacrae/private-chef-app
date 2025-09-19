package com.privatechef.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;

class RecipeNotFoundTest {
    @Test
    void recipeNotFound_messageIsSetCorrectly() {
        RecipeNotFound ex = new RecipeNotFound("42");
        assertEquals("Recipe not found with id 42", ex.getMessage());
    }

    @Test
    void recipeNotFound_isRuntimeException() {
        RecipeNotFound ex = new RecipeNotFound("id");
        assertInstanceOf(RuntimeException.class, ex);
    }
}
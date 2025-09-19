package com.privatechef.exception;

public class RecipeNotFound extends RuntimeException {
    public RecipeNotFound(String id) {
        super("Recipe not found with id " + id);
    }
}

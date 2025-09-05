package com.privatechef.exception;

public class MealPlaningModelNotFound extends RuntimeException {
    public MealPlaningModelNotFound(String id) {
        super("Meal planing model with id " + id + " not found");
    }
}

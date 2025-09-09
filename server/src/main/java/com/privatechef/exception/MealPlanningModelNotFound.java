package com.privatechef.exception;

public class MealPlanningModelNotFound extends RuntimeException {
    public MealPlanningModelNotFound(String id) {
        super("Meal planing model with id " + id + " not found");
    }
}

package com.privatechef.exception;

public class RecipeNotFound extends RuntimeException {
  public RecipeNotFound(String message) {
    super(message);
  }
}
